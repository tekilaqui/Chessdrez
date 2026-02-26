import React from 'react';
import { Star, Flame, Trophy, Target } from 'lucide-react';
import { PuzzleEloState } from '../hooks/usePuzzles';

interface PuzzleStatsProps {
    eloState: PuzzleEloState;
    lastDelta: number | null;
    puzzleRating: number;
}

const PuzzleStats: React.FC<PuzzleStatsProps> = ({ eloState, lastDelta, puzzleRating }) => {
    const stats = [
        { icon: <Star size={16} className="text-yellow-400" />, label: 'TU ELO', value: eloState.rating, delta: lastDelta },
        { icon: <Flame size={16} className="text-orange-400" />, label: 'RACHA', value: eloState.streak },
        { icon: <Trophy size={16} className="text-green-400" />, label: 'RESUELTOS', value: eloState.solved },
        { icon: <Target size={16} className="text-[var(--primary)]" />, label: 'ELO PUZZLE', value: puzzleRating },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(({ icon, label, value, delta }) => (
                <div key={label} className="glass-card p-3 flex items-center gap-3">
                    {icon}
                    <div>
                        <div className="text-[0.6rem] text-[var(--text-muted)] font-bold tracking-widest">{label}</div>
                        <div className="text-lg font-black leading-tight">{value}</div>
                    </div>
                    {delta != null && delta !== 0 && (
                        <span className={`ml-auto text-xs font-black animate-in fade-in zoom-in slide-in-from-bottom-2 duration-500 ${delta >= 0 ? 'text-[var(--primary)]' : 'text-red-400'}`}>
                            {delta >= 0 ? `+${delta}` : `${delta}`}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PuzzleStats;
