import { useState, useCallback, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { detectOpening, CommentEngine, MoveComment } from '@chess-platform/shared';
import { engineManager, EngineEvaluation } from '../game/engine/engineManager';

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export interface MoveMetadata {
    fen: string;
    uci?: string;
    san?: string;
    evaluation?: EngineEvaluation;
    comment?: MoveComment;
}

export function useAnalysisLogic() {
    const [history, setHistory] = useState<MoveMetadata[]>([{ fen: STARTING_FEN }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isEngineOn, setIsEngineOn] = useState(false);
    const [isEngineReady, setIsEngineReady] = useState(false);

    // Feature toggles
    const [showComments, setShowComments] = useState(false);
    const [showTraps, setShowTraps] = useState(false);
    const [isDeepAnalysis, setIsDeepAnalysis] = useState(false);
    const [deepEval, setDeepEval] = useState<EngineEvaluation | null>(null);
    const [deepLoading, setDeepLoading] = useState(false);

    // Live evaluation state
    const [evaluation, setEvaluation] = useState<EngineEvaluation>({
        score: null, bestMove: null, isMate: false, mateMoves: null, multipv: []
    });

    const chessRef = useRef(new Chess());
    const currentFen = history[historyIndex].fen;
    const uciHistory = history.map(h => h.uci).filter(Boolean) as string[];

    // Engine lifecycle and subscription
    useEffect(() => {
        engineManager.init();
        if (engineManager.getIsReady()) {
            setIsEngineReady(true);
        } else {
            engineManager.onReady(() => setIsEngineReady(true));
        }

        engineManager.setMultiPv(3);

        const unsub = engineManager.subscribe((evalu) => {
            setEvaluation(evalu);
            if (evalu.score === null) return;

            // Capture evaluation and generate AI comments for history
            setHistory(prev => {
                const current = prev[historyIndex];
                if (!current || current.evaluation) return prev; // Skip if already evaluated

                const nextHistory = [...prev];
                const updatedItem = { ...current, evaluation: evalu };

                // Generate AI commentary if we have the previous move's evaluation
                if (historyIndex > 0 && prev[historyIndex - 1].evaluation) {
                    const prevEval = prev[historyIndex - 1].evaluation!;
                    updatedItem.comment = CommentEngine.generateComment(
                        prev[historyIndex - 1].fen,
                        current.fen,
                        {
                            evalBefore: prevEval.score || 0,
                            evalAfter: evalu.score || 0,
                            delta: (evalu.score || 0) - (prevEval.score || 0),
                            isMate: evalu.isMate,
                            bestMove: prevEval.bestMove || undefined
                        },
                        uciHistory.slice(0, historyIndex)
                    );
                }

                nextHistory[historyIndex] = updatedItem;
                return nextHistory;
            });
        });

        return () => {
            unsub();
            engineManager.stop();
        };
    }, [historyIndex, uciHistory.length]); // Added uciHistory.length check for safety 

    useEffect(() => {
        try {
            if (chessRef.current.fen() !== currentFen) {
                chessRef.current.load(currentFen);
            }
        } catch {
            chessRef.current = new Chess(currentFen);
        }

        if (isEngineOn && isEngineReady) {
            engineManager.analyze(currentFen, "depth 15");
        } else if (!isEngineOn) {
            engineManager.stop();
            setEvaluation({ score: null, bestMove: null, isMate: false, mateMoves: null, multipv: [] });
        }
    }, [currentFen, isEngineOn, isEngineReady]);

    const makeMove = useCallback((from: string, to: string) => {
        try {
            const tempChess = new Chess(currentFen);
            const result = tempChess.move({ from, to, promotion: 'q' });
            if (result) {
                const newMetadata: MoveMetadata = {
                    fen: tempChess.fen(),
                    uci: result.from + result.to + (result.promotion || ''),
                    san: result.san
                };

                const newHistory = [...history.slice(0, historyIndex + 1), newMetadata];
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
                return true;
            }
        } catch { }
        return false;
    }, [currentFen, history, historyIndex]);

    const goBack = () => {
        if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1);
    };

    const resetBoard = () => {
        setHistory([{ fen: STARTING_FEN }]);
        setHistoryIndex(0);
        if (isEngineOn) engineManager.analyze(STARTING_FEN, "depth 15");
    };

    const loadFen = (fen: string) => {
        try {
            const testChess = new Chess(fen.trim());
            const newFen = testChess.fen();
            setHistory([{ fen: newFen }]);
            setHistoryIndex(0);
            return true;
        } catch {
            return false;
        }
    };

    const toggleEngine = () => setIsEngineOn(!isEngineOn);

    const runDeepAnalysis = async (square: string) => {
        if (!isEngineReady) return;
        setDeepLoading(true);
        setIsDeepAnalysis(true);
        const res = await engineManager.getMovesForSquare(currentFen, square);
        setDeepEval(res);
        setDeepLoading(false);
    };

    const toggleDeepAnalysis = () => {
        const next = !isDeepAnalysis;
        setIsDeepAnalysis(next);
        if (!next) {
            setDeepEval(null);
        }
    };

    const currentOpening = detectOpening(uciHistory.slice(0, historyIndex));
    const openingName = currentOpening?.name || (uciHistory.length > 5 && historyIndex > 5 ? 'Posición de juego' : null);

    return {
        currentFen,
        history,
        historyIndex,
        isEngineOn,
        isEngineReady,
        evaluation,
        openingName,
        showComments,
        setShowComments,
        showTraps,
        setShowTraps,
        makeMove,
        goBack,
        goForward,
        resetBoard,
        loadFen,
        toggleEngine,
        setHistoryIndex,
        isDeepAnalysis,
        toggleDeepAnalysis,
        runDeepAnalysis,
        deepEval,
        deepLoading
    };
}
