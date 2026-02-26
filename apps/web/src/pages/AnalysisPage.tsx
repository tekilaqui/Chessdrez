import React, { useState, useEffect } from 'react';
import {
    ChevronLeft, ChevronRight, RotateCcw, FlipHorizontal,
    Play as PlayIcon, Square, Lightbulb, BarChart2,
    MousePointer2, MessageSquare, AlertTriangle, Info, Search, Sparkles,
    Settings, X
} from 'lucide-react';
import ChessBoard from '../components/ChessBoard';
import { useAnalysisLogic } from '../modules/analysis/useAnalysisLogic';
import { useAIFeedback } from '../hooks/useAIFeedback';
import AISettingsModal from '../components/AISettingsModal';
import { MoveCategory } from '@chess-platform/shared';

const getCategoryColor = (cat: MoveCategory | undefined): string => {
    switch (cat) {
        case 'brilliant': return 'var(--primary-bright)';
        case 'great': return 'hsl(168, 95%, 20%)';
        case 'best': return 'var(--primary-bright)';
        case 'excellent': return 'hsl(168, 60%, 45%)';
        case 'good': return 'var(--text-main)';
        case 'inaccuracy': return 'var(--warning)';
        case 'mistake': return 'hsl(25, 95%, 45%)';
        case 'blunder': return 'var(--danger)';
        case 'forced': return 'var(--text-muted)';
        case 'book': return 'hsl(215, 25%, 27%)';
        default: return 'var(--text-main)';
    }
};

const getCategoryLabel = (cat: MoveCategory | undefined): string => {
    switch (cat) {
        case 'brilliant': return '!!';
        case 'great': return '!';
        case 'best': return '★';
        case 'inaccuracy': return '?!';
        case 'mistake': return '?';
        case 'blunder': return '??';
        default: return '';
    }
};

