import React, { useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '../../components/ChessBoard';
import { Target, CheckCircle2, RotateCcw, ChevronRight, Brain } from 'lucide-react';

const MOCK_EXERCISES = [
    {
        id: 1,
        title: 'Gambito de Dama - Aceptado',
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
        expectedMove: 'd5c4',
        explanation: 'En el Gambito de Dama Aceptado, las negras capturan el peón de c4, cediendo momentáneamente el centro por un desarrollo rápido o un juego desequilibrado.'
    },
    {
        id: 2,
        title: 'Defensa Siciliana - Variante Abierta',
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        expectedMove: 'b8c6',
        explanation: 'Las negras continúan el desarrollo y presionan la casilla d4 preparando el combate en el centro.'
    }
];

interface OpeningExercisesProps {
    eco?: string;
    color?: 'w' | 'b';
}

const OpeningExercises: React.FC<OpeningExercisesProps> = ({ eco: initialEco, color: initialColor }) => {
    // Filter mock exercises to show something relevant if eco is provided
    const relevantExercises = initialEco
        ? MOCK_EXERCISES.filter(ex => ex.title.toLowerCase().includes(initialEco.toLowerCase()) || initialEco === 'B01')
        : MOCK_EXERCISES;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentFen, setCurrentFen] = useState((relevantExercises[0] || MOCK_EXERCISES[0]).fen);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

    const exercise = relevantExercises[currentIndex] || MOCK_EXERCISES[0];

    const handleMove = (move: { from: string; to: string; promotion?: string }) => {
        if (status === 'correct') return; // already solved

        const game = new Chess(currentFen);
        try {
            const res = game.move(move);
            if (!res) return;

            // Instant UI Update
            setCurrentFen(game.fen());

            const moveStr = `${move.from}${move.to}`;
            if (moveStr === exercise.expectedMove) {
                setStatus('correct');
            } else {
                setStatus('wrong');
                setTimeout(() => setStatus('idle'), 1500);
            }
        } catch (e) {
            // invalid move
        }
    };

    const nextExercise = () => {
        const next = (currentIndex + 1) % relevantExercises.length;
        setCurrentIndex(next);
        setCurrentFen(relevantExercises[next].fen);
        setStatus('idle');
    };

    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden gap-4 lg:gap-6">
            {/* ── AREA DEL TABLERO – Priorizada y Fluida ── */}
            <div className="flex-[3] flex flex-col gap-3 min-h-0">
                {/* Header bar */}
                <div className="flex items-center justify-between bg-black/20 px-5 py-3 rounded-2xl border border-white/5 shrink-0 shadow-sm">
                    <div>
                        <div className="text-[10px] font-black text-[var(--primary-bright)] mb-1 uppercase tracking-[0.3em]">
                            Ejercicio {currentIndex + 1} de {relevantExercises.length}
                        </div>
                        <h2 className="text-sm font-black text-white leading-tight uppercase tracking-tight">{exercise.title}</h2>
                    </div>
                    <button onClick={nextExercise} className="text-[10px] font-black text-[var(--text-muted)] hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-xl transition-all">
                        Saltar
                    </button>
                </div>

                {/* Board container – Fluid expansion */}
                <div className="flex-1 bg-black/20 rounded-3xl border border-white/5 flex items-center justify-center min-h-0 shadow-2xl p-2 lg:p-4 overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center relative">
                        {status === 'wrong' && (
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none">
                                <div className="bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-2xl animate-in zoom-in-95 duration-200">
                                    Jugada incorrecta
                                </div>
                            </div>
                        )}
                        <ChessBoard
                            fen={currentFen}
                            onMove={handleMove}
                            orientation={exercise.fen.includes(' w ') ? 'white' : 'black'}
                            draggable={status !== 'correct'}
                        />
                    </div>
                </div>

                {/* Integrated Control Bar */}
                <div className="flex border border-white/5 rounded-2xl bg-black/40 overflow-hidden shrink-0 shadow-lg">
                    <button
                        onClick={() => setCurrentFen(exercise.fen)}
                        className="flex-1 py-4 flex items-center justify-center hover:bg-white/5 transition-colors border-r border-white/5 group"
                    >
                        <RotateCcw size={20} className="text-white group-hover:rotate-[-90deg] transition-transform" />
                    </button>
                    <div className="flex-[3] py-4 flex items-center justify-center bg-white/5">
                        <span className="font-black text-[10px] text-[var(--primary-bright)] tracking-[0.3em] uppercase flex items-center gap-2">
                            <Target size={16} /> Posición Teórica
                        </span>
                    </div>
                    <button
                        onClick={nextExercise}
                        className="flex-1 py-4 flex items-center justify-center hover:bg-white/5 transition-colors border-l border-white/5"
                    >
                        <ChevronRight size={24} className="text-white" />
                    </button>
                </div>
            </div>

            {/* ── FEEDBACK Y ESTADO – Independiente ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar lg:max-w-[400px]">
                <div className="flex flex-col gap-4 pb-4">
                    {/* Solution Feedback */}
                    {status === 'correct' && (
                        <div className="bg-green-500/10 text-green-400 p-6 rounded-2xl border border-green-500/20 animate-in zoom-in duration-500 shadow-xl">
                            <div className="flex items-center gap-3 font-black mb-3 uppercase tracking-widest text-[11px]">
                                <CheckCircle2 size={18} /> ¡Correcto!
                            </div>
                            <p className="text-sm font-semibold italic opacity-90 leading-relaxed mb-5">"{exercise.explanation}"</p>
                            <button onClick={nextExercise} className="btn-primary w-full text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-xl">
                                Siguiente Ejercicio
                            </button>
                        </div>
                    )}

                    {/* Instruction Card */}
                    <div className="bg-black/40 rounded-2xl border border-white/5 p-5 flex flex-col gap-4 shadow-inner">
                        <div className="flex items-center gap-3">
                            <Brain size={18} className="text-white/20" />
                            <h4 className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">Instrucción</h4>
                        </div>
                        <p className="text-xs font-medium text-white/60 leading-relaxed uppercase tracking-wide">
                            Encuentra la mejor continuación teórica para esta apertura. Analiza la estructura de peones y el desarrollo de piezas.
                        </p>
                    </div>

                    {/* Stats Card (Simplified) */}
                    <div className="bg-black/20 rounded-2xl border border-white/5 px-5 py-4 flex items-center justify-between">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Modo</span>
                        <span className="text-[10px] font-black text-[var(--primary-bright)] uppercase tracking-widest">Ejercicios Teóricos</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningExercises;
