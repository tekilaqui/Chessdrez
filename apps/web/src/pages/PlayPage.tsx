import React, { useEffect, useState, useCallback } from 'react';
import { detectOpening, CommentEngine, MoveComment } from '@chess-platform/shared';
import { RotateCcw, Flag, Lightbulb, Clock, Terminal, BarChart2, GraduationCap, Info, Search, MessageSquare, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useGameLogic } from '../modules/game/useGameLogic';
import { engineManager, EngineEvaluation } from '../modules/game/engine/engineManager';
import { usePlayEngine } from '../modules/game/hooks/usePlayEngine';
import ChessBoard from '../components/ChessBoard';
import { useChessClock } from '../hooks/useChessClock';
import { ClockDisplay } from '../components/GameClocks';
import GameConfigModal from '../components/GameConfigModal';
import AISettingsModal from '../components/AISettingsModal';
import { useAIFeedback } from '../hooks/useAIFeedback';
import { useTranslation } from '../hooks/useTranslation';
import { Settings, Sparkles } from 'lucide-react';

const PlayPage: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [gameId, setGameId] = useState<string | null>(null);
    const [showBestMove, setShowBestMove] = useState(false);
    const [showTraps, setShowTraps] = useState(false);
    const [showLiveAnalysis, setShowLiveAnalysis] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [engineActive, setEngineActive] = useState<boolean>(() => {
        try { const v = localStorage.getItem('engine_active'); return v === null ? true : v === '1'; } catch { return true; }
    });
    const [insightActive, setInsightActive] = useState<boolean>(() => {
        try { const v = localStorage.getItem('insight_active'); return v === null ? true : v === '1'; } catch { return true; }
    });
    const [coachExplanation, setCoachExplanation] = useState<string | null>(null);
    const [aiProvider, setAiProvider] = useState<string>('openai');
    const [aiApiKey, setAiApiKey] = useState<string>('');
    const [showAISettings, setShowAISettings] = useState(false);

    const { getExplanation, loading: coachLoading, error: coachError } = useAIFeedback();

    // Deep Analysis State
    const [isDeepAnalysis, setIsDeepAnalysis] = useState(false);
    const [deepEval, setDeepEval] = useState<EngineEvaluation | null>(null);
    const [deepLoading, setDeepLoading] = useState(false);

    const logic = useGameLogic();
    const {
        gameState,
        setGameState,
        playerColor,
        fen,
        turn,
        isGameOver,
        surrendered,
        status,
        history,
        timeWInitial,
        timeBInitial,
        timeControlStr,
        isEngineReady,
        startGame,
        handlePlayerMove,
        surrender,
        timeOut,
        triggerCpuMove,
        difficultyLevel,
        uciHistory
    } = logic;

    const {
        timeW,
        timeB,
        formatTime
    } = useChessClock({
        timeWInitial,
        timeBInitial,
        turn,
        isGameOver: isGameOver || surrendered,
        onTimeOut: timeOut
    });

    const {
        evaluation,
        bestMoveArrow,
        fullHistory
    } = usePlayEngine(fen, history, uciHistory, isEngineReady);

    // When user toggles live analysis, start/stop engine analysis explicitly
    useEffect(() => {
        if (!isEngineReady) return;
        const currentFen = fen === 'start' ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : fen;
        if (showLiveAnalysis) {
            console.log('[PlayPage] Enabling live analysis for fen', currentFen);
            engineManager.analyze(currentFen, 'depth 15');
        } else {
            console.log('[PlayPage] Disabling live analysis (stopping engine)');
            engineManager.stop();
        }
    }, [showLiveAnalysis, isEngineReady, fen]);

    const currentOpening = detectOpening(uciHistory);

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
        console.log('[PlayPage] AI settings saved', { provider, hasKey: !!key });
    };

    useEffect(() => {
        setCoachExplanation(null);
    }, [history.length]);

    useEffect(() => {
        if (coachError) {
            setCoachExplanation(`Error: ${coachError}`);
        }
    }, [coachError]);

    const handleAskCoach = async () => {
        setCoachExplanation(null);
        const lastFullMove = fullHistory[history.length];
        if (!insightActive) {
            console.log('[PlayPage] Insight is disabled — skipping remote/local explanation');
            setCoachExplanation('Insight desactivado. Activa Insight para obtener comentarios.');
            return;
        }

        // Try remote AI first (only if we have an api key configured)
        if (history.length > 0 && aiApiKey) {
            const explanation = await getExplanation({
                fen: lastFullMove.fen,
                lastMove: lastFullMove.san || '',
                evaluation: evaluation.isMate ? `#${evaluation.mateMoves}` : (evaluation.score?.toFixed(1) || '0.0'),
                context: currentOpening?.name || '',
                provider: aiProvider,
                apiKey: aiApiKey || undefined
            });

            if (explanation) {
                setCoachExplanation(explanation);
                return;
            }
        }

        // Fallback: generate a simple local explanation using CommentEngine
        try {
            const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

            const rawPrevFen = fullHistory[history.length - 1]?.fen || 'start';
            const rawCurFen = lastFullMove?.fen || fen || 'start';

            const prevFen = rawPrevFen === 'start' ? STARTING_FEN : rawPrevFen;
            const curFen = rawCurFen === 'start' ? STARTING_FEN : rawCurFen;

            console.log('[PlayPage] Local explanation fallback inputs', { prevFen, curFen, historySlice: uciHistory.slice(0, history.length) });

            const moveEval = {
                evalBefore: fullHistory[history.length - 1]?.evaluation?.score ?? 0,
                evalAfter: evaluation.score ?? 0,
                delta: (evaluation.score ?? 0) - (fullHistory[history.length - 1]?.evaluation?.score ?? 0),
                isMate: evaluation.isMate,
                bestMove: (fullHistory[history.length - 1]?.evaluation?.bestMove) || undefined
            };

            console.log('[PlayPage] Calling CommentEngine.generateComment', { moveEval });
            const comment = CommentEngine.generateComment(prevFen, curFen, moveEval, uciHistory.slice(0, history.length));
            console.log('[PlayPage] CommentEngine returned', comment);

            const text = (() => {
                if (!comment) return 'Sin comentario disponible.';
                const parts: string[] = [];
                if (comment.category) parts.push(`Resultado: ${comment.category.toUpperCase()}`);
                if (comment.heuristics && comment.heuristics.length > 0) {
                    comment.heuristics.slice(0, 4).forEach((h: any) => {
                        const hmsg = getHeuristicMessage(h);
                        parts.push(`- ${hmsg}`);
                    });
                } else if ((comment as any).note) {
                    parts.push((comment as any).note);
                }
                return parts.join('\n');
            })();

            setCoachExplanation(text);
        } catch (err: any) {
            console.error('[PlayPage] Local explanation generation failed', err);
            const message = err?.message || String(err) || 'Error desconocido';
            setCoachExplanation(`Error: no se pudo generar explicación localmente — ${message}`);
        }
    };

    const coachBtnClass = coachLoading
        ? 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-100 text-[9px] font-black uppercase tracking-wider animate-pulse'
        : (isEngineReady
            ? 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 text-[9px] font-black uppercase tracking-wider hover:bg-indigo-500/30 transition-all'
            : 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/30 text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-30'
        );

    // Debug: log clicks and top elements to diagnose unresponsive UI
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            try {
                const el = document.elementFromPoint(e.clientX, e.clientY);
                console.log('[PlayPage DEBUG] click at', { x: e.clientX, y: e.clientY, target: (e.target as any)?.tagName, topElement: el });
            } catch (err) {
                console.log('[PlayPage DEBUG] click', err);
            }
        };
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    // Create backend game record
    useEffect(() => {
        if (gameState !== 'playing' || !user) return;
        api.post('/games', {
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            whitePlayerId: playerColor === 'w' ? user.id : undefined,
            blackPlayerId: playerColor === 'b' ? user.id : undefined,
            source: 'ai',
            aiLevel: difficultyLevel,
            timeControl: timeControlStr
        }).then(res => setGameId(res.data.id)).catch(() => { });
    }, [gameState, user, playerColor, difficultyLevel, timeControlStr]);

    const handlePlayerMoveInput = (move: { from: string; to: string; promotion?: string }) => {
        const res = handlePlayerMove(move);
        if (res && gameId) {
            api.put(`/games/${gameId}`, { fen: res.newFen }).catch(() => { });
        }
    };

    useEffect(() => {
        if (gameState !== 'playing' || turn === playerColor) return;
        console.log('[PlayPage] Triggering CPU move for turn:', turn);
        if (!engineActive) {
            console.log('[PlayPage] engineActive is false — skipping CPU move');
            return;
        }

        triggerCpuMove().then((res: any) => {
            if (res && gameId) {
                console.log('[PlayPage] CPU move processed, updating backend:', res.newFen);
                api.put(`/games/${gameId}`, { fen: res.newFen }).catch(() => { });
            } else {
                console.log('[PlayPage] CPU move failed or gameId missing:', { res, gameId });
            }
        });
    }, [turn, playerColor, gameState, isEngineReady, triggerCpuMove, gameId]);

    const runDeepAnalysis = async (square: string) => {
        if (!isEngineReady) return;
        setDeepLoading(true);
        setIsDeepAnalysis(true);
        const fenToAnalyze = fen === 'start' ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : fen;
        const res = await engineManager.getMovesForSquare(fenToAnalyze, square);
        setDeepEval(res);
        setDeepLoading(false);
    };

    const toggleDeepAnalysis = () => {
        const next = !isDeepAnalysis;
        setIsDeepAnalysis(next);
        if (!next) setDeepEval(null);
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'brilliant': return '#00fff2';
            case 'great': return '#3b82f6';
            case 'best': return '#22c55e';
            case 'excellent': return '#84cc16';
            case 'good': return '#ffffff';
            case 'book': return '#d97706';
            case 'inaccuracy': return '#fbbf24';
            case 'mistake': return '#f97316';
            case 'blunder': return '#ef4444';
            default: return 'var(--text-muted)';
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'brilliant': return '!!';
            case 'great': return '!';
            case 'best': return '★';
            case 'book': return '📖';
            case 'inaccuracy': return '?!';
            case 'mistake': return '?';
            case 'blunder': return '??';
            default: return '';
        }
    };

    const getHeuristicMessage = (h: any) => {
        const id = h.id || '';
        const data = h.data || {};
        switch (id) {
            case 'hangs_piece':
                return `Pieza colgada en ${data.square || '??'}: está atacada y no está protegida.`;
            case 'material_loss':
                return `Pérdida/material: cambio neto ${data.netBalance ?? ''} (revisa captura).`;
            case 'king_safety':
                return `Debilidad de rey: ${data.side === 'w' ? 'blancas' : 'negras'} tiene menos protección.`;
            case 'development':
                return `Desarrollo insuficiente: mueve tus piezas menores o completa enroque.`;
            case 'book':
                return `Desviación teórica: estás saliendo de la línea principal.`;
            case 'forced':
                return `Jugada forzada: el resultado viene impuesto por tácticas cercanas.`;
            default:
                return id.replace(/_/g, ' ');
        }
    };

    const formatMoveCommentText = (comment: any) => {
        if (!comment) return '';
        const parts: string[] = [];
        if (comment.category) parts.push(comment.category.toUpperCase());
        if (comment.opening && comment.opening.name) parts.push(`Opening: ${comment.opening.name}`);
        if (comment.heuristics && comment.heuristics.length > 0) {
            comment.heuristics.forEach((h: any) => parts.push(getHeuristicMessage(h)));
        }
        return parts.join('\n');
    };

    if (gameState === 'config') {
        return (
            <div className="flex justify-center items-center py-12 px-8 min-h-[calc(100dvh-100px)]">
                <GameConfigModal onStart={startGame} />
            </div>
        );
    }

    const boardFen = fen === 'start'
        ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        : fen;

    const opponentTime = playerColor === 'w' ? timeB : timeW;
    const myTime = playerColor === 'w' ? timeW : timeB;

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-full p-4 lg:p-6 animate-in fade-in duration-500 overflow-hidden bg-[#0a0c10] overscroll-none">
            {/* LEFT: Board area (The star of the show) */}
            <div className="flex-[3] flex flex-col gap-2 min-h-0 relative">
                {/* Status Bar - Enriched with Expert Tools */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${isEngineReady
                            ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/20 text-[var(--primary-bright)]'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isEngineReady ? 'bg-[var(--primary-bright)]' : 'bg-amber-400 animate-pulse'}`} />
                            <span>{isEngineReady ? 'Motor IA Listo' : 'Cargando Motor...'}</span>
                        </div>

                        {/* Debug: show current engine evaluation */}
                        <div className="ml-3 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/80">
                            <div style={{ fontSize: '10px', opacity: 0.8 }}>Eval: {evaluation.score !== null ? evaluation.score.toFixed(2) : 'null'}</div>
                            <div style={{ fontSize: '10px', opacity: 0.8 }}>Best: {evaluation.bestMove || '-'}</div>
                            <div style={{ fontSize: '10px', opacity: 0.6 }}>MPV: {evaluation.multipv?.map(m => m.move).filter(Boolean).slice(0, 3).join(', ') || '-'}</div>
                        </div>

                        {/* Coach AI Insight */}
                        <button
                            onClick={handleAskCoach}
                            disabled={coachLoading || !isEngineReady || !insightActive}
                            className={`p-2 rounded-lg transition-all border ${coachLoading ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-100 animate-pulse' : (!insightActive ? 'bg-white/5 border-white/5 text-white/30 opacity-50 cursor-not-allowed' : (isEngineReady ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/30' : 'bg-white/5 border-white/5 text-white/30'))}`}
                            title={coachLoading ? 'Analizando...' : (!insightActive ? 'Insight desactivado' : 'Insight IA')}
                        >
                            <Sparkles size={12} className={coachLoading ? 'animate-spin' : ''} />
                            <span className="ml-2 text-[9px] font-black uppercase tracking-wider">{coachLoading ? 'Analizando...' : 'Insight IA'}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowAISettings(true)}
                            className={`p-2 rounded-lg border transition-all ${engineActive ? 'bg-white/5 border-white/5 text-white/30 hover:text-white/80' : 'bg-white/5 border-white/5 text-white/20 opacity-60'}`}
                            title="Ajustes de IA"
                        >
                            <Settings size={16} />
                        </button>
                        <button
                            onClick={() => {
                                const next = !engineActive;
                                setEngineActive(next);
                                try { localStorage.setItem('engine_active', next ? '1' : '0'); } catch { }
                                console.log('[PlayPage] engineActive ->', next);
                            }}
                            className={`p-2 rounded-lg border transition-all ${engineActive ? 'bg-green-600/10 border-green-600/30 text-green-300' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title={engineActive ? 'IA activa (CPU mueve)' : 'IA inactiva (CPU deshabilitada)'}
                        >
                            <Terminal size={16} />
                        </button>
                        <button
                            onClick={() => {
                                const next = !insightActive;
                                setInsightActive(next);
                                try { localStorage.setItem('insight_active', next ? '1' : '0'); } catch { }
                                console.log('[PlayPage] insightActive ->', next);
                            }}
                            className={`p-2 rounded-lg border transition-all ${insightActive ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title={insightActive ? 'Insight activado' : 'Insight desactivado'}
                        >
                            <GraduationCap size={16} />
                        </button>
                        <div className="w-[1px] h-6 bg-white/10 mx-1" />
                        <button
                            onClick={() => setShowLiveAnalysis(!showLiveAnalysis)}
                            className={`p-2 rounded-lg border transition-all ${showLiveAnalysis ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title="Barra de Evaluación"
                        >
                            <BarChart2 size={16} />
                        </button>
                        <button
                            onClick={() => { const next = !showBestMove; console.log('[PlayPage] toggle showBestMove ->', next); setShowBestMove(next); }}
                            className={`p-2 rounded-lg border transition-all ${showBestMove ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title="Mejor Movimiento"
                        >
                            <Lightbulb size={16} />
                        </button>
                        <button
                            onClick={() => { const next = !showTraps; console.log('[PlayPage] toggle showTraps ->', next); setShowTraps(next); }}
                            className={`p-2 rounded-lg border transition-all ${showTraps ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title="Mostrar Trampas"
                        >
                            <AlertTriangle size={16} />
                        </button>
                        <button
                            onClick={() => { const next = !showComments; console.log('[PlayPage] toggle showComments ->', next); setShowComments(next); }}
                            className={`p-2 rounded-lg border transition-all ${showComments ? 'bg-[var(--primary)]/20 border-[var(--primary)]/40 text-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title="Mostrar Comentarios IA"
                        >
                            <MessageSquare size={16} />
                        </button>
                        <button
                            onClick={toggleDeepAnalysis}
                            className={`p-2 rounded-lg border transition-all ${isDeepAnalysis ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' : 'bg-white/5 border-white/5 text-white/30'}`}
                            title="Análisis de Casillas"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative min-h-0">
                    {/* Opponent Clock - Floating Top Right */}
                    <div className="absolute top-2 right-6 z-20 pointer-events-none">
                        <div className="pointer-events-auto bg-[#1a1c24]/80 backdrop-blur-md p-1 rounded-xl shadow-2xl border border-white/5">
                            <ClockDisplay
                                label="Oponente"
                                time={opponentTime}
                                isTurn={turn !== playerColor}
                                formatTime={formatTime}
                            />
                        </div>
                    </div>

                    {/* Board Container - Saved vertical space to eliminate scroll */}
                    <div className="flex-1 flex items-center justify-center p-2 lg:pt-4 lg:pb-20 lg:px-12 bg-black/30 rounded-[40px] border border-white/5 shadow-inner min-h-0">
                        <div className="w-full h-full flex items-center justify-center relative">
                            {/* Evaluation Bar */}
                            {showLiveAnalysis && (
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-2/3 bg-white/5 rounded-full overflow-hidden border border-white/10 hidden xl:block">
                                    <div
                                        className="bg-white/90 absolute bottom-0 w-full transition-all duration-700"
                                        style={{ height: `${Math.min(Math.max(50 + ((evaluation.score ?? 0) * 5), 5), 95)}%` }}
                                    />
                                    <div className="absolute top-1/2 w-full h-[1px] bg-white/30" />
                                </div>
                            )}

                            {(() => {
                                const currentIdx = history.length;
                                const currentComment = fullHistory?.[currentIdx]?.comment;
                                const trapArrows: [string, string, string][] = [];
                                if (showTraps && currentComment?.heuristics) {
                                    currentComment.heuristics.forEach((h: any) => {
                                        if (h.id === 'hangs_piece' && h.data?.square) {
                                            trapArrows.push([h.data.square, h.data.square, 'rgba(239, 68, 68, 0.8)']);
                                        }
                                    });
                                }

                                const bestMoveArrows: [string, string, string][] = bestMoveArrow && showBestMove ? [[bestMoveArrow.slice(0, 2), bestMoveArrow.slice(2, 4), 'rgba(34,197,94,0.8)']] : [];
                                const allArrows: [string, string, string][] = [...bestMoveArrows, ...trapArrows];

                                return (
                                    <ChessBoard
                                        fen={boardFen}
                                        onMove={handlePlayerMoveInput}
                                        orientation={playerColor === 'w' ? 'white' : 'black'}
                                        draggable={!isDeepAnalysis && !surrendered && !isGameOver && turn === playerColor}
                                        onSquareClick={isDeepAnalysis ? runDeepAnalysis : undefined}
                                        customArrows={allArrows}
                                    />
                                );
                            })()}

                            {/* Deep Analysis Info Overlay */}
                            {isDeepAnalysis && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-purple-600/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl z-30 flex items-center gap-2 animate-in zoom-in duration-300">
                                    <Search size={12} />
                                    <span>Modo Análisis: Clica una casilla</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* My Clock - Floating Bottom Left with enough safety room */}
                    <div className="absolute bottom-8 left-6 z-20 pointer-events-none">
                        <div className="pointer-events-auto bg-[#1a1c24]/80 backdrop-blur-md p-1 rounded-xl shadow-2xl border border-white/5">
                            <ClockDisplay
                                label="Tú"
                                time={myTime}
                                isTurn={turn === playerColor}
                                formatTime={formatTime}
                            />
                        </div>
                    </div>
                </div>

                {/* Coach Explanation Overlay */}
                {coachExplanation && (
                    <div role="status" aria-live="polite" className={`absolute bottom-24 right-4 max-w-sm bg-[#1a1c24]/95 backdrop-blur-xl p-5 rounded-3xl border shadow-2xl animate-in slide-in-from-bottom duration-500 z-40 ${coachExplanation.startsWith('Error:') ? 'border-red-500/30' : 'border-white/10'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-2xl ${coachExplanation.startsWith('Error:') ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                <Sparkles size={18} />
                            </div>
                            <div className="flex-1">
                                <h5 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${coachExplanation.startsWith('Error:') ? 'text-red-400' : 'text-indigo-400'}`}>
                                    {coachExplanation.startsWith('Error:') ? 'Error IA' : 'Coach IA'}
                                </h5>
                                <div className={`text-xs leading-relaxed font-medium italic ${coachExplanation.startsWith('Error:') ? 'text-red-300' : 'text-white/80'}`}>
                                    {coachExplanation.split('\n').map((line, idx) => (
                                        <p key={idx} className="mb-1">{line}</p>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setCoachExplanation(null)} className="text-white/20 hover:text-white/60">
                                <RotateCcw size={14} className="rotate-45" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT: Panel (Sidebar) */}
            <div className="flex-1 flex flex-col gap-6 min-w-[320px] max-w-[400px]">
                <div className="bg-[#1a1c24] rounded-3xl border border-white/5 p-6 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">Información</h4>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-[var(--primary)] uppercase">
                            {timeControlStr || 'Sin Límite'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="text-[8px] font-black text-white/20 uppercase mb-1">Estado</div>
                            <div className="text-xs font-bold text-white uppercase truncate">{status}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="text-[8px] font-black text-white/20 uppercase mb-1">Ventaja</div>
                            <div className="text-xs font-bold text-white">
                                {evaluation.score !== null ? (evaluation.score > 0 ? '+' : '') + evaluation.score.toFixed(1) : '0.0'}
                            </div>
                        </div>
                    </div>

                    {/* Debug: show history lengths to diagnose missing historial */}
                    <div className="mt-4 bg-black/20 p-3 rounded-xl border border-white/5 text-[9px] text-white/60">
                        <div className="flex items-center justify-between">
                            <div>Historial: <strong className="text-white">{history.length}</strong></div>
                            <div>UCI: <strong className="text-white">{uciHistory.length}</strong></div>
                            <div>Full: <strong className="text-white">{fullHistory.length}</strong></div>
                        </div>
                        <div className="mt-2 text-xs text-white/50">
                            Preview: {fullHistory.slice(0, 3).map((f, i) => (f?.san || f?.uci || f?.fen || '').toString()).join(' | ') || '—'}
                        </div>
                    </div>
                    {/* Debug overlay toggle */}
                    <div className="mt-3 flex items-center gap-2">
                        <label className="text-xs text-white/40">Debug overlay:</label>
                        <input type="checkbox" checked={!!localStorage.getItem('debug_overlay')} onChange={(e) => {
                            try { if (e.target.checked) localStorage.setItem('debug_overlay', '1'); else localStorage.removeItem('debug_overlay'); } catch { };
                            window.location.reload();
                        }} />
                    </div>
                </div>

                <div className="flex-1 bg-[#1a1c24] rounded-3xl border border-white/5 p-6 shadow-2xl flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">Historial</h4>
                        <button onClick={() => setGameState('config')} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 transition-colors">
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    {/* Debug overlay (enabled via localStorage debug_overlay) */}
                    {typeof window !== 'undefined' && localStorage.getItem('debug_overlay') && (
                        <div className="absolute top-6 left-6 z-50 max-w-md p-3 bg-black/60 text-xs text-white rounded-md border border-white/10 glass-card overflow-auto" style={{ maxHeight: '60vh' }}>
                            <div className="font-bold mb-1">LIVE DEBUG</div>
                            <div className="mb-2"><strong>timeW:</strong> {timeW} <strong>timeB:</strong> {timeB}</div>
                            <div className="mb-2"><strong>engine eval:</strong> {evaluation.score !== null ? evaluation.score.toFixed(2) : 'null'} best: {evaluation.bestMove || '-'}</div>
                            <div className="mb-2"><strong>history ({history.length}):</strong>
                                <div className="text-[11px] mt-1 whitespace-pre-wrap">{JSON.stringify(history.slice(-10), null, 0)}</div>
                            </div>
                            <div className="mb-2"><strong>uciHistory ({uciHistory.length}):</strong>
                                <div className="text-[11px] mt-1 whitespace-pre-wrap">{JSON.stringify(uciHistory.slice(-10), null, 0)}</div>
                            </div>
                            <div className="mb-2"><strong>fullHistory ({fullHistory.length}):</strong>
                                <div className="text-[11px] mt-1 whitespace-pre-wrap">{JSON.stringify(fullHistory.slice(-10).map(f => ({ san: f.san, uci: f.uci, commentCategory: f.comment?.category, eval: f.evaluation?.score })), null, 0)}</div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2 content-start custom-scrollbar">
                        {(() => {
                            const displayHistory = history.length > 0
                                ? history
                                : fullHistory.slice(1).map(h => h.san || h.uci || '');

                            return displayHistory.map((move, i) => {
                                const meta = fullHistory?.[i + 1];
                                const comment = meta?.comment;
                                return (
                                    <div key={i} className="py-2 px-3 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] opacity-20">{i + 1}</span>
                                                <span className="uppercase text-white/90 font-bold">{move}</span>
                                            </div>
                                            {comment && (
                                                <div className="text-[10px] font-black" style={{ color: getCategoryColor(comment.category) }}>{getCategoryLabel(comment.category)}</div>
                                            )}
                                        </div>

                                        {comment && (
                                            <div className="mt-2 text-xs text-white/80 whitespace-pre-line">
                                                {comment.heuristics && comment.heuristics.length > 0 ? (
                                                    <div>{formatMoveCommentText(comment)}</div>
                                                ) : (
                                                    <div>{formatMoveCommentText(comment)}</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Comentarios IA para la jugada actual */}
                    {showComments && (() => {
                        const currentIdx = history.length;
                        const currentComment = fullHistory?.[currentIdx]?.comment;
                        if (!currentComment) return null;
                        return (
                            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="text-[9px] font-black text-white/30 uppercase mb-2">Comentario IA</div>
                                <div className="text-sm font-bold" style={{ color: getCategoryColor(currentComment.category) }}>{currentComment.category.toUpperCase()}</div>
                                <div className="mt-2 text-xs text-white/80 whitespace-pre-line">{formatMoveCommentText(currentComment)}</div>
                            </div>
                        );
                    })()}

                    <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-3">
                        <button onClick={() => setGameState('config')} className="py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase transition-all">Nueva</button>
                        <button onClick={surrender} disabled={isGameOver} className="py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-[10px] uppercase transition-all border border-red-500/20 disabled:opacity-20 flex items-center justify-center gap-2">
                            <Flag size={14} /> Rendirse
                        </button>
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

export default PlayPage;
