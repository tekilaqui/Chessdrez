import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import api from '../../../api/client';
import { LOCAL_PUZZLES_DB, PuzzleData as LocalPuzzleData } from '@chess-platform/shared';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PuzzleData {
    id: string;
    fen: string;
    solution: string[];   // UCI moves e.g. ['e2e4', 'd7d5']
    rating: number;
    themes: string[];
}

export interface PuzzleEloState {
    rating: number;
    streak: number;
    solved: number;
    failed: number;
}

export type PuzzleCategory =
    | 'all' | 'mateIn1' | 'mateIn2' | 'mate'
    | 'fork' | 'pin' | 'skewer' | 'discovery' | 'hangingPiece'
    | 'attraction' | 'deflection' | 'sacrifice'
    | 'endgame' | 'opening' | 'middlegame' | 'short' | 'long';

export type PuzzleDifficulty = 'easy' | 'normal' | 'hard' | 'master';

export const PUZZLE_CATEGORIES: { value: PuzzleCategory; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'mateIn1', label: 'Mate en 1' },
    { value: 'mateIn2', label: 'Mate en 2' },
    { value: 'mate', label: 'Jaque Mate' },
    { value: 'fork', label: 'Bifurcación' },
    { value: 'pin', label: 'Clavada' },
    { value: 'skewer', label: 'Ensarte' },
    { value: 'discovery', label: 'Descubierta' },
    { value: 'hangingPiece', label: 'Pieza Colgada' },
    { value: 'attraction', label: 'Atracción' },
    { value: 'deflection', label: 'Desviación' },
    { value: 'sacrifice', label: 'Sacrificio' },
    { value: 'endgame', label: 'Final' },
    { value: 'middlegame', label: 'Medio Juego' },
    { value: 'short', label: 'Cortos' },
    { value: 'long', label: 'Largos' },
];

