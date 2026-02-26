import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Mail, Award, TrendingUp, History, Settings, Calendar, Trophy, Zap, ChevronRight, ChevronDown, BarChart2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ProfilePage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [activeViews, setActiveViews] = useState<{ [key: string]: 'stats' | 'history' }>({
        global: 'stats',
        tactical: 'stats'
    });

    const toggleView = (key: string) => {
        setActiveViews(prev => ({
            ...prev,
            [key]: prev[key] === 'stats' ? 'history' : 'stats'
        }));
    };

    const stats = [
        { label: 'PARTIDAS', value: '124', icon: <History size={16} />, color: 'var(--primary)' },
        { label: 'VICTORIAS', value: '68', icon: <Trophy size={16} />, color: '#f59e0b' },
        { label: 'PRECISIÓN', value: '74%', icon: <Zap size={16} />, color: 'var(--accent)' },
    ];

    const recentActivity = [
        { id: 1, type: 'win', title: 'Victoria vs IA (Nivel 5)', time: 'Hace 2 horas' },
        { id: 2, type: 'loss', title: 'Derrota en Táctica', time: 'Hace 4 horas' },
        { id: 3, type: 'draw', title: 'Empate vs Invitado', time: 'Hace 6 horas' },
    ];

    return (
        <div className="h-full flex flex-col gap-4 p-6 overflow-hidden max-w-7xl mx-auto w-full">
            {/* PERFIL HEADER */}
            <div className="glass-card shrink-0" style={{
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(34, 197, 94, 0.05) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.05 }}>
                    <User size={200} color="var(--primary)" />
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(45deg, var(--primary), var(--accent))',
                        borderRadius: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: 'white',
                        fontWeight: 900,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.3), 0 0 10px var(--primary-glow)',
                        transform: 'rotate(-5deg)'
                    }}>
                        {user?.name?.[0].toUpperCase() || 'U'}
                    </div>
                    <Link to="/settings" style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        background: 'var(--bg-card)',
                        padding: '8px',
                        borderRadius: '10px',
                        color: 'white',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-premium)'
                    }}>
                        <Settings size={16} />
                    </Link>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{user?.name || 'Grandmaster'}</h1>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--primary)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800 }}>PRO</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={14} /> {user?.email}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Calendar size={14} /> Feb 2026
                        </div>
                    </div>
                </div>

                {/* QUICK STATS IN HEADER */}
                <div style={{ display: 'flex', gap: '1rem' }} className="hidden md:flex">
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'right', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
                            <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                {/* GLOBAL RATING */}
                <div className="glass-card flex flex-col p-6 min-h-0 overflow-hidden relative group cursor-pointer" onClick={() => toggleView('global')}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div style={{ color: 'var(--primary)', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em' }}>RATING GLOBAL</div>
                                <div className="flex items-center gap-2">
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>{user?.elo || 1200}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>+12 hoy</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white/20 group-hover:text-white/40 transition-colors">
                            {activeViews.global === 'stats' ? <History size={20} /> : <BarChart2 size={20} />}
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                        {activeViews.global === 'stats' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    Tu puntuación competitiva acumulada en partidas contra otros usuarios y la IA.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Mejor Rating</div>
                                        <div className="text-lg font-black text-white">1285</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Rank Global</div>
                                        <div className="text-lg font-black text-white">#4,281</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                {recentActivity.map(act => (
                                    <div key={act.id} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${act.type === 'win' ? 'bg-green-500' : act.type === 'loss' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                            <span className="font-semibold text-white/80">{act.title}</span>
                                        </div>
                                        <span className="text-white/40">{act.time}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* TACTICAL RATING */}
                <div className="glass-card flex flex-col p-6 min-h-0 overflow-hidden relative group cursor-pointer" onClick={() => toggleView('tactical')}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <Award size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em' }}>RATING TÁCTICO</div>
                                <div className="flex items-center gap-2">
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b' }}>{user?.puzzleRating || 1150}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>+45 hoy</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white/20 group-hover:text-white/40 transition-colors">
                            {activeViews.tactical === 'stats' ? <History size={20} /> : <BarChart2 size={20} />}
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                        {activeViews.tactical === 'stats' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    Basado en tu rendimiento resolviendo puzzles y ejercicios de táctica avanzada.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Puzzles Resueltos</div>
                                        <div className="text-lg font-black text-white">842</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Racha Actual</div>
                                        <div className="text-lg font-black text-white">14 🔥</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="font-semibold text-white/80">Puzzle #{2400 + i} Superado</span>
                                        </div>
                                        <span className="text-white/40">Hace {i * 15}m</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM QUICK ACTIONS / STATS */}
            <div className="shrink-0 flex gap-4 md:hidden">
                {stats.map((stat) => (
                    <div key={stat.label} className="glass-card flex-1 p-3 text-center flex flex-col gap-1">
                        <div style={{ color: stat.color }}>{stat.icon}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 900 }}>{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
