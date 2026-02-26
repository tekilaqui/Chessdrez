import React from 'react';
import ChessBoard from '../../../components/ChessBoard';
import { FlipHorizontal } from 'lucide-react';
import { PuzzleData, PuzzleEloState } from '../hooks/usePuzzles';

interface PuzzleBoardProps {
    puzzle: PuzzleData;
    currentFen: string;
    orientation: 'white' | 'black';
    isPlayersTurn: boolean;
    solved: boolean;
    failed: boolean;
    hintSquare: string | null;
    eloState: PuzzleEloState;
    onMove: (move: { from: string; to: string }) => void;
    onFlip: () => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
    puzzle,
    currentFen,
    orientation,
    isPlayersTurn,
    solved,
    failed,
    hintSquare,
    eloState,
    onMove,
    onFlip
}) => {
    const getDifficultyLabel = (pRating: number, uRating: number) => {
        const diff = pRating - uRating;
        if (diff < -200) return { label: 'MUCHO MÁS FÁCIL', color: '#4ade80' };
        if (diff < -50) return { label: 'FÁCIL', color: '#86efac' };
        if (diff < 50) return { label: 'NORMAL', color: '#93c5fd' };
        if (diff < 200) return { label: 'DIFÍCIL', color: '#fca5a1' };
        return { label: 'MAESTRO', color: '#f87171' };
    };

    const hintStyles: Record<string, React.CSSProperties> = {};
    if (hintSquare) {
        hintStyles[hintSquare] = {
            background: 'rgba(251, 191, 36, 0.55)',
            boxShadow: 'inset 0 0 0 3px rgba(251, 191, 36, 0.9)',
        };
    }

    const playerColor = orientation;
    const colorBanner = (
        <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-extrabold text-sm"
            style={{
                background: playerColor === 'white'
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(0,0,0,0.4)',
                border: `1px solid ${playerColor === 'white' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.6)'}`,
                color: playerColor === 'white' ? '#ffffff' : '#d1d5db',
            }}
        >
            <div className="w-4 h-4 rounded-sm border border-white/30"
                style={{ background: playerColor === 'white' ? '#f8f8f8' : '#1a1a1a' }}
            />
            JUEGAN LAS {playerColor === 'white' ? 'BLANCAS' : 'NEGRAS'}
        </div>
    );

    const difficulty = getDifficultyLabel(puzzle.rating, eloState.rating);

    return (
        <div className="flex-1 h-full flex flex-col gap-3 min-h-0">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    {colorBanner}
                    <div
                        className="px-2 py-0.5 rounded text-[10px] font-black tracking-tighter"
                        style={{
                            backgroundColor: difficulty.color + '20',
                            color: difficulty.color,
                            border: `1px solid ${difficulty.color}40`
                        }}
                    >
                        {difficulty.label}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] hidden sm:block font-bold">
                        {puzzle.themes.slice(0, 2).map(t => t.toUpperCase()).join('  ·  ')}
                    </span>
                    <button onClick={onFlip} className="btn-secondary !px-2.5 !py-2" title="Girar tablero">
                        <FlipHorizontal size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 relative">
                <div className="relative h-full flex items-center justify-center">
                    <ChessBoard
                        fen={currentFen}
                        onMove={onMove}
                        orientation={orientation}
                        draggable={isPlayersTurn && !solved && !failed}
                        customSquareStyles={hintStyles}
                    />
                </div>
            </div>
        </div>
    );
};

export default PuzzleBoard;
