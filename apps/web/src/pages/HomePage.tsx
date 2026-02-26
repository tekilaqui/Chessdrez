import React from 'react';
import { Link } from 'react-router-dom';
import {
    Sword,
    Target,
    Search,
    BookOpen,
    GraduationCap,
    Settings,
    Trophy
} from 'lucide-react';

const mainActions = [
    {
        title: 'JUGAR',
        icon: <Sword size={28} />,
        path: '/play',
        color: 'hsl(168, 95%, 25%)', // primary-bright (Aston Martin Green)
        desc: 'vs. IA ajustada',
        featured: true, // <-- destacado
    },
    {
        title: 'ROMPECABEZAS',
        icon: <Target size={28} />,
        path: '/puzzles',
        color: 'hsl(168, 70%, 40%)',
        desc: 'Entrena táctica',
        featured: false,
    },
    {
        title: 'ANÁLISIS',
        icon: <Search size={28} />,
        path: '/analysis',
        color: 'hsl(215, 70%, 55%)',
        desc: 'Analiza partidas',
        featured: false,
    },
    {
        title: 'APERTURAS',
        icon: <BookOpen size={28} />,
        path: '/openings',
        color: 'hsl(265, 70%, 65%)',
        desc: 'Teoría profesional',
        featured: false,
    },
    {
        title: 'APRENDER',
        icon: <GraduationCap size={28} />,
        path: '/learn',
        color: 'hsl(38, 92%, 55%)',
        desc: 'Cursos interactivos',
        featured: false,
    },
    {
        title: 'AJUSTES',
        icon: <Settings size={28} />,
        path: '/settings',
        color: 'hsl(180, 5%, 55%)',
        desc: 'Configuración',
        featured: false,
    },
];

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-5 lg:gap-10">
            {/* Hero */}
            <div className="py-3 lg:py-6">
                <h1 className="text-3xl lg:text-5xl mb-1 lg:mb-2 font-black tracking-tighter">
                    AJEDREZ <span style={{ color: 'var(--primary-bright)' }}>DREZ</span>
                </h1>
                <p className="text-[var(--text-muted)] text-xs lg:text-base font-bold uppercase tracking-widest opacity-80">
                    &gt; Domina cada movimiento
                </p>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                {mainActions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.path}
                        className={`
                            relative group flex flex-col gap-3 p-4 lg:p-6 rounded-2xl border transition-all duration-300 overflow-hidden
                            ${action.featured
                                ? 'col-span-2 lg:col-span-1 row-span-1 border-[var(--primary-bright)]/40 bg-gradient-to-br from-[var(--primary-bright)]/15 to-[var(--primary-bright)]/5 hover:border-[var(--primary-bright)]/70 hover:shadow-2xl hover:shadow-[var(--primary-bright)]/20'
                                : 'border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15'
                            }
                        `}
                    >
                        {/* Accent glow (featured only) */}
                        {action.featured && (
                            <div
                                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
                                style={{ background: action.color }}
                            />
                        )}

                        {/* Icon box */}
                        <div
                            className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{
                                color: action.color,
                                background: `${action.color}20`,
                                boxShadow: action.featured ? `0 0 20px ${action.color}30` : 'none'
                            }}
                        >
                            {action.icon}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-0.5">
                            <span className={`font-black tracking-tight leading-tight ${action.featured ? 'text-base lg:text-xl text-white' : 'text-sm lg:text-base text-white/90'}`}>
                                {action.title}
                            </span>
                            <span className="text-[9px] lg:text-[11px] font-semibold uppercase tracking-widest opacity-50">
                                {action.desc}
                            </span>
                        </div>

                        {/* Featured badge */}
                        {action.featured && (
                            <div
                                className="absolute top-3 right-3 text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest"
                                style={{ background: action.color, color: '#000' }}
                            >
                                JUGAR AHORA
                            </div>
                        )}
                    </Link>
                ))}
            </div>

            {/* Footer stat */}
            <div className="flex items-center justify-center gap-3 py-3 opacity-40">
                <Trophy size={14} className="text-yellow-400 shrink-0" />
                <span className="text-[9px] lg:text-xs font-black text-[var(--text-muted)] tracking-widest uppercase">
                    Más de 12,000 puzzles para entrenar
                </span>
            </div>
        </div>
    );
};

export default HomePage;
