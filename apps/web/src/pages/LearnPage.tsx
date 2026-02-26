import React, { useState, useMemo } from 'react';
import { GraduationCap, Search, Play, ArrowRight, HelpCircle, ChevronDown, ChevronRight, BookOpen, Target, Sparkles, Clock, Layout, Zap } from 'lucide-react';
import { lessons, Lesson } from '@chess-platform/shared';
import LessonViewer from '../components/LessonViewer';
import ChessBoard from '../components/ChessBoard';

type ViewMode = 'main' | 'viewer';

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

const LearnPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('main');
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(lessons[0]?.id || null);
    const [search, setSearch] = useState('');
    const [openSection, setOpenSection] = useState<string | null>('fundamentals');

    const selectedLesson = useMemo(() => lessons.find((l: Lesson) => l.id === selectedLessonId), [selectedLessonId]);

    const filteredLessons = useMemo(() => {
        if (!search) return lessons;
        return lessons.filter(l =>
            l.title.toLowerCase().includes(search.toLowerCase()) ||
            l.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const categorizedLessons = useMemo(() => {
        return {
            fundamentals: filteredLessons.filter(l => l.category === 'fundamentals'),
            tactics: filteredLessons.filter(l => l.category === 'tactics'),
            endgames: filteredLessons.filter(l => l.category === 'endgames'),
            advanced: filteredLessons.filter(l => !['fundamentals', 'tactics', 'endgames'].includes(l.category))
        };
    }, [filteredLessons]);

    const startLesson = () => {
        if (selectedLesson) setViewMode('viewer');
    };

    if (viewMode === 'viewer' && selectedLesson) {
        return (
            <div className="h-full flex flex-col animate-in fade-in duration-300 overflow-hidden">
                <LessonViewer
                    lesson={selectedLesson}
                    onClose={() => setViewMode('main')}
                    onComplete={() => setViewMode('main')}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-[var(--bg-page)]">
            {/* Sidebar Column */}
            <aside className="w-full lg:w-[400px] lg:h-full flex flex-col border-r border-white/5 bg-[#0a0a0a] z-20 shrink-0 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-[var(--primary-bright)]/10 border border-[var(--primary-bright)]/20 text-[var(--primary-bright)]">
                            <GraduationCap size={20} />
                        </div>
                        <h1 className="text-lg font-black text-white uppercase tracking-tighter">Universidad <span className="text-[var(--primary-bright)]">Drez</span></h1>
                    </div>

                    <div className="relative group">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--primary-bright)] transition-colors" />
                        <input
                            type="text"
                            placeholder="BUSCAR CURSO..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white placeholder:text-white/20 focus:bg-white/10 focus:border-[var(--primary-bright)]/40 focus:outline-none transition-all uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                    <AccordionSection
                        title="Fundamentos"
                        icon={<Layout size={14} />}
                        count={categorizedLessons.fundamentals.length}
                        isOpen={openSection === 'fundamentals'}
                        onToggle={() => setOpenSection(openSection === 'fundamentals' ? null : 'fundamentals')}
                    >
                        {categorizedLessons.fundamentals.map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setSelectedLessonId(lesson.id)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedLessonId === lesson.id ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/30 ring-1 ring-[var(--primary-bright)]/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left min-w-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedLessonId === lesson.id ? 'text-[var(--primary-bright)]' : 'text-white/40'}`}>{lesson.difficulty}</span>
                                    <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{lesson.title}</span>
                                </div>
                                {selectedLessonId === lesson.id && <Play size={12} className="text-[var(--primary-bright)] fill-[var(--primary-bright)] shrink-0 ml-2" />}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection
                        title="Táctica"
                        icon={<Zap size={14} />}
                        count={categorizedLessons.tactics.length}
                        isOpen={openSection === 'tactics'}
                        onToggle={() => setOpenSection(openSection === 'tactics' ? null : 'tactics')}
                    >
                        {categorizedLessons.tactics.map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setSelectedLessonId(lesson.id)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedLessonId === lesson.id ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/30 ring-1 ring-[var(--primary-bright)]/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left min-w-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedLessonId === lesson.id ? 'text-[var(--primary-bright)]' : 'text-white/40'}`}>{lesson.difficulty}</span>
                                    <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{lesson.title}</span>
                                </div>
                                {selectedLessonId === lesson.id && <Play size={12} className="text-[var(--primary-bright)] fill-[var(--primary-bright)] shrink-0 ml-2" />}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection
                        title="Finales"
                        icon={<Target size={14} />}
                        count={categorizedLessons.endgames.length}
                        isOpen={openSection === 'endgames'}
                        onToggle={() => setOpenSection(openSection === 'endgames' ? null : 'endgames')}
                    >
                        {categorizedLessons.endgames.map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setSelectedLessonId(lesson.id)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedLessonId === lesson.id ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/30 ring-1 ring-[var(--primary-bright)]/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col text-left min-w-0">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedLessonId === lesson.id ? 'text-[var(--primary-bright)]' : 'text-white/40'}`}>{lesson.difficulty}</span>
                                    <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{lesson.title}</span>
                                </div>
                                {selectedLessonId === lesson.id && <Play size={12} className="text-[var(--primary-bright)] fill-[var(--primary-bright)] shrink-0 ml-2" />}
                            </button>
                        ))}
                    </AccordionSection>

                    {categorizedLessons.advanced.length > 0 && (
                        <AccordionSection
                            title="Avanzado"
                            icon={<Sparkles size={14} />}
                            count={categorizedLessons.advanced.length}
                            isOpen={openSection === 'advanced'}
                            onToggle={() => setOpenSection(openSection === 'advanced' ? null : 'advanced')}
                        >
                            {categorizedLessons.advanced.map(lesson => (
                                <button
                                    key={lesson.id}
                                    onClick={() => setSelectedLessonId(lesson.id)}
                                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${selectedLessonId === lesson.id ? 'bg-[var(--primary-bright)]/10 border-[var(--primary-bright)]/30 ring-1 ring-[var(--primary-bright)]/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                                >
                                    <div className="flex flex-col text-left min-w-0">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${selectedLessonId === lesson.id ? 'text-[var(--primary-bright)]' : 'text-white/40'}`}>{lesson.difficulty}</span>
                                        <span className="text-xs font-bold text-white truncate uppercase tracking-tight leading-tight">{lesson.title}</span>
                                    </div>
                                    {selectedLessonId === lesson.id && <Play size={12} className="text-[var(--primary-bright)] fill-[var(--primary-bright)] shrink-0 ml-2" />}
                                </button>
                            ))}
                        </AccordionSection>
                    )}
                </div>
            </aside>

            {/* Preview Area */}
            <main className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--bg-card)_0%,_transparent_100%)]">
                {selectedLesson ? (
                    <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 animate-in zoom-in-95 fade-in duration-500">
                        {/* Board Preview */}
                        <div className="flex-[3] flex flex-col items-center gap-4">
                            <div className="w-full aspect-square max-w-[500px] bg-black/40 rounded-3xl border border-white/5 shadow-2xl relative p-2">
                                <ChessBoard
                                    fen={selectedLesson.steps[0]?.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
                                    orientation="white"
                                    draggable={false}
                                />
                                <div className="absolute inset-x-0 bottom-4 flex justify-center z-20 pointer-events-none">
                                    <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black text-white/60 tracking-widest uppercase">Vista Previa del Módulo</div>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Info & CTAs */}
                        <div className="flex-[2] flex flex-col gap-6 w-full lg:w-auto">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-[var(--primary-bright)] text-black rounded-lg text-[10px] font-black tracking-widest uppercase">{selectedLesson.category}</span>
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{selectedLesson.difficulty}</span>
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">{selectedLesson.title}</h2>
                                <p className="text-sm font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                                    Domina este concepto fundamental con ejemplos interactivos y explicaciones detalladas.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[var(--primary-bright)]/10 rounded-xl"><Clock size={18} className="text-[var(--primary-bright)]" /></div>
                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Duración Estimada</span>
                                    </div>
                                    <span className="text-lg font-black text-white">~5 min</span>
                                </div>
                                <div className="p-6 bg-[var(--primary-bright)]/5 rounded-2xl border border-[var(--primary-bright)]/20 relative overflow-hidden group">
                                    <div className="flex flex-col gap-2 relative z-10">
                                        <div className="flex items-center gap-2 text-[var(--primary-bright)] mb-1">
                                            <HelpCircle size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">¿Ya sabes esto?</span>
                                        </div>
                                        <p className="text-[10px] text-white/40 font-bold uppercase leading-tight max-w-[200px]">Haz nuestra prueba de nivel para avanzar más rápido.</p>
                                        <button className="mt-2 text-[var(--primary-bright)] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:translate-x-1 transition-transform">
                                            HACER TEST <ArrowRight size={12} />
                                        </button>
                                    </div>
                                    <GraduationCap size={80} className="absolute -bottom-4 -right-4 text-[var(--primary-bright)]/5 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>

                            <button
                                onClick={startLesson}
                                className="w-full bg-[var(--primary-bright)] hover:bg-[var(--primary-hover)] text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[var(--primary-bright)]/10"
                            >
                                <Play size={18} className="fill-black" /> COMENZAR LECCIÓN
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <GraduationCap size={80} />
                        <span className="text-sm font-black uppercase tracking-[0.5em]">Selecciona un módulo para comenzar</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LearnPage;
