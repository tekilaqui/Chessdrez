import React from 'react';

interface ClockDisplayProps {
    label: string;
    time: number | null;
    isTurn: boolean;
    isRed?: boolean;
    formatTime: (seconds: number | null) => string;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
    label,
    time,
    isTurn,
    isRed,
    formatTime
}) => {
    return (
        <div className={`p-3 rounded-xl border transition-all duration-300 ${isTurn
                ? 'bg-black/60 border-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]'
                : 'bg-black/20 border-white/5 opacity-60'
            }`}>
            <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {label}
                </span>
                <div className={`font-mono text-xl font-bold ${isRed || (time !== null && time < 10) ? 'text-red-500' : 'text-white'
                    }`}>
                    {formatTime(time)}
                </div>
            </div>
        </div>
    );
};
