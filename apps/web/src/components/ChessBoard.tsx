import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useSettings } from '../context/SettingsContext';
import type { ChessboardOptions } from 'react-chessboard/dist/ChessboardProvider';

interface ChessBoardProps {
    fen: string;
    onMove?: (move: { from: string; to: string; promotion?: string }) => void;
    orientation?: 'white' | 'black';
    draggable?: boolean;
    customArrows?: [string, string, string][];
    customSquareStyles?: Record<string, React.CSSProperties>;
    onSquareClick?: (square: string) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = React.memo(({
    fen,
    onMove,
    orientation = 'white',
    draggable = true,
    customArrows = [],
    customSquareStyles = {},
    onSquareClick: onSquareClickProp
}) => {
    const { settings } = useSettings();

    // Internal game for computing legal moves (click-to-move highlights)
    const [game, setGame] = useState(() => {
        const g = new Chess();
        if (fen && fen !== 'start') { try { g.load(fen); } catch { /* keep default */ } }
        return g;
    });

    useEffect(() => {
        const g = new Chess();
        try { if (fen && fen !== 'start') g.load(fen); } catch { /* ignore */ }
        setGame(g);
    }, [fen]);

    const [moveFrom, setMoveFrom] = useState<Square | null>(null);
    const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

    const getMoveOptions = useCallback((square: Square): boolean => {
        const moves = game.moves({ square, verbose: true });
        if (moves.length === 0) { setOptionSquares({}); return false; }
        const squares: Record<string, React.CSSProperties> = {};
        moves.forEach((move) => {
            const isCapture = !!game.get(move.to as Square);
            squares[move.to] = {
                background: isCapture
                    ? 'radial-gradient(circle, rgba(0,0,0,.25) 85%, transparent 85%)'
                    : 'radial-gradient(circle, rgba(0,0,0,.15) 25%, transparent 25%)',
                borderRadius: '50%',
                cursor: 'pointer',
            };
        });
        squares[square] = { background: 'rgba(255,255,0,0.35)', cursor: 'pointer' };
        setOptionSquares(squares);
        return true;
    }, [game]);

    // Container for responsive sizing
    const containerRef = useRef<HTMLDivElement>(null);
    const [boardWidth, setBoardWidth] = useState(400);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                const size = Math.min(width, height) - 40;
                setBoardWidth(Math.max(size, 200));
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Build the arrows in v5 format
    const arrows = useMemo(() =>
        customArrows.map(([startSquare, endSquare, color]) => ({
            startSquare,
            endSquare,
            color: color ?? 'rgba(0,128,0,0.7)',
        })),
        [customArrows]
    );

    // Merged custom square styles
    const mergedSquareStyles = useMemo(() => ({
        ...customSquareStyles,
        ...optionSquares,
    }), [customSquareStyles, optionSquares]);

    // v5 options object
    const options: ChessboardOptions = {
        position: fen,
        boardOrientation: orientation,
        allowDragging: draggable,
        animationDurationInMs: 200,
        darkSquareStyle: { backgroundColor: settings.boardTheme.dark },
        lightSquareStyle: { backgroundColor: settings.boardTheme.light },
        squareStyles: mergedSquareStyles,
        arrows,
        onSquareClick: ({ square }: { square: string; piece: any }) => {
            if (onSquareClickProp) { onSquareClickProp(square); return; }
            if (!onMove || !draggable) return;
            const sq = square as Square;
            if (!moveFrom) {
                const hasMoves = getMoveOptions(sq);
                if (hasMoves) setMoveFrom(sq);
                return;
            }
            if (optionSquares[sq]) {
                onMove({ from: moveFrom, to: sq, promotion: 'q' });
                setMoveFrom(null);
                setOptionSquares({});
            } else {
                const hasMoves = getMoveOptions(sq);
                if (hasMoves) setMoveFrom(sq);
                else { setMoveFrom(null); setOptionSquares({}); }
            }
        },
        onPieceDrop: ({ sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }): boolean => {
            if (!onMove || !targetSquare) return false;
            onMove({ from: sourceSquare, to: targetSquare, promotion: 'q' });
            setMoveFrom(null);
            setOptionSquares({});
            return true;
        },
    };

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center p-2 select-none overflow-hidden">
            <div
                style={{ width: boardWidth, height: boardWidth }}
                className="relative shadow-[0_25px_70px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden border-[10px] border-[var(--bg-card)]"
            >
                <div className="absolute inset-0 pointer-events-none z-10 border border-white/10 rounded-[8px]" />
                <Chessboard options={options} />
            </div>
        </div>
    );
});

export default ChessBoard;
