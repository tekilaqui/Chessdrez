import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Credenciales inválidas. Por favor intente de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] p-6 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'var(--success)', filter: 'blur(180px)', opacity: 0.08, pointerEvents: 'none' }} />

            <div className="glass-card w-full max-w-[440px] p-8 md:p-12 flex flex-col gap-8 shadow-2xl transition-all duration-300">
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        background: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)',
                        padding: '1rem',
                        borderRadius: '20px',
                        marginBottom: '1.5rem',
                        border: '1px solid var(--primary-glow)'
                    }}>
                        <Logo size="large" showText={false} />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                        CHESS<span style={{ color: 'var(--primary)' }}>DREZ</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                        Inicia sesión para continuar tu progreso
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--danger)',
                        padding: '1rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>EMAIL</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '3rem', height: '52px', fontSize: '0.95rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>CONTRASEÑA</label>
                            <Link to="#" style={{ fontSize: '0.7rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>¿Olvidaste tu contraseña?</Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '3rem', height: '52px', fontSize: '0.95rem' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ height: '56px', fontSize: '1rem', marginTop: '1rem', borderRadius: '16px' }} disabled={submitting}>
                        {submitting ? 'VALIDANDO...' : 'ENTRAR'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        ¿Nuevo en ChessDrez? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Crea una cuenta gratis</Link>
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} /> CONEXIÓN SEGURA SSL
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
