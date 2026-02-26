import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '../../components/ChessBoard';
import api from '../../api/client';
import { engineManager, EngineEvaluation } from '../game/engine/engineManager';
import { RefreshCw, CheckCircle2, XCircle, RotateCcw, Lightbulb, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Brain } from 'lucide-react';

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface OpeningTrainingProps {
    eco?: string;
    color?: 'w' | 'b';
    onExit?: () => void;
}

const OpeningTraining: React.FC<OpeningTrainingProps> = ({ eco: initialEco, color: initialColor, onExit }) => {
    const [selectedEco, setSelectedEco] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [currentFen, setCurrentFen] = useState(STARTING_FEN);
    const [targetMoves, setTargetMoves] = useState<string[]>([]);
    const [explanations, setExplanations] = useState<string[]>([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [status, setStatus] = useState<'idle' | 'waiting_user' | 'correct' | 'wrong' | 'finished'>('idle');
    const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
    const [showHint, setShowHint] = useState(false);
    const [engineEval, setEngineEval] = useState<EngineEvaluation | null>(null);
    const [isFreePlay, setIsFreePlay] = useState(false);

    const [viewIndex, setViewIndex] = useState(0);
    const [currentFenHistory, setCurrentFenHistory] = useState<string[]>([]);

    useEffect(() => {
        const unsub = engineManager.subscribe((ev: EngineEvaluation) => setEngineEval(ev));
        return () => unsub();
    }, []);

    useEffect(() => {
        if (status === 'waiting_user' && viewIndex === moveIndex) {
            engineManager.getBestMoveOnce(currentFen, 12);
        }
    }, [currentFen, status, viewIndex, moveIndex]);

    useEffect(() => {
        if (initialEco) startTraining(initialEco, initialColor || 'w');
    }, [initialEco, initialColor]);

    const startTraining = (eco: string, color: 'w' | 'b' = 'w') => {
        setSelectedEco(eco);
        setPlayerColor(color);
        setStatus('idle');
        setIsFreePlay(false);
        setLoading(true);

        api.get(`/openings/${eco}`).then(res => {
            const dataJson = res.data.dataJson ? JSON.parse(res.data.dataJson) : null;
            const line = dataJson?.mainLine || [];
            const expl = dataJson?.explanations || Array(line.length).fill('Movimiento teórico.');
            setTargetMoves(line);
            setExplanations(expl);
            setMoveIndex(0);
            const g = new Chess();
            setCurrentFen(g.fen());
            setCurrentFenHistory([g.fen()]);
            setShowHint(false);
            if (color === 'w') {
                setStatus('waiting_user');
            } else {
                const compMove = line[0];
                if (compMove) {
                    setTimeout(() => {
                        const nextGame = new Chess();
                        nextGame.move({ from: compMove.substring(0, 2), to: compMove.substring(2, 4), promotion: compMove.length === 5 ? compMove.charAt(4) : undefined });
                        const nextFen = nextGame.fen();
                        setCurrentFen(nextFen);
                        setCurrentFenHistory([g.fen(), nextFen]);
                        setMoveIndex(1);
                        setStatus('waiting_user');
                    }, 600);
                } else {
                    setStatus('waiting_user');
                }
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    const handleMove = async (move: { from: string; to: string; promotion?: string }) => {
        if (status !== 'waiting_user' || viewIndex !== moveIndex) return;
        const game = new Chess(currentFen);
        const moveRes = game.move(move);
        if (!moveRes) return;
        const moveStr = `${move.from}${move.to}${move.promotion || ''}`;
        const userFen = game.fen();
        setCurrentFen(userFen);
        const updatedHistory = [...currentFenHistory.slice(0, moveIndex + 1), userFen];
        setCurrentFenHistory(updatedHistory);
        setMoveIndex(moveIndex + 1);

        if (isFreePlay) {
            setStatus('idle');
            const aiMove = await engineManager.getBestMoveOnce(userFen, 12);
            if (aiMove) {
                const aiGame = new Chess(userFen);
                aiGame.move({ from: aiMove.substring(0, 2), to: aiMove.substring(2, 4), promotion: aiMove.length === 5 ? aiMove.charAt(4) : undefined });
                const aiFen = aiGame.fen();
                setTimeout(() => {
                    setCurrentFen(aiFen);
                    setCurrentFenHistory(prev => [...prev.slice(0, updatedHistory.length), aiFen]);
                    setMoveIndex(updatedHistory.length);
                    setStatus('waiting_user');
                }, 600);
            } else { setStatus('waiting_user'); }
            return;
        }

        const expectedMove = targetMoves[moveIndex];
        if (moveStr === expectedMove) {
            setStatus('correct');
            const nextIdx = moveIndex + 1;
            setTimeout(async () => {
                if (nextIdx >= targetMoves.length) {
                    setIsFreePlay(true);
                    setStatus('finished');
                    api.post(`/training/progress/${selectedEco}`, { progress: 100 }).catch(console.error);
                    const aiMove = await engineManager.getBestMoveOnce(userFen, 12);
                    if (aiMove) {
                        const aiGame = new Chess(userFen);
                        aiGame.move({ from: aiMove.substring(0, 2), to: aiMove.substring(2, 4), promotion: aiMove.length === 5 ? aiMove.charAt(4) : undefined });
                        const aiFen = aiGame.fen();
                        setCurrentFen(aiFen);
                        setCurrentFenHistory(prev => [...prev.slice(0, nextIdx + 1), aiFen]);
                        setMoveIndex(nextIdx + 1);
                        setStatus('waiting_user');
                    } else { setStatus('waiting_user'); }
                } else {
                    const compMove = targetMoves[nextIdx];
                    const nextGame = new Chess(userFen);
                    nextGame.move({ from: compMove.substring(0, 2), to: compMove.substring(2, 4), promotion: compMove.length === 5 ? compMove.charAt(4) : undefined });
                    const compFen = nextGame.fen();
                    setCurrentFen(compFen);
                    setCurrentFenHistory(prev => [...prev.slice(0, nextIdx + 1), compFen]);
                    setMoveIndex(nextIdx + 1);
                    setStatus('waiting_user');
                }
            }, 800);
        } else {
            setStatus('wrong');
        }
    };

    const handleContinueFromDeviation = async () => {
        setIsFreePlay(true);
        setStatus('idle');
        const aiMove = await engineManager.getBestMoveOnce(currentFen, 14);
        if (aiMove) {
            const game = new Chess(currentFen);
            game.move({ from: aiMove.substring(0, 2), to: aiMove.substring(2, 4), promotion: aiMove.length === 5 ? aiMove.charAt(4) : undefined });
            const nextFen = game.fen();
            setCurrentFen(nextFen);
            setCurrentFenHistory(prev => [...prev.slice(0, moveIndex + 1), nextFen]);
            setMoveIndex(moveIndex + 1);
            setStatus('waiting_user');
        } else { setStatus('waiting_user'); }
    };

    const handleBestMove = async () => {
        const best = await engineManager.getBestMoveOnce(currentFen, 18);
        if (best) handleMove({ from: best.substring(0, 2), to: best.substring(2, 4), promotion: best.length === 5 ? best.charAt(4) : undefined });
    };

    useEffect(() => { setViewIndex(moveIndex); }, [moveIndex]);

    const navigateTo = (idx: number) => {
        if (idx < 0 || idx > moveIndex) return;
        setViewIndex(idx);
    };

    const displayedFen = currentFenHistory[viewIndex] || currentFen;

    if (loading && !selectedEco) return <div className="h-full flex items-center justify-center p-8"><RefreshCw className="animate-spin text-[var(--primary)]" /></div>;

    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden gap-4 lg:gap-6">
            {/* ── AREA DEL TABLERO – Fluida y Priorizada ── */}
            <div className="flex-[3] flex flex-col gap-3 min-h-0">
                {/* Info bar */}
                <div className="flex items-center justify-between bg-black/20 px-4 py-2.5 rounded-2xl border border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-white bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10">{selectedEco || 'ECON'}</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            {playerColor === 'w' ? '□ Blancas' : '■ Negras'}
                        </span>
                    </div>
                    {onExit && (
                        <button onClick={onExit} className="text-[9px] font-black text-[var(--text-muted)] hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-xl transition-all flex items-center gap-2">
                            <RotateCcw size={12} /> Salir
                        </button>
                    )}
                </div>

                {/* Board container – Fluid expansion */}
                <div className="flex-1 bg-black/20 rounded-3xl border border-white/5 flex items-center justify-center min-h-0 shadow-2xl p-2 lg:p-4 overflow-hidden relative">
                    <ChessBoard
                        fen={displayedFen}
                        onMove={(viewIndex === moveIndex && (status === 'waiting_user' || status === 'finished')) ? handleMove : undefined}
                        orientation={playerColor === 'w' ? 'white' : 'black'}
                        draggable={viewIndex === moveIndex && (status === 'waiting_user' || status === 'finished')}
                        customArrows={showHint && viewIndex === moveIndex && engineEval?.bestMove ? [
                            [engineEval.bestMove.substring(0, 2), engineEval.bestMove.substring(2, 4), 'rgba(34,197,94,0.6)']
                        ] : []}
                    />
                </div>

                {/* Navigation bar – Integrated */}
                <div className="flex border border-white/5 rounded-2xl bg-black/40 overflow-hidden shrink-0 shadow-lg">
                    <button onClick={() => navigateTo(0)} disabled={viewIndex === 0} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-r border-white/5"><ChevronsLeft size={18} /></button>
                    <button onClick={() => navigateTo(viewIndex - 1)} disabled={viewIndex === 0} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-r border-white/5"><ChevronLeft size={18} /></button>
                    <div className="flex-[2] py-3.5 flex items-center justify-center bg-white/5">
                        <span className="font-black text-[10px] text-[var(--primary-bright)] tracking-[0.3em] uppercase">M{viewIndex}/{moveIndex}</span>
                    </div>
                    <button onClick={() => navigateTo(viewIndex + 1)} disabled={viewIndex >= moveIndex} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-l border-white/5"><ChevronRight size={18} /></button>
                    <button onClick={() => navigateTo(moveIndex)} disabled={viewIndex >= moveIndex} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-l border-white/5"><ChevronsRight size={18} /></button>
                </div>
            </div>

            {/* ── CONTROLES Y FEEDBACK – Scroll independientes ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar lg:max-w-[400px]">
                <div className="flex flex-col gap-4 pb-4">
                    {/* Status feedback */}
                    {status === 'finished' && (
                        <div className="bg-green-500/10 text-green-400 px-5 py-4 rounded-2xl border border-green-500/20 flex flex-col gap-3 animate-in zoom-in duration-500 shadow-lg">
                            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.2em]"><CheckCircle2 size={16} className="shrink-0" /> Variante Dominada</div>
                            <button onClick={() => startTraining(selectedEco!, playerColor)} className="btn-primary !py-3 font-black text-[10px] tracking-widest uppercase">Repetir Entrenamiento</button>
                        </div>
                    )}
                    {status === 'wrong' && (
                        <div className="bg-red-500/10 text-red-500 px-5 py-4 rounded-2xl border border-red-500/20 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight"><XCircle size={18} className="shrink-0" /> Movimiento Incorrecto</div>
                            <div className="flex gap-2">
                                <button onClick={() => startTraining(selectedEco!, playerColor)} className="flex-1 bg-white/5 border border-white/10 text-white font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Reintentar</button>
                                <button onClick={handleContinueFromDeviation} className="flex-1 bg-blue-600 text-white font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">Analizar</button>
                            </div>
                        </div>
                    )}
                    {status === 'correct' && (
                        <div className="bg-[var(--primary-bright)]/10 text-[var(--primary-bright)] px-5 py-4 rounded-2xl border border-[var(--primary-bright)]/20 shadow-md">
                            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em] mb-2 text-white/40"><CheckCircle2 size={14} /> Correcto</div>
                            <p className="text-sm font-semibold italic opacity-90 leading-relaxed">"{explanations[moveIndex - 1]}"</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className={`py-4 rounded-2xl flex items-center justify-center gap-2 transition-all border text-[10px] font-black uppercase tracking-widest ${showHint
                                ? 'bg-[var(--primary-bright)] border-[var(--primary-bright)] text-black shadow-lg shadow-[var(--primary-bright)]/20'
                                : 'bg-black/40 border-white/10 text-white hover:border-[var(--primary-bright)]/40'
                                }`}
                        >
                            <Lightbulb size={18} /> Pista
                        </button>
                        <button
                            onClick={handleBestMove}
                            disabled={status === 'idle'}
                            className="py-4 rounded-2xl flex items-center justify-center gap-2 bg-black/40 border border-white/10 text-white hover:border-[var(--primary-bright)]/40 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-30"
                        >
                            <Brain size={18} className="text-[var(--primary-bright)]" /> Motor
                        </button>
                    </div>

                    {/* Session progress info */}
                    <div className="bg-black/40 rounded-2xl border border-white/5 px-5 py-4 flex flex-col gap-3 shadow-inner">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Estado de la sesión</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${status === 'waiting_user' ? 'bg-[var(--primary-bright)] animate-pulse' : 'bg-white/20'}`} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                    {status === 'waiting_user' && 'Tu movimiento'}
                                    {status === 'idle' && 'IA Calculando...'}
                                    {isFreePlay && status !== 'waiting_user' && 'Análisis Libre'}
                                    {status === 'wrong' && 'Desviado'}
                                    {status === 'finished' && !isFreePlay && '¡Línea Completada!'}
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--primary-bright)] transition-all duration-500"
                                style={{ width: `${(moveIndex / targetMoves.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningTraining;
