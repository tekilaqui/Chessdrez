import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { User, LogOut, Menu } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLocation, Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const { settings } = useSettings();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Pages where we want to hide the footer and maximize space on mobile
    const isAppPage = ['/puzzles', '/analysis', '/openings', '/play', '/learn', '/profile', '/settings'].includes(location.pathname);

    return (
        <div className="h-[100dvh] flex bg-[var(--bg-page)] text-[var(--text-main)] w-full overflow-hidden transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col md:ml-[260px] min-w-0 w-full relative">
                {/* Header */}
                <header className="h-[var(--header-h)] border-b border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md flex items-center justify-between md:justify-end px-4 md:px-8 sticky top-0 z-[100] transition-colors duration-300 shrink-0">
                    <div className="flex items-center md:hidden">
                        <button
                            className="p-2 -ml-2 text-[var(--text-muted)] hover:text-white transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/profile"
                                    className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] flex items-center justify-center hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all"
                                    title="Mi Perfil"
                                >
                                    <User size={18} />
                                </Link>

                                <div className="flex items-center gap-2 pl-1">
                                    <button
                                        onClick={logout}
                                        className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/10 text-[var(--text-muted)] flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content Area */}
                <main className={`flex-1 ${isAppPage ? 'overflow-hidden p-0 flex flex-col' : 'overflow-x-hidden p-4 md:p-10'}`}>
                    {children}
                </main>

                {(!isAppPage || window.innerWidth >= 1024) && (
                    <footer className="p-4 sm:p-8 text-center opacity-30 text-[0.7rem] font-medium tracking-widest shrink-0">
                        &copy; 2026 CHESS DREZ • PREMIUM CHESS PLATFORM
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Layout;
