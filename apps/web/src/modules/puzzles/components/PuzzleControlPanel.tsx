import React from 'react';
import { RotateCcw, ChevronRight, Lightbulb } from 'lucide-react';
import { PuzzleData, PuzzleCategory, PUZZLE_CATEGORIES } from '../hooks/usePuzzles';

interface PuzzleControlPanelProps {
    puzzle: PuzzleData;
    solved: boolean;
    failed: boolean;
    isPlayersTurn: boolean;
    feedback: { text: string; color: string };
    category: PuzzleCategory;
    totalInCategory: number;
    onHint: () => void;
    onReset: () => void;
    onNext: () => void;
}

const PuzzleControlPanel: React.FC<PuzzleControlPanelProps> = ({
    puzzle,
    solved,
    failed,
    isPlayersTurn,
    feedback,
    category,
    totalInCategory,
    onHint,
    onReset,
    onNext
}) => {
    return (
        <div className="flex flex-col gap-3">
            {/* Feedback card */}
            <div
                className="glass-card p-4 min-h-[80px] flex items-center justify-center rounded-xl text-center"
                style={{ borderColor: feedback.color + '60' }}
            >
                <p className="text-sm font-bold" style={{ color: feedback.color }}>
                    {solved ? '🎉 ¡Puzzle resuelto!' :
                        failed ? '❌ Jugada incorrecta.' :
                            !isPlayersTurn ? '⏳ El oponente está jugando...' :
                                feedback.text}
                </p>
            </div>

            {/* Action buttons - Enlarged for premium feel */}
            <div className="flex flex-col gap-2">
                {!solved && !failed && isPlayersTurn && (
                    <button onClick={onHint} className="btn-secondary !py-4 !text-[11px] font-black uppercase tracking-wider w-full">
                        <Lightbulb size={16} /> Pista <span className="text-[0.6rem] opacity-60 ml-2">(-Elo)</span>
                    </button>
                )}
                <button onClick={onReset} className="btn-secondary !py-4 !text-[11px] font-black uppercase tracking-wider w-full">
                    <RotateCcw size={16} /> Reintentar
                </button>
                <button onClick={onNext} className="btn-primary !py-4 !text-[11px] font-black uppercase tracking-wider w-full animate-pulse shadow-lg shadow-[var(--primary)]/20">
                    Siguiente <ChevronRight size={16} />
                </button>
            </div>

            {/* Info */}
            <div className="glass-card p-4 text-xs text-[var(--text-muted)] flex flex-col gap-1.5">
                <div className="flex justify-between">
                    <span>Puzzle</span>
                    <span className="font-mono font-bold text-white">{puzzle.id}</span>
                </div>
                <div className="flex justify-between">
                    <span>Disponibles</span>
                    <span className="font-bold text-white">{totalInCategory}</span>
                </div>
                <div className="flex justify-between">
                    <span>Categoría</span>
                    <span className="font-bold text-white">
                        {PUZZLE_CATEGORIES.find(c => c.value === category)?.label ?? category}
                    </span>
                </div>
            </div>

            {/* Scoring legend */}
            <div className="glass-card p-4 text-xs text-[var(--text-muted)] flex flex-col gap-1">
                <div className="font-extrabold text-white text-[0.6rem] tracking-widest mb-1.5 uppercase">Puntuación</div>
                <div>✅ Sin pista → <span className="text-[var(--primary)]">+Elo alto</span></div>
                <div>💡 Con pista → <span className="text-yellow-400">+Elo bajo</span></div>
                <div>❌ Fallo → <span className="text-[var(--danger)]">−Elo</span></div>
            </div>
        </div>
    );
};

export default PuzzleControlPanel;
