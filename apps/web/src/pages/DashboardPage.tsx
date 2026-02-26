import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Play, History, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/games', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setGames(response.data);
            } catch (error) {
                console.error('Error al cargar partidas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Logo size="small" />
                    <div style={{ height: '32px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Hola, {user?.name || 'Jugador'}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Bienvenido de nuevo a ChessDrez</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                    <LogOut size={18} /> Cerrar sesión
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <aside>
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <Link to="/play" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1rem' }}>
                            <Play size={20} fill="currentColor" /> Nueva partida
                        </Link>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ padding: '0.75rem 1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ELO Partida</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>{user?.elo || 1200}</div>
                            </div>
                            <div style={{ padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating Puzzles</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>{user?.puzzleRating || 1200}</div>
                            </div>
                            <button style={{ background: 'var(--primary-dark)', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', cursor: 'pointer' }}>
                                <History size={18} /> Mis Partidas
                            </button>
                            <button style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', cursor: 'pointer' }}>
                                <UserIcon size={18} /> Perfil
                            </button>
                        </nav>
                    </div>
                </aside>

                <main>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <History size={24} /> Partidas recientes
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando partidas...</div>
                    ) : games.length === 0 ? (
                        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Aún no has jugado ninguna partida.</p>
                            <Link to="/play" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 2rem' }}>¡Jugar mi primera partida!</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {games.map(game => (
                                <div key={game.id} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Play size={20} color="white" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Cualquier vs CPU</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                {new Date(game.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/play?id=${game.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        Ver <ChevronRight size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
