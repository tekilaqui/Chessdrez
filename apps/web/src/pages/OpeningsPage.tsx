import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Brain, Star, RefreshCw, RotateCcw, Search, ChevronDown, ChevronRight, LayoutGrid, List as ListIcon, Target, Play, ChevronLeft } from 'lucide-react';
import OpeningsTheory from '../modules/openings/OpeningsTheory';
import OpeningTraining from '../modules/training/OpeningTraining';
import OpeningExercises from '../modules/openings/OpeningExercises';
import ChessBoard from '../components/ChessBoard';
import api from '../api/client';

interface OpeningBasic {
    eco: string;
    name: string;
    fenRoot?: string;
}

type Mode = 'theory' | 'training' | 'exercises';
type Color = 'w' | 'b';

interface SessionConfig {
    eco: string;
    name: string;
    color: Color;
    mode: Mode;
}

// ── Sidebar Category Accordion ──────────────────────────────────────────────
const AccordionSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    count: number;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}> = ({ title, icon, count, isOpen, onToggle, children }) => (
    <div className="mb-2">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 group"
        >
            <div className="flex items-center gap-3">
                <span className="text-[var(--text-muted)] group-hover:text-white transition-colors">{icon}</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{title}</span>
                <span className="text-[10px] font-black text-white/20 bg-black/40 px-2 py-0.5 rounded-full">{count}</span>
            </div>
            {isOpen ? <ChevronDown size={14} className="text-white/20" /> : <ChevronRight size={14} className="text-white/20" />}
        </button>
        {isOpen && (
            <div className="mt-2 flex flex-col gap-1 px-1 animate-in slide-in-from-top-1 duration-200">
                {children}
            </div>
        )}
    </div>
);

