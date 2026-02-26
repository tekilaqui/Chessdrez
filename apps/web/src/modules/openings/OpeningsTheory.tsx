import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '../../components/ChessBoard';
import api from '../../api/client';
import { engineManager, EngineEvaluation } from '../game/engine/engineManager';
import { RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Brain, RotateCcw, Heart, BookOpen } from 'lucide-react';

interface OpeningsTheoryProps {
    eco: string;
    color?: 'w' | 'b';
    onExit?: () => void;
}

const OpeningsTheory: React.FC<OpeningsTheoryProps> = ({ eco: selectedEco, color: initialColor, onExit }) => {
    const [openingDetail, setOpeningDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentFen, setCurrentFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [moveHistory, setMoveHistory] = useState<string[]>([]);
    const [mainLine, setMainLine] = useState<string[]>([]);
    const [explanations, setExplanations] = useState<string[]>([]);
    const [inRepertoire, setInRepertoire] = useState(false);

    const [engineEval, setEngineEval] = useState<EngineEvaluation | null>(null);
    const [isDeviated, setIsDeviated] = useState(false);
    const [aiComment, setAiComment] = useState<string>('');

    useEffect(() => {
        const unsub = engineManager.subscribe((ev) => setEngineEval(ev));
        return () => unsub();
    }, []);

    useEffect(() => {
        if (selectedEco) {
            loadOpening(selectedEco);
        }
    }, [selectedEco]);

    const loadOpening = async (eco: string) => {
        setLoading(true);
        try {
            const [opRes, repRes] = await Promise.all([
                api.get(`/openings/${eco}`),
                api.get('/repertoire')
            ]);

            setOpeningDetail(opRes.data);
            const data = opRes.data.dataJson ? JSON.parse(opRes.data.dataJson) : {};
            setMainLine(data.mainLine || []);
            setExplanations(data.explanations || []);
            setInRepertoire(repRes.data.some((r: any) => r.eco === eco));

            const g = new Chess();
            setCurrentFen(g.fen());
            setMoveHistory([]);
            setIsDeviated(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMove = async (move: { from: string; to: string; promotion?: string }) => {
        const g = new Chess(currentFen);
        const result = g.move(move);
        if (!result) return;

        const moveStr = `${move.from}${move.to}${move.promotion || ''}`;
        const newHistory = [...moveHistory, result.san];

        setCurrentFen(g.fen());
        setMoveHistory(newHistory);

        const expectedMove = mainLine[moveHistory.length];
        if (!isDeviated && moveStr !== expectedMove) {
            setIsDeviated(true);
            setAiComment('Analizando desviación teórica...');
            const evalRes = await engineManager.getBestMoveOnce(g.fen(), 14);
            if (evalRes) {
                setAiComment(`Desviación de la línea principal. El motor sugiere ${evalRes}.`);
            }
        } else {
            engineManager.getBestMoveOnce(g.fen(), 12);
        }
    };

    const toggleRepertoire = async () => {
        try {
            if (inRepertoire) {
                await api.delete(`/repertoire/${selectedEco}`);
                setInRepertoire(false);
            } else {
                await api.post('/repertoire', { eco: selectedEco, side: initialColor === 'w' ? 'white' : 'black' });
                setInRepertoire(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleBestMove = async () => {
        const best = await engineManager.getBestMoveOnce(currentFen, 18);
        if (best) {
            handleMove({ from: best.substring(0, 2), to: best.substring(2, 4), promotion: best.length === 5 ? best.charAt(4) : undefined });
        }
    };

    const goToIndex = (idx: number) => {
        const g = new Chess();
        const hist: string[] = [];
        for (let i = 0; i < idx; i++) {
            const m = mainLine[i];
            if (!m) break;
            const res = g.move({ from: m.substring(0, 2), to: m.substring(2, 4), promotion: m.length === 5 ? m.charAt(4) : undefined });
            if (res) hist.push(res.san);
        }
        setCurrentFen(g.fen());
        setMoveHistory(hist);
        setIsDeviated(false);
    };

    if (loading) return <div className="h-full flex items-center justify-center p-8"><RefreshCw className="animate-spin text-[var(--primary)]" /></div>;
    if (!selectedEco) return <div className="h-full flex items-center justify-center p-8"><RefreshCw className="animate-spin text-[var(--primary)]" /></div>;

    const currentExplanation = !isDeviated ? explanations[moveHistory.length - 1] : aiComment;

    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden gap-4 lg:gap-6">
            {/* ── AREA DEL TABLERO – Priorizada y Fluida ── */}
            <div className="flex-[3] flex flex-col gap-3 min-h-0">
                {/* Info bar */}
                <div className="flex items-center justify-between bg-black/20 px-4 py-2.5 rounded-2xl border border-white/5 shrink-0 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[10px] font-black text-[var(--primary-bright)] bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
                            {openingDetail?.eco || 'ECO'}
                        </span>
                        <h2 className="text-xs font-black text-white truncate uppercase tracking-tight">{openingDetail?.name || 'Apertura'}</h2>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={toggleRepertoire}
                            className={`p-2 rounded-xl transition-all border ${inRepertoire ? 'bg-red-500/20 border-red-500/40 text-red-500' : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white'}`}
                        >
                            <Heart size={14} fill={inRepertoire ? "currentColor" : "none"} />
                        </button>
                        {onExit && (
                            <button onClick={onExit} className="text-[9px] font-black text-[var(--text-muted)] hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-xl transition-all flex items-center gap-2">
                                <RotateCcw size={12} /> Cambiar
                            </button>
                        )}
                    </div>
                </div>

                {/* Board Container – Fluid expansion */}
                <div className="flex-1 bg-black/20 rounded-3xl border border-white/5 flex items-center justify-center min-h-0 shadow-2xl overflow-hidden p-2 lg:p-4">
                    <div className="w-full h-full flex items-center justify-center relative">
                        {isDeviated && (
                            <div className="absolute top-4 left-4 z-20 bg-blue-500/80 backdrop-blur-md text-white text-[8px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                                Análisis libre
                            </div>
                        )}
                        <ChessBoard
                            fen={currentFen}
                            onMove={handleMove}
                            orientation={initialColor === 'b' ? 'black' : 'white'}
                            draggable={true}
                            customArrows={engineEval?.bestMove ? [
                                [engineEval.bestMove.substring(0, 2), engineEval.bestMove.substring(2, 4), 'rgba(34,197,94,0.6)']
                            ] : []}
                        />
                    </div>
                </div>

                {/* Navigation bar – Integrated */}
                <div className="flex border border-white/5 rounded-2xl bg-black/40 overflow-hidden shrink-0 shadow-lg">
                    <button onClick={() => goToIndex(0)} disabled={moveHistory.length === 0} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-r border-white/5"><ChevronsLeft size={18} /></button>
                    <button onClick={() => goToIndex(Math.max(0, moveHistory.length - 1))} disabled={moveHistory.length === 0} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-r border-white/5"><ChevronLeft size={18} /></button>
                    <div className="flex-[2] py-3.5 flex items-center justify-center bg-white/5">
                        <span className="font-black text-[10px] text-[var(--primary-bright)] tracking-[0.3em] uppercase">{moveHistory.length} / {mainLine.length}</span>
                    </div>
                    <button onClick={() => goToIndex(Math.min(mainLine.length, moveHistory.length + 1))} disabled={moveHistory.length >= mainLine.length} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-l border-white/5"><ChevronRight size={18} /></button>
                    <button onClick={() => goToIndex(mainLine.length)} disabled={moveHistory.length >= mainLine.length} className="flex-1 py-3.5 flex items-center justify-center hover:bg-white/5 disabled:opacity-10 transition-colors border-l border-white/5"><ChevronsRight size={18} /></button>
                </div>
            </div>

            {/* ── TEORÍA / HISTORIAL – Independently scrollable ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar lg:max-w-[400px]">
                <div className="flex flex-col gap-4 pb-4">
                    {/* Engine eval */}
                    {engineEval && (
                        <div className="bg-black/40 rounded-2xl border border-white/5 px-5 py-4 flex items-center justify-between shrink-0 shadow-md">
                            <div className="flex items-center gap-3">
                                <Brain size={18} className="text-[var(--primary-bright)]" />
                                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Motor Stockfish</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-sm font-black font-mono transition-colors ${engineEval.score && engineEval.score > 0 ? 'text-[var(--primary-bright)]' : 'text-blue-400'}`}>
                                    {engineEval.score !== null ? (engineEval.score > 0 ? `+${engineEval.score.toFixed(1)}` : engineEval.score.toFixed(1)) : '0.0'}
                                </span>
                                <button onClick={handleBestMove} className="text-[10px] font-black text-[var(--primary-bright)] border border-[var(--primary-bright)]/30 px-3 py-1.5 rounded-xl hover:bg-[var(--primary-bright)]/10 transition-all uppercase tracking-widest">
                                    Sugerir
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Theory card */}
                    <div className="bg-[var(--primary-bright)]/5 border-l-4 border-[var(--primary-bright)] rounded-2xl p-5 shadow-xl animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen size={16} className="text-[var(--primary-bright)]" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Teoría Maestra</span>
                        </div>
                        <p className="text-sm font-semibold italic text-white/90 leading-relaxed min-h-[80px]">
                            {currentExplanation ? `"${currentExplanation}"` : "Realiza jugadas para ver la progresión teórica de esta línea..."}
                        </p>
                    </div>

                    {/* Move history */}
                    <div className="bg-black/40 rounded-[28px] border border-white/5 p-5 flex flex-col gap-4 shadow-inner min-h-0">
                        <h4 className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase flex items-center gap-3">
                            <div className="w-4 h-[1px] bg-white/10" /> Historial
                        </h4>
                        <div className="flex flex-wrap gap-2 content-start">
                            {moveHistory.length === 0 ? (
                                <div className="w-full py-12 text-center text-[10px] text-white/10 font-black italic uppercase tracking-[0.3em]">A la espera de jugadas...</div>
                            ) : (
                                moveHistory.map((m, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToIndex(i + 1)}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-xl border transition-all duration-200 ${i === moveHistory.length - 1 ? 'bg-[var(--primary-bright)] text-black font-black border-[var(--primary-bright)] shadow-lg shadow-[var(--primary-bright)]/20' : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        <span className={`text-[9px] font-bold ${i === moveHistory.length - 1 ? 'text-black/40' : 'text-white/20'}`}>{Math.floor(i / 2) + 1}{i % 2 === 0 ? '.' : '..'}</span>
                                        <span className="text-xs font-black uppercase tracking-tight">{m}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningsTheory;
