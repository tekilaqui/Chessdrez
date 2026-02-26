import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    Play,
    Trophy,
    Activity,
    BookOpen,
    Target,
    Settings,
    User,
    ChevronRight,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    const menuItems = [
        { icon: <Home size={20} />, label: 'Inicio', path: '/' },
        { icon: <Play size={20} />, label: 'Jugar vs IA', path: '/play' },
        { icon: <Target size={20} />, label: 'Rompecabezas', path: '/puzzles' },
        { icon: <Activity size={20} />, label: 'Análisis', path: '/analysis' },
        { icon: <Trophy size={20} />, label: 'Aperturas', path: '/openings' },
        { icon: <BookOpen size={20} />, label: 'Aprender', path: '/learn' },
        { icon: <User size={20} />, label: 'Perfil', path: '/profile' },
        { icon: <Settings size={20} />, label: 'Ajustes', path: '/settings' },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[999] md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 h-screen w-[260px] bg-[var(--bg-card)] border-r border-[var(--border)] 
                flex flex-col z-[1000] transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="px-5 py-3 border-b border-[var(--border)] flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo-icon.png"
                            alt="ChessDrez"
                            className="h-8 w-8 object-contain shrink-0"
                            draggable={false}
                        />
                        <span className="text-sm font-black tracking-widest text-white">CHESS<span className="text-[var(--primary-bright)]">DREZ</span></span>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="md:hidden text-[var(--text-muted)] hover:text-white">
                            <X size={24} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => {
                                if (window.innerWidth < 768 && onClose) {
                                    onClose();
                                }
                            }}
                            className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline
                                ${isActive
                                    ? 'text-white bg-[var(--primary)] shadow-lg shadow-[var(--primary-glow)] font-bold'
                                    : 'text-[var(--text-muted)] border border-transparent hover:bg-[var(--bg-card-hover)] hover:text-[var(--primary)]'
                                }
                            `}
                        >
                            <span className="flex">{item.icon}</span>
                            <span>{item.label}</span>
                            <ChevronRight size={14} className="ml-auto opacity-50" />
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