const AnalysisPage: React.FC = () => {
    const [orientation, setOrientation] = useState<'white' | 'black'>('white');
    const [fenInput, setFenInput] = useState('');
    const [fenError, setFenError] = useState('');
    const [showBestMove, setShowBestMove] = useState(false);
    const [coachExplanation, setCoachExplanation] = useState<string | null>(null);
    const [aiProvider, setAiProvider] = useState<string>('openai');
    const [aiApiKey, setAiApiKey] = useState<string>('');
    const [showAISettings, setShowAISettings] = useState(false);

    const { getExplanation, loading: coachLoading } = useAIFeedback();

    const {
        currentFen,
        history,
        historyIndex,
        isEngineOn,
        isEngineReady,
        evaluation,
        openingName,
        showComments,
        setShowComments,
        showTraps,
        setShowTraps,
        makeMove,
        goBack,
        goForward,
        resetBoard,
        loadFen,
        toggleEngine,
        setHistoryIndex,
        isDeepAnalysis,
        toggleDeepAnalysis,
        runDeepAnalysis,
        deepEval,
        deepLoading
    } = useAnalysisLogic();

    useEffect(() => {
        const savedProvider = localStorage.getItem('chess_ai_provider');
        const savedKey = localStorage.getItem('chess_ai_key');
        if (savedProvider) setAiProvider(savedProvider);
        if (savedKey) setAiApiKey(savedKey);
    }, []);

    const saveAISettings = (provider: string, key: string) => {
        setAiProvider(provider);
        setAiApiKey(key);
        localStorage.setItem('chess_ai_provider', provider);
        localStorage.setItem('chess_ai_key', key);
        setShowAISettings(false);
    };

    useEffect(() => {
        setCoachExplanation(null);
    }, [historyIndex]);

    const handleAskCoach = async () => {
        const current = history[historyIndex];

        const explanation = await getExplanation({
            fen: current.fen,
            lastMove: current.san || '',
            evaluation: evaluation.isMate ? `#${evaluation.mateMoves}` : (evaluation.score?.toFixed(1) || '0.0'),
            context: openingName || '',
            provider: aiProvider,
            apiKey: aiApiKey || undefined
        });

        if (explanation) setCoachExplanation(explanation);
    };

    const customArrows: [string, string, string][] = showBestMove && evaluation.bestMove ? [
        [evaluation.bestMove.slice(0, 2), evaluation.bestMove.slice(2, 4), 'rgba(34, 197, 94, 0.7)']
    ] : [];

    const trapArrows: [string, string, string][] = [];
    if (showTraps && history[historyIndex].comment?.heuristics) {
        history[historyIndex].comment?.heuristics.forEach((h: any) => {
            if (h.id === 'hangs_piece' && h.data?.square) {
                trapArrows.push([h.data.square, h.data.square, 'rgba(239, 68, 68, 0.8)']);
            }
        });
    }

    const currentComment = history[historyIndex].comment;

    const handleLoadFen = () => {
        const ok = loadFen(fenInput);
        if (!ok) setFenError('FEN inválido');
        else setFenError('');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full p-2 lg:p-4 animate-in fade-in duration-500 overflow-hidden">
            {/* AREA DEL TABLERO */}
            <div className="flex-1 flex flex-col gap-3 lg:gap-4 min-h-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 lg:gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isEngineReady ? 'bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]' : 'bg-[var(--warning)] animate-pulse'}`} />
                            <span className="text-[10px] font-black tracking-widest uppercase">IA: {isEngineReady ? 'LISTA' : 'CARGANDO'}</span>
                        </div>
                        {openingName && <span className="text-xs font-bold text-[var(--text-muted)] bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">{openingName}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowTraps(!showTraps)}
                            className={`p-2 rounded-xl transition-all border ${showTraps ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white'}`}
                            title="Analizar trampas y piezas colgadas"
                        >
                            <AlertTriangle size={18} />
                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className={`p-2 rounded-xl transition-all border ${showComments ? 'bg-[var(--primary)]/20 border-[var(--primary)] text-[var(--primary)]' : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white'}`}
                            title="Ver comentarios de la IA"
                        >
                            <MessageSquare size={18} />
                        </button>
                        <button
                            onClick={toggleDeepAnalysis}
                            className={`p-2 rounded-xl transition-all border ${isDeepAnalysis ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white'}`}
                            title="Análisis Profundo (Pulsa una pieza)"
                        >
                            <Search size={18} />
                        </button>
                        <button onClick={() => setOrientation(o => o === 'white' ? 'black' : 'white')} className="btn-secondary !p-2 rounded-xl"><FlipHorizontal size={18} /></button>
                        <button onClick={() => setShowBestMove(!showBestMove)} className={`p-2 rounded-xl transition-all border ${showBestMove ? 'bg-[var(--primary)]/20 border-[var(--primary)] text-[var(--primary)]' : 'bg-white/5 border-white/5 text-[var(--text-muted)] hover:text-white'}`} title="Mostrar mejor jugada"><Lightbulb size={18} /></button>
                    </div>
                </div>

                <div className="bg-black/20 rounded-2xl border border-white/5 p-1.5 lg:p-4 flex items-center justify-center flex-1 min-h-0 shadow-2xl">
                    <div className="flex gap-2 lg:gap-4 w-full h-full justify-center items-stretch">
                        {/* Eval Bar */}
                        <div className="w-4 lg:w-6 bg-[#1e293b] rounded-lg overflow-hidden flex flex-col-reverse border border-white/10 relative shrink-0">
                            <div
                                className="bg-white transition-all duration-700 ease-out"
                                style={{ height: evaluation.score !== null ? `${Math.min(Math.max(50 + (evaluation.score * 5), 5), 95)}%` : '50%' }}
                            />
                            <div className="absolute top-1/2 w-full h-[1px] bg-white/20 z-10" />
                        </div>

                        <div className="flex-1 flex items-center justify-center min-h-0">
                            <ChessBoard
                                fen={currentFen}
                                onMove={(move) => makeMove(move.from, move.to)}
                                onSquareClick={isDeepAnalysis ? (square: string) => runDeepAnalysis(square) : undefined}
                                orientation={orientation}
                                draggable={!isDeepAnalysis}
                                customArrows={[...customArrows, ...trapArrows]}
                            />
                        </div>
                    </div>
                </div>

                {/* CONTROLES DE NAVEGACION */}
                <div className="bg-black/40 rounded-2xl border border-white/5 p-2 flex gap-2 shadow-xl shrink-0">
                    <button onClick={resetBoard} className="btn-secondary flex-1 !p-3 rounded-xl" title="Reiniciar tablero"><RotateCcw size={18} /></button>
                    <button onClick={goBack} disabled={historyIndex === 0} className="btn-secondary flex-1 !p-3 rounded-xl disabled:opacity-20"><ChevronLeft size={24} /></button>
                    <button onClick={goForward} disabled={historyIndex === history.length - 1} className="btn-secondary flex-1 !p-3 rounded-xl disabled:opacity-20"><ChevronRight size={24} /></button>
                    <button
                        onClick={toggleEngine}
                        className={`${isEngineOn ? "bg-[var(--primary)] text-black" : "bg-white/5 text-white"} flex-1 flex items-center justify-center gap-2 rounded-xl font-black text-[10px] tracking-widest transition-all`}
                    >
                        {isEngineOn ? <Square size={14} fill="currentColor" /> : <PlayIcon size={14} fill="currentColor" />}
                        {isEngineOn ? 'DETENER IA' : 'ANALIZAR IA'}
                    </button>
                </div>
            </div>

            {/* PANEL DERECHO */}
            <div className="w-full lg:w-[380px] flex flex-col gap-4 min-h-0">
                {/* EVAL PANEL */}
                <div className="bg-black/40 rounded-2xl border border-white/5 p-5 shadow-xl shrink-0">
                    <h2 className="text-[10px] font-black text-[var(--text-muted)] mb-4 flex items-center gap-3 tracking-[0.2em] uppercase">
                        <BarChart2 size={16} className="text-[var(--primary)]" /> Evaluación
                    </h2>

                    {isEngineOn ? (
                        <div className="flex flex-col gap-4">
                            <div className={`text-4xl font-black text-center ${(evaluation.score || 0) >= 0 ? 'text-[var(--primary)]' : 'text-red-400'} drop-shadow-2xl`}>
                                {evaluation.isMate ? `#${evaluation.mateMoves}` : ((evaluation.score || 0) > 0 ? '+' : '') + (evaluation.score?.toFixed(1) || '0.0')}
                            </div>
                            {evaluation.multipv.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    {evaluation.multipv.slice(0, 3).map((line: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => line.move && makeMove(line.move.slice(0, 2), line.move.slice(2, 4))}
                                            className="w-full flex justify-between items-center py-2.5 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[var(--primary)]/50 transition-all group"
                                        >
                                            <span className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white">{line.move}</span>
                                            <span className={`text-[10px] font-bold ${line.score !== null && line.score >= 0 ? 'text-[var(--primary)]' : 'text-red-400'}`}>
                                                {line.isMate ? `#${line.mateMoves}` : ((line.score || 0) > 0 ? '+' : '') + line.score?.toFixed(1)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-20 flex items-center justify-center text-xs italic text-[var(--text-dim)] border border-dashed border-white/5 rounded-xl">
                            Pulsa ANALIZAR para activar IA
                        </div>
                    )}
                </div>

                {/* DEEP ANALYSIS PANEL */}
                {isDeepAnalysis && (
                    <div className="bg-black/40 rounded-2xl border border-purple-500/30 p-5 shadow-xl shrink-0 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-[10px] font-black text-purple-400 mb-4 flex items-center gap-3 tracking-[0.2em] uppercase">
                            <Search size={16} /> ANÁLISIS PROFUNDO
                        </h2>

                        {deepLoading ? (
                            <div className="h-24 flex items-center justify-center">
                                <Search className="animate-pulse text-purple-500" />
                            </div>
                        ) : deepEval && deepEval.multipv.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                <div className="text-[9px] text-white/40 mb-1 uppercase font-bold">Variantes para la pieza seleccionada:</div>
                                {deepEval.multipv.slice(0, 5).map((line, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                        <span className="text-xs font-bold text-white uppercase">{line.move}</span>
                                        <span className={`text-[10px] font-black ${line.score && line.score >= 0 ? 'text-[var(--primary)]' : 'text-red-400'}`}>
                                            {line.isMate ? `#${line.mateMoves}` : (line.score?.toFixed(1) || '0.0')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xs italic text-white/30 text-center py-4">
                                Pulsa una pieza del tablero para buscar opciones...
                            </div>
                        )}
                    </div>
                )}
                {showComments && (
                    <div className="flex flex-col gap-3">
                        <div className="bg-black/60 rounded-2xl border-l-4 border-l-[var(--primary)] border-y border-r border-white/5 p-4 shadow-xl animate-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Info size={14} className="text-[var(--primary)]" />
                                    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">IA Insight</span>
                                    <button
                                        onClick={() => setShowAISettings(true)}
                                        className="p-1 hover:text-[var(--primary)] transition-colors opacity-40 hover:opacity-100"
                                        title="Configurar IA"
                                    >
                                        <Settings size={10} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAskCoach}
                                    disabled={coachLoading}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-black uppercase tracking-widest hover:bg-[var(--primary)]/20 transition-all disabled:opacity-50"
                                >
                                    <Sparkles size={10} className={coachLoading ? 'animate-spin' : ''} />
                                    {coachLoading ? 'Pensando...' : 'Explicar con IA'}
                                </button>
                            </div>
                            <div className="text-sm font-medium leading-relaxed text-white/90">
                                {currentComment ? (
                                    <>
                                        Jugada <strong style={{ color: getCategoryColor(currentComment.category) }}>{currentComment.category.toUpperCase()}</strong>.
                                        {currentComment.heuristics.length > 0 && (
                                            <span className="block mt-2 text-xs opacity-60 font-normal">
                                                {currentComment.heuristics[0].id.replace(/_/g, ' ')}
                                            </span>
                                        )}
                                    </>
                                ) : "Mueve piezas para recibir análisis táctico..."}
                            </div>
                        </div>

                        {coachExplanation && (
                            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 rounded-2xl border border-[var(--primary)]/20 p-4 shadow-xl animate-in zoom-in-95 duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles size={14} className="text-[var(--primary-bright)]" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Feedback del Maestro</span>
                                </div>
                                <p className="text-xs font-medium leading-relaxed text-white/80 italic">
                                    "{coachExplanation}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* HISTORIAL */}
                <div className="bg-black/40 rounded-2xl border border-white/5 p-4 flex-1 flex flex-col gap-4 shadow-xl min-h-0 overflow-hidden">
                    <h4 className="text-[10px] font-black text-[var(--text-muted)] tracking-widest uppercase">Historial</h4>
                    <div className="flex-1 overflow-y-auto pr-1 flex flex-wrap gap-2 content-start">
                        {history.map((h, i) => (
                            <button
                                key={i}
                                onClick={() => setHistoryIndex(i)}
                                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border transition-all ${historyIndex === i ? 'bg-[var(--primary)] text-black font-black border-[var(--primary)]' : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'}`}
                            >
                                <span className="text-[9px] opacity-40">{i === 0 ? 'INI' : i}</span>
                                <span className="text-[11px] uppercase tracking-tighter">{h.san || (i === 0 ? 'START' : '...')}</span>
                                {h.comment && (
                                    <span className="text-[10px] font-black" style={{ color: historyIndex === i ? 'black' : getCategoryColor(h.comment.category) }}>
                                        {getCategoryLabel(h.comment.category)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* IMPORT FEN */}
                <div className="bg-black/40 rounded-2xl border border-white/5 p-3 shadow-xl shrink-0">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Importar FEN..."
                            value={fenInput}
                            onChange={(e) => setFenInput(e.target.value)}
                            className="flex-1 text-[10px] px-3 py-2 rounded-xl bg-black/40 border border-white/5 focus:border-[var(--primary)]/50 outline-none transition-all font-mono"
                        />
                        <button onClick={handleLoadFen} className="btn-primary !p-2 rounded-xl"><MousePointer2 size={16} /></button>
                    </div>
                </div>
            </div>

            <AISettingsModal
                isOpen={showAISettings}
                onClose={() => setShowAISettings(false)}
                provider={aiProvider}
                apiKey={aiApiKey}
                onSave={saveAISettings}
                setProvider={setAiProvider}
                setApiKey={setAiApiKey}
            />
        </div>
    );
};

export default AnalysisPage;