// ── Main Page ────────────────────────────────────────────────────────────────
const OpeningsPage: React.FC = () => {
    const [openings, setOpenings] = useState<OpeningBasic[]>([]);
    const [repertoire, setRepertoire] = useState<any[]>([]);
    const [progress, setProgress] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [selectedOpening, setSelectedOpening] = useState<OpeningBasic | null>(null);
    const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);

    // Accordion state (exclusive)
    const [openSection, setOpenSection] = useState<'favorites' | 'white' | 'black' | null>('white');

    useEffect(() => {
        Promise.all([
            api.get('/openings'),
            api.get('/repertoire'),
            api.get('/training/progress')
        ]).then(([opRes, repRes, progRes]) => {
            setOpenings(opRes.data);
            setRepertoire(repRes.data);
            setProgress(progRes.data);
            setLoading(false);
            // Default select first opening if available
            if (opRes.data.length > 0) setSelectedOpening(opRes.data[0]);
        }).catch(() => setLoading(false));
    }, []);

    const resetSession = () => setSessionConfig(null);

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-700">
            <RefreshCw className="animate-spin text-[var(--primary-bright)]" size={32} />
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Cargando Academia</div>
        </div>
    );

    const repEcos = new Set(repertoire.map((r: any) => r.eco));
    const whiteOpenings = openings.filter(o => !['B', 'C', 'E'].includes(o.eco.charAt(0)) || (o.eco.startsWith('C') && parseInt(o.eco.substring(1)) < 20));
    const blackDefenses = openings.filter(o => !whiteOpenings.includes(o));

    const filterList = (list: OpeningBasic[]) =>
        search ? list.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) || o.eco.toLowerCase().includes(search.toLowerCase())) : list;

    // Computed stats for selected opening
    const selectedProgress = progress.find(p => p.eco === selectedOpening?.eco)?.progress || 0;
    const isFav = repEcos.has(selectedOpening?.eco || '');

    // ── Active session view ──
    if (sessionConfig) {
        return (
            <div className="flex flex-col h-full overflow-hidden bg-[var(--bg-page)] animate-in fade-in duration-300">
                <header className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 shrink-0 z-10 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            onClick={resetSession}
                            className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-white transition-all shadow-lg"
                        >
                            <ChevronLeft size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Biblioteca</span>
                        </button>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate">
                            {sessionConfig.eco} · <span className="text-white">{sessionConfig.name}</span>
                        </span>
                    </div>

                    <div className="flex bg-black/40 rounded-xl border border-white/5 p-1 shrink-0">
                        {(['theory', 'training', 'exercises'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setSessionConfig({ ...sessionConfig, mode: m })}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${sessionConfig.mode === m ? 'bg-[var(--primary-bright)] text-black shadow-lg shadow-[var(--primary-bright)]/20' : 'text-[var(--text-muted)] hover:text-white'
                                    }`}
                            >
                                {m === 'theory' && 'Teoría'}
                                {m === 'training' && 'Práctica'}
                                {m === 'exercises' && 'Test'}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="flex-1 overflow-hidden">
                    {sessionConfig.mode === 'theory' && <OpeningsTheory eco={sessionConfig.eco} color={sessionConfig.color} onExit={resetSession} />}
                    {sessionConfig.mode === 'training' && <OpeningTraining eco={sessionConfig.eco} color={sessionConfig.color} onExit={resetSession} />}
                    {sessionConfig.mode === 'exercises' && <OpeningExercises eco={sessionConfig.eco} color={sessionConfig.color} />}
                </div>
            </div>
        );
    }

    // ── Opening browser view (Sidebar + Preview) ──
    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-[var(--bg-page)]">
            {/* Sidebar Column */}
            <aside className="w-full lg:w-[400px] lg:h-full flex flex-col border-r border-white/5 bg-[#0a0a0a] z-20 shrink-0 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-[var(--primary-bright)]/10 border border-[var(--primary-bright)]/20 text-[var(--primary-bright)]">
                            <BookOpen size={20} />
                        </div>
                        <h1 className="text-lg font-black text-white uppercase tracking-tighter">Academia <span className="text-[var(--primary-bright)]">Theory</span></h1>
                    </div>

                    <div className="relative group">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--primary-bright)] transition-colors" />
                        <input
                            type="text"
                            placeholder="BUSCAR APERTURA..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white placeholder:text-white/20 focus:bg-white/10 focus:border-[var(--primary-bright)]/40 focus:outline-none transition-all uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                    {/* Favorites */}
                    {repertoire.length > 0 && (
                        <AccordionSection
                            title="Mis Favoritas"
                            icon={<Heart size={14} fill="currentColor" className="text-rose-500" />}
                            count={repertoire.length}
                            isOpen={openSection === 'favorites'}
                            onToggle={() => setOpenSection(openSection === 'favorites' ? null : 'favorites')}
                        >
                            {filterList(repertoire.map(r => r.opening)).map(op => (
                                <button
                                    key={`fav-${op.eco}`}
                                    onClick={() => setSelectedOpening(op)}
                                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedOpening?.eco === op.eco ? 'bg-rose-500/10 border-rose-500/30 ring-1 ring-rose-500/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                                >
                                    <div className="flex flex-col text-left min-w-0">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${selectedOpening?.eco === op.eco ? 'text-rose-400' : 'text-white/40'}`}>{op.eco}</span>
                                        <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{op.name}</span>
                                    </div>
                                    {selectedOpening?.eco === op.eco && <Play size={12} className="text-rose-400 fill-rose-400 shrink-0 ml-2" />}
                                </button>
                            ))}
                        </AccordionSection>
                    )}

                    {/* White */}
                    <AccordionSection
                        title="Blancas"
                        icon={<div className="w-3 h-3 rounded-sm bg-white/80" />}
                        count={filterList(whiteOpenings).length}
                        isOpen={openSection === 'white'}
                        onToggle={() => setOpenSection(openSection === 'white' ? null : 'white')}
                    >
                        {filterList(whiteOpenings).map(op => (
                            <button
                                key={`w-${op.eco}`}
                                onClick={() => setSelectedOpening(op)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedOpening?.eco === op.eco ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/30 ring-1 ring-[var(--primary-bright)]/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left min-w-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedOpening?.eco === op.eco ? 'text-[var(--primary-bright)]' : 'text-white/40'}`}>{op.eco}</span>
                                    <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{op.name}</span>
                                </div>
                                {selectedOpening?.eco === op.eco && <Play size={12} className="text-[var(--primary-bright)] fill-[var(--primary-bright)] shrink-0 ml-2" />}
                            </button>
                        ))}
                    </AccordionSection>

                    {/* Black */}
                    <AccordionSection
                        title="Negras"
                        icon={<div className="w-3 h-3 rounded-sm bg-blue-500/80" />}
                        count={filterList(blackDefenses).length}
                        isOpen={openSection === 'black'}
                        onToggle={() => setOpenSection(openSection === 'black' ? null : 'black')}
                    >
                        {filterList(blackDefenses).map(op => (
                            <button
                                key={`b-${op.eco}`}
                                onClick={() => setSelectedOpening(op)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedOpening?.eco === op.eco ? 'bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left min-w-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedOpening?.eco === op.eco ? 'text-blue-400' : 'text-white/40'}`}>{op.eco}</span>
                                    <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{op.name}</span>
                                </div>
                                {selectedOpening?.eco === op.eco && <Play size={12} className="text-blue-400 fill-blue-400 shrink-0 ml-2" />}
                            </button>
                        ))}
                    </AccordionSection>
                </div>
            </aside>

            {/* Preview Area */}
            <main className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--bg-card)_0%,_transparent_100%)]">
                {selectedOpening ? (
                    <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 animate-in zoom-in-95 fade-in duration-500">
                        {/* Board Preview */}
                        <div className="flex-[3] flex flex-col items-center gap-4">
                            <div className="w-full aspect-square max-w-[500px] bg-black/40 rounded-3xl border border-white/5 shadow-2xl relative p-2">
                                <ChessBoard
                                    fen={selectedOpening.fenRoot || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
                                    orientation={whiteOpenings.some(o => o.eco === selectedOpening.eco) ? 'white' : 'black'}
                                    draggable={false}
                                />
                                <div className="absolute inset-x-0 bottom-4 flex justify-center z-20 pointer-events-none">
                                    <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black text-white/60 tracking-widest uppercase">Vista Previa Teórica</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex-[2] flex flex-col gap-6 w-full lg:w-auto">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-[var(--primary-bright)] text-black rounded-lg text-[10px] font-black tracking-widest uppercase">{selectedOpening.eco}</span>
                                    {isFav && <Heart size={16} fill="currentColor" className="text-rose-500" />}
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">{selectedOpening.name}</h2>
                                <p className="text-sm font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                                    Selecciona un modo para comenzar el estudio profundo de esta apertura.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[var(--primary-bright)]/10 rounded-xl"><Target size={18} className="text-[var(--primary-bright)]" /></div>
                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Dominio de Reacción</span>
                                    </div>
                                    <span className="text-lg font-black text-white">{selectedProgress}%</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-xl"><Heart size={18} className="text-blue-500" /></div>
                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">En Repertorio</span>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isFav ? 'text-rose-400' : 'text-white/20'}`}>{isFav ? 'SÍ' : 'NO'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={() => setSessionConfig({ ...selectedOpening, mode: 'theory', color: whiteOpenings.some(o => o.eco === selectedOpening.eco) ? 'w' : 'b' })}
                                    className="w-full bg-[var(--primary-bright)] hover:bg-[var(--primary-hover)] text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[var(--primary-bright)]/10"
                                >
                                    <BookOpen size={18} /> Estudiar Teoría
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSessionConfig({ ...selectedOpening, mode: 'training', color: whiteOpenings.some(o => o.eco === selectedOpening.eco) ? 'w' : 'b' })}
                                        className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Brain size={16} /> Práctica
                                    </button>
                                    <button
                                        onClick={() => setSessionConfig({ ...selectedOpening, mode: 'exercises', color: whiteOpenings.some(o => o.eco === selectedOpening.eco) ? 'w' : 'b' })}
                                        className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Star size={16} /> Test
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <BookOpen size={80} />
                        <span className="text-sm font-black uppercase tracking-[0.5em]">Selecciona una apertura para previsualizar</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OpeningsPage;
