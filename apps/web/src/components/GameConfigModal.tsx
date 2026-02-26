import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Clock, User, Zap, Infinity } from 'lucide-react';

interface GameConfigModalProps {
    onStart: (config: {
        difficulty: number;
        timeControl: { minutes: number | null; increment: number };
        color: 'w' | 'b' | 'random';
    }) => void;
}

const TIME_OPTIONS = [
    { id: '1', label: '1 min', minutes: 1, increment: 0, icon: <Zap size={14} /> },
    { id: '3+2', label: '3+2', minutes: 3, increment: 2, icon: <Zap size={14} /> },
    { id: '10', label: '10 min', minutes: 10, increment: 0, icon: <Clock size={14} /> },
    { id: '30', label: '30 min', minutes: 30, increment: 0, icon: <Clock size={14} /> },
    { id: 'none', label: 'Sin Límite', minutes: null, increment: 0, icon: <Infinity size={14} /> },
];

const GameConfigModal: React.FC<GameConfigModalProps> = ({ onStart }) => {
    const { t } = useTranslation();
    const [difficulty, setDifficulty] = useState(5);
    const [timeId, setTimeId] = useState('10');
    const [color, setColor] = useState<'w' | 'b' | 'random'>('w');

    const handleLevelClick = (level: number) => setDifficulty(level);

    const handleStart = () => {
        const tc = TIME_OPTIONS.find(o => o.id === timeId) || TIME_OPTIONS[1];
        onStart({
            difficulty,
            timeControl: { minutes: tc.minutes, increment: tc.increment },
            color
        });
    };

    const approxElo = 400 + (difficulty * 200);

    return (
        <div className="glass-card" style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid var(--border-bright)',
            padding: '2rem 2.5rem',
            width: '95%',
            maxWidth: '520px',
            maxHeight: 'min(700px, 85dvh)',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-premium)',
            color: 'var(--text-main)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            position: 'relative',
            transition: 'all 0.3s ease',
            margin: 'auto'
        }}>
            {/* Header decor */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '8px',
                background: 'linear-gradient(90deg, var(--primary), var(--primary-bright), var(--citron))'
            }} />

            <div className="flex flex-col gap-8 pb-4">
                {/* AI Level Section */}
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">NIVEL DE DIFICULTAD</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-[var(--primary-bright)] bg-[var(--primary-bright)]/10 px-3 py-1 rounded-full border border-[var(--primary-bright)]/20 uppercase">
                                Competitivo
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-2xl font-black text-white">Nivel {difficulty}</span>
                            <div className="text-[11px] font-bold text-[#64748b]">
                                Elo Aproximado: <span className="text-[var(--primary-bright)]">{approxElo}</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={difficulty}
                            onChange={(e) => setDifficulty(parseInt(e.target.value))}
                            className="w-full h-2 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-[var(--primary-bright)]"
                        />
                        <div className="flex justify-between text-[8px] font-black text-[#64748b] uppercase tracking-tighter">
                            <span>Principiante</span>
                            <span>Maestro</span>
                        </div>
                    </div>
                </section>

                {/* Time Control Section */}
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-4 text-center sm:text-left">RITMO DE JUEGO</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {TIME_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setTimeId(opt.id)}
                                className={`flex items-center justify-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all duration-300 font-bold text-xs ${timeId === opt.id
                                    ? 'border-[var(--primary-bright)] bg-[var(--primary-bright)]/5 text-[var(--primary-bright)] shadow-lg shadow-[var(--primary-bright)]/10'
                                    : 'border-[#1e293b] bg-[#0f172a] text-[#64748b] hover:border-[#334155]'
                                    }`}
                            >
                                {opt.icon}
                                {opt.id === 'none' ? 'Sin Límite' : opt.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Play As Section */}
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-4 text-center sm:text-left">JUGAR CON</h3>
                    <div className="flex gap-4">
                        {[
                            { id: 'w', label: 'Blancas', icon: <div className="w-5 h-5 rounded-full bg-white border-2 border-[#e2e8f0]" /> },
                            { id: 'random', label: 'Azar', icon: <Zap size={18} /> },
                            { id: 'b', label: 'Negras', icon: <div className="w-5 h-5 rounded-full bg-black border-2 border-[#334155]" /> }
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setColor(opt.id as any)}
                                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${color === opt.id
                                    ? 'border-[var(--primary-bright)] bg-[var(--primary-bright)]/5 text-[var(--primary-bright)] shadow-lg shadow-[var(--primary-bright)]/10'
                                    : 'border-[#1e293b] bg-[#0f172a] text-[#64748b] hover:border-[#334155]'
                                    }`}
                            >
                                {opt.icon}
                                <span className="text-[10px] uppercase font-black">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Start Button */}
                <button
                    onClick={handleStart}
                    className="w-full py-5 rounded-2xl bg-[var(--primary)] text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4"
                >
                    COMENZAR PARTIDA
                </button>
            </div>
        </div>
    );
};

export default GameConfigModal;
