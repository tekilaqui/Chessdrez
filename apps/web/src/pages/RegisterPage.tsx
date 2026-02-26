import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Logo from '../components/Logo';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await register(email, password, name);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear la cuenta. Intente con otro email.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] p-6 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--success)', filter: 'blur(180px)', opacity: 0.08, pointerEvents: 'none' }} />

            <div className="glass-card w-full max-w-[480px] p-8 md:p-12 flex flex-col gap-8 shadow-2xl transition-all duration-300">
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
                        ÚNETE A LA <span style={{ color: 'var(--primary)' }}>ELITE</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                        Crea tu perfil y empieza a dominar el tablero
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>NOMBRE COMPLETO</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ paddingLeft: '3rem', height: '52px', fontSize: '0.95rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>EMAIL EMPRESARIAL / PERSONAL</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>CONTRASEÑA SEGURA</label>
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

                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            <Check size={14} color="var(--primary)" /> Acceso premium a todos los módulos
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            <Check size={14} color="var(--primary)" /> Motor Stockfish validado incluido
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ height: '56px', fontSize: '1rem', marginTop: '1rem', borderRadius: '16px' }} disabled={submitting}>
                        {submitting ? 'CREANDO PERFIL...' : 'REGISTRARME'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Inicia sesión aquí</Link>
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} /> TUS DATOS ESTÁN PROTEGIDOS
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
