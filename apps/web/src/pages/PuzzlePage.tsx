import React, { useState, useCallback, useEffect } from 'react';
import { usePuzzles, PUZZLE_CATEGORIES, PuzzleCategory, PuzzleDifficulty } from '../modules/puzzles/hooks/usePuzzles';
import PuzzleStats from '../modules/puzzles/components/PuzzleStats';
import PuzzleBoard from '../modules/puzzles/components/PuzzleBoard';
import PuzzleControlPanel from '../modules/puzzles/components/PuzzleControlPanel';

const PuzzlePage: React.FC = () => {
    const [category, setCategory] = useState<PuzzleCategory>('all');
    const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('normal');
    const [feedback, setFeedback] = useState<{ text: string; color: string }>({
        text: 'Preparando puzzle...', color: 'var(--text-muted)'
    });

    const [showFilters, setShowFilters] = useState(false);

    const {
        puzzle,
        currentFen,
        orientation,
        isPlayersTurn,
        solved,
        failed,
        hintSquare,
        eloState,
        lastDelta,
        loading,
        checkMove,
        showHint,
        nextPuzzle,
        resetPuzzle,
        flipBoard,
        totalInCategory,
    } = usePuzzles(category, difficulty);

    const handleMove = useCallback(({ from, to }: { from: string; to: string }) => {
        if (solved || failed || !isPlayersTurn) return;
        const result = checkMove(from, to);
        if (result === 'wrong') {
            setFeedback({ text: '❌ Jugada incorrecta.', color: 'var(--danger)' });
        } else if (result === 'correct') {
            setFeedback({ text: '✓ ¡Correcto! Continúa...', color: 'var(--primary)' });
        } else if (result === 'complete') {
            setFeedback({ text: '🎉 ¡Puzzle resuelto!', color: 'var(--primary)' });
        }
    }, [solved, failed, isPlayersTurn, checkMove]);

    const handleCategory = (cat: PuzzleCategory) => {
        setCategory(cat);
        setFeedback({ text: 'Preparando puzzle...', color: 'var(--text-muted)' });
    };

    const handleDifficulty = (diff: PuzzleDifficulty) => {
        setDifficulty(diff);
        setFeedback({ text: 'Buscando puzzle...', color: 'var(--text-muted)' });
    };

    const handleNext = () => {
        nextPuzzle();
        setFeedback({ text: 'Preparando puzzle...', color: 'var(--text-muted)' });
    };

    const handleReset = () => {
        resetPuzzle();
        setFeedback({ text: 'Tu turno...', color: 'var(--text-muted)' });
    };

    const handleHint = () => {
        showHint();
        setFeedback({ text: '💡 Mueve la pieza de la casilla iluminada', color: '#fbbf24' });
    };

    // Auto-next logic: when solved, wait 2 seconds and go to next puzzle
    useEffect(() => {
        if (solved) {
            const timer = setTimeout(() => {
                nextPuzzle();
                setFeedback({ text: 'Preparando puzzle...', color: 'var(--text-muted)' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [solved, nextPuzzle]);

    if (loading && !puzzle) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-6 text-center animate-in fade-in duration-700">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">♟</div>
                </div>
                <div>
                    <div className="text-xl font-black tracking-tight text-white mb-2">BUSCANDO DESAFÍO...</div>
                    <div className="text-xs text-[var(--text-muted)] font-medium animate-pulse">Seleccionando un puzzle según tu nivel</div>
                </div>
            </div>
        );
    }

    if (!puzzle) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="text-6xl opacity-20">♟</div>
                <div className="text-xl font-black">No se encontraron puzzles</div>
                <p className="text-sm text-[var(--text-muted)] max-w-xs">
                    No hemos podido cargar puzzles para esta categoría. Intenta con otra o recarga la página.
                </p>
                <button onClick={() => setCategory('all')} className="btn-primary mt-4">Ver Todos</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden gap-2 lg:gap-4 p-2 lg:p-4">

            {/* ── Mobile Filter Toggle ── */}
            <div className="lg:hidden flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[var(--primary-bright)] uppercase tracking-widest">{category.toUpperCase()}</span>
                    <span className="text-xs font-bold text-white uppercase">{difficulty === 'normal' ? 'Nivel Medio' : difficulty.toUpperCase()}</span>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-[10px] font-black uppercase tracking-widest border border-white/10"
                >
                    {showFilters ? 'Cerrar Filtros' : 'Cambiar Filtros'}
                </button>
            </div>

            {/* ── Collapsible Selection Area ── */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col gap-2 lg:gap-3 animate-in slide-in-from-top duration-300 shrink-0`}>
                {/* ── Stats bar (Desktop) ── */}
                <div className="hidden lg:block mt-2">
                    <PuzzleStats eloState={eloState} lastDelta={lastDelta} puzzleRating={puzzle.rating} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-1 border-b border-white/5">
                    {/* ── Difficulty pills ── */}
                    <div className="flex gap-1 lg:gap-2 items-center overflow-x-auto no-scrollbar shrink-0">
                        <span className="text-[0.6rem] font-black text-[var(--text-muted)] tracking-wider mr-2 uppercase shrink-0">Dificultad:</span>
                        {(['easy', 'normal', 'hard', 'master'] as PuzzleDifficulty[]).map(d => (
                            <button
                                key={d}
                                onClick={() => handleDifficulty(d)}
                                className="px-3 py-1.5 lg:py-1 rounded-lg text-[9px] font-black border transition-all uppercase shrink-0"
                                style={difficulty === d
                                    ? { background: 'var(--primary)', borderColor: 'var(--primary)', color: '#fff' }
                                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border)', color: 'var(--text-muted)' }
                                }
                            >
                                {d === 'easy' ? 'Fácil' : d === 'normal' ? 'Normal' : d === 'hard' ? 'Difícil' : 'Maestro'}
                            </button>
                        ))}
                    </div>

                    {/* ── Category pills ── */}
                    <div className="flex gap-1 flex-wrap shrink-0">
                        {PUZZLE_CATEGORIES.slice(0, 10).map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategory(cat.value)}
                                className="px-2 py-1 rounded-md text-[9px] font-bold border transition-all shrink-0"
                                style={category === cat.value
                                    ? { background: 'rgba(255,255,255,0.1)', borderColor: 'var(--primary-bright)', color: 'var(--primary-bright)' }
                                    : { background: 'transparent', borderColor: 'transparent', color: 'var(--text-muted)' }
                                }
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Mobile Stats (Compact) ── */}
            <div className="lg:hidden flex justify-between bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border)]">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-[var(--text-dim)] uppercase">Tu Elo</span>
                    <span className="text-sm font-black text-white">
                        {eloState.rating} {lastDelta !== null && lastDelta !== undefined && lastDelta !== 0 && (
                            <span className={`animate-in fade-in zoom-in slide-in-from-bottom-1 duration-500 ${lastDelta > 0 ? 'text-[var(--primary)]' : 'text-red-400'}`}>
                                ({lastDelta > 0 ? '+' : ''}{lastDelta})
                            </span>
                        )}
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-[var(--text-dim)] uppercase">Dificultad</span>
                    <span className="text-sm font-black text-[var(--primary-bright)]">{puzzle.rating}</span>
                </div>
            </div>

            {/* ── Main content: board + controls side by side ── */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
                {/* Board column - elastic flex prioritization */}
                <div className="flex-[3] flex flex-col min-h-0">
                    <PuzzleBoard
                        puzzle={puzzle}
                        currentFen={currentFen}
                        orientation={orientation}
                        isPlayersTurn={isPlayersTurn}
                        solved={solved}
                        failed={failed}
                        hintSquare={hintSquare}
                        eloState={eloState}
                        onMove={handleMove}
                        onFlip={flipBoard}
                    />
                </div>

                {/* Right panel - scrollable */}
                <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 pb-4">
                    <PuzzleControlPanel
                        puzzle={puzzle}
                        solved={solved}
                        failed={failed}
                        isPlayersTurn={isPlayersTurn}
                        feedback={feedback}
                        category={category}
                        totalInCategory={totalInCategory}
                        onHint={handleHint}
                        onReset={handleReset}
                        onNext={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default PuzzlePage;
