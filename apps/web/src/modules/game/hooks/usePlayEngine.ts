import { useState, useEffect, useRef } from 'react';
import { engineManager, EngineEvaluation } from '../engine/engineManager';
import { CommentEngine, MoveComment } from '@chess-platform/shared';
import { Chess } from 'chess.js';

export interface MoveMetadata {
    fen: string;
    uci?: string;
    san?: string;
    evaluation?: EngineEvaluation;
    comment?: MoveComment;
}

export function usePlayEngine(fen: string, history: string[], uciHistory: string[], isEngineReady: boolean) {
    const [evaluation, setEvaluation] = useState<EngineEvaluation>({
        score: null, isMate: false, mateMoves: null, bestMove: null, multipv: []
    });
    const [bestMoveArrow, setBestMoveArrow] = useState<string | null>(null);
    const [bestMoveOwner, setBestMoveOwner] = useState<'w'|'b'|null>(null);
    const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const [fullHistory, setFullHistory] = useState<MoveMetadata[]>([{ fen: STARTING_FEN }]);
    const pendingPrevEvals = useRef<Record<number, EngineEvaluation>>({});
    const evaluationRef = useRef<EngineEvaluation>(evaluation);

    // keep a ref copy of the latest engine evaluation to snapshot when a move is made
    useEffect(() => { evaluationRef.current = evaluation; }, [evaluation]);

    // Sync fullHistory with game history
    useEffect(() => {
        setFullHistory(prev => {
            // Keep existing entries, add new ones, and update current FEN
            const next: MoveMetadata[] = history.map((san, i) => {
                const existing = prev[i + 1];
                // fallback fen: prefer existing, otherwise previous item's fen, otherwise starting fen
                const fallbackFen = existing?.fen || (i > 0 ? (prev[i]?.fen || STARTING_FEN) : STARTING_FEN);
                return {
                    ...existing,
                    san,
                    uci: uciHistory[i],
                    fen: (i === history.length - 1) ? (fen || STARTING_FEN) : fallbackFen
                };
            });
            console.log('[usePlayEngine] sync fullHistory', { historyLen: history.length, nextPreview: next.slice(0,4), prevLen: prev.length });
            return [{ fen: STARTING_FEN }, ...next];
        });
    }, [history, fen, uciHistory]);

    // Previously we attempted to generate immediate comments using zeroed evaluations,
    // which resulted in misleading 'best' labels. Instead, mark the latest move as
    // 'analysing' placeholder and wait for the engine subscription to generate
    // a proper comment when a real evaluation arrives.
    useEffect(() => {
        const idx = history.length; // index in fullHistory
        if (idx === 0) return;

        // Snapshot current engine evaluation as the "previous" eval for the upcoming comment.
        // This avoids relying on a zero fallback if the engine hasn't produced the prev position eval yet.
        pendingPrevEvals.current[idx] = evaluationRef.current;

        setFullHistory(prev => {
            const current = prev[idx];
            if (!current) return prev;
            if (current.comment) return prev;
            const next = [...prev];
            next[idx] = { ...current, comment: { category: 'analysing', heuristics: [] } };
            return next;
        });
    }, [history.length]);

    // Live analysis subscription
    useEffect(() => {
        const unsub = engineManager.subscribe((evalu: EngineEvaluation) => {
            setEvaluation(evalu);

            // Compute displayable best move: prefer evaluation.bestMove, fallback to multipv[0]
            const fallback = evalu.multipv && evalu.multipv.length > 0 ? evalu.multipv[0].move : null;
            const displayBest = evalu.bestMove || fallback || null;
            setBestMoveArrow(displayBest);

            // Extract owner of this analysis if provided by engineManager (analysisTurn)
            const owner = (evalu as any).analysisTurn as 'w'|'b' | undefined;
            setBestMoveOwner(owner || null);

            const currentIdx = history.length;
            if (evalu.score === null || currentIdx === 0) return;

            setFullHistory(prev => {
                    // Find first entry without evaluation (safest target) rather than relying
                    // on `history.length` which can race with state updates.
                    const missingIdx = prev.findIndex((p, i) => i > 0 && !p.evaluation && p.fen);
                    if (missingIdx === -1) return prev;

                    const nextHistory = [...prev];
                    const updatedItem = { ...nextHistory[missingIdx], evaluation: evalu };

                    // Generate AI commentary only if we have a valid previous evaluation.
                    const prevItem = nextHistory[missingIdx - 1];

                    // Prefer a snapshot of the evaluation taken at move time (pendingPrevEvals),
                    // otherwise fall back to the stored previous item's evaluation.
                    const pendingPrev = pendingPrevEvals.current[missingIdx];
                    if (!pendingPrev && !prevItem?.evaluation) {
                        // Still missing previous evaluation: defer comment generation.
                        console.warn('[usePlayEngine] previous evaluation missing, deferring comment generation', { index: missingIdx, prevFen: prevItem?.fen });
                    } else {
                        const prevEval = pendingPrev || prevItem!.evaluation;
                        // clear stored pending prev to avoid reuse
                        if (pendingPrev) delete pendingPrevEvals.current[missingIdx];

                        // Normalize fen values to avoid passing invalid strings to CommentEngine
                        const safePrevFen = (() => {
                            const f = prevItem?.fen || STARTING_FEN;
                            try { new Chess(f); return f; } catch { return STARTING_FEN; }
                        })();
                        const safeCurFen = (() => {
                            const f = nextHistory[missingIdx].fen || STARTING_FEN;
                            try { new Chess(f); return f; } catch { return STARTING_FEN; }
                        })();

                        try {
                            console.log('[usePlayEngine] Generating comment for move', { index: missingIdx, prevFen: safePrevFen, curFen: safeCurFen });
                            updatedItem.comment = CommentEngine.generateComment(
                                safePrevFen,
                                safeCurFen,
                                {
                                    evalBefore: prevEval.score || 0,
                                    evalAfter: evalu.score || 0,
                                    delta: (evalu.score || 0) - (prevEval.score || 0),
                                    isMate: evalu.isMate,
                                    bestMove: prevEval.bestMove || undefined
                                },
                                uciHistory.slice(0, missingIdx)
                            );
                            console.log('[usePlayEngine] Comment generated', updatedItem.comment);
                        } catch (err) {
                            console.warn('[usePlayEngine] CommentEngine.generateComment failed, skipping comment', err);
                        }
                    }

                    nextHistory[missingIdx] = updatedItem;
                    return nextHistory;
            });
        });
        return () => unsub();
    }, [history.length, uciHistory]);

    // Auto-trigger analysis
    useEffect(() => {
        if (isEngineReady && fen) {
            const currentFen = (fen === 'start' || !fen) ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : fen;
            engineManager.analyze(currentFen, "depth 15");
        }
    }, [fen, isEngineReady]);

    return {
        evaluation,
        bestMoveArrow,
        fullHistory,
        setFullHistory
    };
}