// (Elo calculation moved to backend)

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePuzzles(category: PuzzleCategory = 'all', difficulty: PuzzleDifficulty = 'normal') {
    const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
    const [moveIndex, setMoveIndex] = useState(0);
    const [solved, setSolved] = useState(false);
    const [failed, setFailed] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const [hintSquare, setHintSquare] = useState<string | null>(null);
    const [orientation, setOrientation] = useState<'white' | 'black'>('white');
    const [eloState, setEloState] = useState<PuzzleEloState>({ rating: 500, streak: 0, solved: 0, failed: 0 });
    const [lastDelta, setLastDelta] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const eloApplied = useRef(false);

    const fetchStats = useCallback(async () => {
        try {
            const res = await api.get('/puzzles/stats');
            setEloState({
                rating: res.data.puzzleRating,
                streak: res.data.puzzleStreak,
                solved: res.data.puzzleSolved,
                failed: res.data.puzzleFailed
            });
        } catch (err) {
            console.error('Error fetching puzzle stats:', err);
        }
    }, []);

    const fetchNextPuzzle = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`/puzzles/next?category=${category}&difficulty=${difficulty}`);
            const p = res.data;
            setPuzzle({
                id: p.id,
                fen: p.fen,
                solution: p.solution.split(' '),
                rating: p.rating,
                themes: p.themes.split(' ')
            });
        } catch (err) {
            console.error('Error fetching next puzzle, falling back to local DB:', err);
            // Local fallback logic
            const filtered = category === 'all'
                ? (LOCAL_PUZZLES_DB as LocalPuzzleData[])
                : (LOCAL_PUZZLES_DB as LocalPuzzleData[]).filter(p => p.Themes.includes(category));

            const source = filtered.length > 0 ? filtered : LOCAL_PUZZLES_DB;
            const randomIndex = Math.floor(Math.random() * source.length);
            const p = source[randomIndex];

            setPuzzle({
                id: p.PuzzleId,
                fen: p.FEN,
                solution: p.Moves.split(' '),
                rating: p.Rating,
                themes: p.Themes.split(' ')
            });
        } finally {
            setMoveIndex(0);
            setSolved(false);
            setFailed(false);
            setHintUsed(false);
            setHintSquare(null);
            eloApplied.current = false;
            setLastDelta(null);
            setLoading(false);
        }
    }, [category, difficulty]);

    useEffect(() => {
        fetchStats();
        fetchNextPuzzle();
    }, [category, difficulty, fetchStats, fetchNextPuzzle]);

    // Set orientation when puzzle changes
    useEffect(() => {
        if (!puzzle) return;
        const sideToMove = puzzle.fen.split(' ')[1];
        setOrientation(sideToMove === 'w' ? 'black' : 'white');
    }, [puzzle]);

    // Current position = apply solution moves 0..moveIndex-1 to puzzle FEN
    const currentFen = useMemo(() => {
        if (!puzzle) return '';
        try {
            const g = new Chess(puzzle.fen);
            for (let i = 0; i < moveIndex; i++) {
                const m = puzzle.solution[i];
                if (!m) break;
                g.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] ?? 'q' });
            }
            return g.fen();
        } catch { return puzzle.fen; }
    }, [puzzle, moveIndex]);

    const isPlayersTurn = moveIndex % 2 !== 0;

    // Auto CPU move (fires on even indices when not solved/failed)
    useEffect(() => {
        if (!puzzle || solved || failed || isPlayersTurn) return;
        if (moveIndex >= puzzle.solution.length) return;

        const t = setTimeout(() => {
            setMoveIndex(prev => prev + 1);
        }, 400);
        return () => clearTimeout(t);
    }, [puzzle, moveIndex, solved, failed, isPlayersTurn]);

    const applyElo = useCallback(async (success: boolean) => {
        if (eloApplied.current || !puzzle) return;
        eloApplied.current = true;

        try {
            const res = await api.post('/puzzles/attempt', {
                puzzleId: puzzle.id,
                success
            });
            setLastDelta(res.data.delta);
            // Refresh stats after attempt
            fetchStats();
        } catch (err) {
            console.error('Error reporting puzzle attempt:', err);
        }
    }, [puzzle, fetchStats]);

    const checkMove = useCallback((from: string, to: string): 'correct' | 'wrong' | 'complete' => {
        if (!puzzle || solved || failed || !isPlayersTurn) return 'wrong';

        const expected = puzzle.solution[moveIndex];
        const played = `${from}${to}`;
        const isCorrect = expected?.slice(0, 4) === played;

        if (isCorrect) {
            setHintSquare(null);
            const nextIdx = moveIndex + 1;
            if (nextIdx >= puzzle.solution.length) {
                setMoveIndex(nextIdx);
                setSolved(true);
                applyElo(true);
                return 'complete';
            }
            setMoveIndex(nextIdx);
            return 'correct';
        } else {
            setFailed(true);
            applyElo(false);
            return 'wrong';
        }
    }, [puzzle, moveIndex, solved, failed, isPlayersTurn, applyElo]);

    const showHint = useCallback(() => {
        if (!puzzle || solved || failed || !isPlayersTurn) return;
        const expected = puzzle.solution[moveIndex];
        if (!expected) return;
        setHintUsed(true);
        setHintSquare(expected.slice(0, 2));
    }, [puzzle, moveIndex, solved, failed, isPlayersTurn]);

    const nextPuzzle = useCallback(() => {
        fetchNextPuzzle();
    }, [fetchNextPuzzle]);

    const resetPuzzle = useCallback(() => {
        setMoveIndex(0);
        setSolved(false);
        setFailed(false);
        setHintUsed(false);
        setHintSquare(null);
        eloApplied.current = false;
        setLastDelta(null);
    }, []);

    const flipBoard = useCallback(() => {
        setOrientation(o => o === 'white' ? 'black' : 'white');
    }, []);

    return {
        puzzle,
        currentFen,
        orientation,
        isPlayersTurn,
        solved,
        failed,
        hintSquare,
        eloState,
        lastDelta,
        loading,
        checkMove,
        showHint,
        nextPuzzle,
        resetPuzzle,
        flipBoard,
        totalInCategory: 100, // (Simplified as we don't have a count endpoint yet)
    };
}
