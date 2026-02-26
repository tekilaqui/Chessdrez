import { useState, useCallback, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Color } from '@chess-platform/shared';
import { engineManager } from './engine/engineManager';

export interface GameConfig {
    difficulty: number;
    timeControl: { minutes: number | null; increment: number };
    color: 'w' | 'b' | 'random';
}

export function useGameLogic() {
    const [gameState, setGameState] = useState<'config' | 'playing'>('config');
    const [playerColor, setPlayerColor] = useState<Color>('w');
    const [difficultyLevel, setDifficultyLevel] = useState(5);
    const [timeWInitial, setTimeWInitial] = useState<number | null>(null);
    const [timeBInitial, setTimeBInitial] = useState<number | null>(null);
    const [timeControlStr, setTimeControlStr] = useState<string | null>(null);
    const [clockKey, setClockKey] = useState(0);

    const [fen, setFen] = useState('start');
    const [turn, setTurn] = useState<Color>('w');
    const [isGameOver, setIsGameOver] = useState(false);
    const [surrendered, setSurrendered] = useState(false);
    const [status, setStatus] = useState('TU TURNO');
    const [history, setHistory] = useState<string[]>([]);
    const [uciHistory, setUciHistory] = useState<string[]>([]);

    const [isEngineReady, setIsEngineReady] = useState(false);
    const cpuThinkingRef = useRef(false);
    const chessRef = useRef(new Chess());

    useEffect(() => {
        engineManager.init();
        if (engineManager.getIsReady()) {
            setIsEngineReady(true);
        } else {
            engineManager.onReady(() => setIsEngineReady(true));
        }

        return () => {
            // Do NOT destroy the worker here so it stays alive between pages
        };
    }, []);

    const startGame = useCallback((config: GameConfig) => {
        const color: Color = config.color === 'random' ? (Math.random() > 0.5 ? 'w' : 'b') : (config.color as Color);
        setPlayerColor(color);
        setDifficultyLevel(config.difficulty);
        // reset internal chess instance to preserve move history
        chessRef.current = new Chess();
        setFen('start');
        setTurn('w');
        setIsGameOver(false);
        setSurrendered(false);
        setHistory([]);
        setUciHistory([]);
        setStatus(color === 'w' ? 'TU TURNO' : 'IA PENSANDO...');
        cpuThinkingRef.current = false;

        if (config.timeControl.minutes !== null) {
            setTimeWInitial(config.timeControl.minutes * 60);
            setTimeBInitial(config.timeControl.minutes * 60);
            setTimeControlStr(`${config.timeControl.minutes}+${config.timeControl.increment}`);
        } else {
            setTimeWInitial(null);
            setTimeBInitial(null);
            setTimeControlStr(null);
        }

        setClockKey(k => k + 1);
        setGameState('playing');
        engineManager.stop();
    }, []);

    const applyMove = useCallback((moveUci: string): { newFen: string; san: string; history: string[] } | null => {
        const chess = chessRef.current;
        try {
            const result = chess.move({
                from: moveUci.slice(0, 2),
                to: moveUci.slice(2, 4),
                promotion: moveUci.length > 4 ? moveUci[4] : 'q',
            });
            if (!result) return null;
            return {
                newFen: chess.fen(),
                san: result.san,
                history: chess.history()
            };
        } catch {
            return null;
        }
    }, []);

    const updateGameStateAfterMove = useCallback((moveResult: { newFen: string; san: string; history: string[] }, moveUci: string) => {
        const { newFen, san, history: hist } = moveResult;
        const chess = new Chess(newFen);
        const nextTurn = chess.turn() as Color;

        setFen(newFen);
        setHistory(hist);
        const nextUci = [...(uciHistory || []).slice(0, hist.length - 1), moveUci];
        console.log('[useGameLogic] updateGameStateAfterMove (before set)', { moveUci, histLength: hist.length, hist, nextUci, currentUciHistory: uciHistory });
        setUciHistory(nextUci);
        console.log('[useGameLogic] updateGameStateAfterMove (after set)', { producedSan: san });
        setTurn(nextTurn);

        if (chess.isGameOver()) {
            setIsGameOver(true);
            if (chess.isCheckmate()) {
                setStatus(`JAQUE MATE - GANAN ${nextTurn === 'w' ? 'NEGRAS' : 'BLANCAS'}`);
            } else {
                setStatus('TABLAS');
            }
        } else if (chess.inCheck()) {
            setStatus(nextTurn === playerColor ? '¡JAQUE! TU TURNO' : '¡JAQUE!');
        } else {
            setStatus(nextTurn === playerColor ? 'TU TURNO' : 'IA PENSANDO...');
        }

        return { newFen, moveUci, moveNumber: hist.length };
    }, [playerColor]);

    const handlePlayerMove = useCallback((move: { from: string; to: string; promotion?: string }): { newFen: string; moveUci: string; moveNumber: number } | null => {
        if (surrendered || isGameOver || cpuThinkingRef.current) return null;

        const uci = `${move.from}${move.to}${move.promotion || ''}`;
        const res = applyMove(uci);
        if (!res) return null;

        return updateGameStateAfterMove(res, uci) as any;
    }, [surrendered, isGameOver, applyMove, fen, updateGameStateAfterMove]);

    const surrender = useCallback(() => {
        setSurrendered(true);
        setIsGameOver(true);
        setStatus(`RENDIDO - GANAN ${playerColor === 'w' ? 'NEGRAS' : 'BLANCAS'}`);
        engineManager.stop();
    }, [playerColor]);

    const timeOut = useCallback((loserColor: Color) => {
        setIsGameOver(true);
        setSurrendered(true);
        setStatus(`TIEMPO AGOTADO - GANAN ${loserColor === 'w' ? 'NEGRAS' : 'BLANCAS'}`);
        engineManager.stop();
    }, []);

    const triggerCpuMove = useCallback(async (): Promise<{ newFen: string; moveUci: string; moveNumber: number } | null> => {
        if (isGameOver || surrendered || !isEngineReady || turn === playerColor || cpuThinkingRef.current) {
            return null;
        }

        cpuThinkingRef.current = true;
        const bestMove = await engineManager.getBestMoveOnce(fen === 'start' ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : fen, difficultyLevel);

        if (!bestMove) {
            cpuThinkingRef.current = false;
            return null;
        }

        const res = applyMove(bestMove);
        if (!res) {
            cpuThinkingRef.current = false;
            return null;
        }

        const result = updateGameStateAfterMove(res, bestMove);
        cpuThinkingRef.current = false;
        return result;
    }, [isGameOver, surrendered, isEngineReady, turn, playerColor, fen, difficultyLevel, applyMove, updateGameStateAfterMove]);

    return {
        gameState,
        setGameState,
        playerColor,
        fen,
        turn,
        isGameOver,
        surrendered,
        status,
        history,
        timeWInitial,
        timeBInitial,
        timeControlStr,
        clockKey,
        isEngineReady,
        startGame,
        handlePlayerMove,
        surrender,
        timeOut,
        triggerCpuMove,
        difficultyLevel,
        uciHistory
    };
}
