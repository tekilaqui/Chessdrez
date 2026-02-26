import React from 'react';
import { User, Zap, Target, BookOpen, Brain } from 'lucide-react';

interface OpeningSetupProps {
    openingName: string;
    eco: string;
    onStart: (color: 'w' | 'b', mode: 'theory' | 'training' | 'exercises') => void;
    onCancel: () => void;
    initialMode?: 'theory' | 'training' | 'exercises';
}

const OpeningSetup: React.FC<OpeningSetupProps> = ({ openingName, eco, onStart, onCancel, initialMode = 'training' }) => {
    const [selectedColor, setSelectedColor] = React.useState<'w' | 'b'>('w');
    const [selectedMode, setSelectedMode] = React.useState<'theory' | 'training' | 'exercises'>(initialMode);

    return (
        <div className="flex flex-col gap-6 p-8 glass-card bg-black/60 border-white/10 max-w-lg mx-auto w-full animate-in fade-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center relative z-10">
                <div className="text-[10px] font-black text-[var(--primary)] mb-2 uppercase tracking-[0.3em] opacity-80">{eco}</div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white">{openingName}</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mx-auto rounded-full opacity-50" />
            </div>

            <div className="space-y-6 relative z-10">
                <section>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 block">
                        Tu Bando
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedColor('w')}
                            className={`group relative flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${selectedColor === 'w'
                                    ? 'bg-[var(--primary)]/10 border-[var(--primary)] shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] ring-1 ring-[var(--primary)]/50'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${selectedColor === 'w' ? 'bg-white' : 'bg-white/80'
                                }`}>
                                <User size={28} className="text-black" />
                            </div>
                            <span className={`text-sm font-black uppercase tracking-widest transition-colors ${selectedColor === 'w' ? 'text-white' : 'text-[var(--text-muted)] group-hover:text-white'}`}>
                                BLANCAS
                            </span>
                        </button>

                        <button
                            onClick={() => setSelectedColor('b')}
                            className={`group relative flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${selectedColor === 'b'
                                    ? 'bg-[var(--primary)]/10 border-[var(--primary)] shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] ring-1 ring-[var(--primary)]/50'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${selectedColor === 'b' ? 'bg-black border border-white/20' : 'bg-black/80 border border-white/10'
                                }`}>
                                <User size={28} className="text-white" />
                            </div>
                            <span className={`text-sm font-black uppercase tracking-widest transition-colors ${selectedColor === 'b' ? 'text-white' : 'text-[var(--text-muted)] group-hover:text-white'}`}>
                                NEGRAS
                            </span>
                        </button>
                    </div>
                </section>

                <section>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 block">
                        Modo de la Academia
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={() => setSelectedMode('theory')}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${selectedMode === 'theory'
                                    ? 'bg-[var(--primary)]/15 border-[var(--primary)]/40 text-white'
                                    : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-white/8'
                                }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${selectedMode === 'theory' ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-[var(--text-muted)] group-hover:text-white'}`}>
                                <BookOpen size={20} />
                            </div>
                            <div className="flex flex-col items-start translate-y-[-1px]">
                                <span className="text-xs font-black uppercase tracking-widest">Estudio Teórico</span>
                                <span className="text-[10px] opacity-50 font-medium">Explora variantes con explicaciones de la IA</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedMode('training')}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${selectedMode === 'training'
                                    ? 'bg-[var(--primary)]/15 border-[var(--primary)]/40 text-white'
                                    : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-white/8'
                                }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${selectedMode === 'training' ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-[var(--text-muted)] group-hover:text-white'}`}>
                                <Brain size={20} />
                            </div>
                            <div className="flex flex-col items-start translate-y-[-1px]">
                                <span className="text-xs font-black uppercase tracking-widest">Entrenamiento</span>
                                <span className="text-[10px] opacity-50 font-medium">Practica la línea contra el motor</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedMode('exercises')}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${selectedMode === 'exercises'
                                    ? 'bg-[var(--primary)]/15 border-[var(--primary)]/40 text-white'
                                    : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white hover:bg-white/8'
                                }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${selectedMode === 'exercises' ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-[var(--text-muted)] group-hover:text-white'}`}>
                                <Target size={20} />
                            </div>
                            <div className="flex flex-col items-start translate-y-[-1px]">
                                <span className="text-xs font-black uppercase tracking-widest">Ejercicios</span>
                                <span className="text-[10px] opacity-50 font-medium">Resuelve posiciones críticas de esta apertura</span>
                            </div>
                        </button>
                    </div>
                </section>
            </div>

            <div className="pt-6 flex flex-col gap-3 relative z-10">
                <button
                    onClick={() => onStart(selectedColor, selectedMode)}
                    className="w-full btn-primary !py-4 text-black font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 group overflow-hidden relative shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Zap size={20} className="fill-black group-hover:scale-110 transition-transform" />
                    ENTRAR EN ACADEMIA
                </button>
                <button
                    onClick={onCancel}
                    className="w-full py-2 text-[var(--text-muted)] hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:tracking-[0.4em]"
                >
                    CAMBIAR SELECCIÓN
                </button>
            </div>
        </div>
    );
};

export default OpeningSetup;
