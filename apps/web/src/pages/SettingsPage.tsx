import React from 'react';
import { Volume2, Moon, Sun, Monitor, Bell, Shield, Palette, Check, Layout as LayoutIcon, Globe, Wind } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useSettings, BOARD_THEMES } from '../context/SettingsContext';

const SettingsPage: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { t } = useTranslation();

    const PIECE_STYLES = [
        { id: 'cburnett', name: 'Clásico' },
        { id: 'neo', name: 'Neo' },
        { id: 'wood', name: 'Madera' },
        { id: 'pixel', name: 'Pixel' }
    ];

    const glowStyle = {
        boxShadow: '0 0 20px var(--primary-glow)',
        borderColor: 'var(--primary)',
    };

    const hoverGlowClass = "hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:border-[var(--primary)] transition-all duration-300";

    return (
        <div className="h-full flex flex-col gap-6 p-6 overflow-hidden max-w-7xl mx-auto w-full">
            {/* Cabecera compacta */}
            <div className="shrink-0 flex items-center justify-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--primary)', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px', boxShadow: '0 0 15px var(--primary-glow)' }}>
                        <Palette size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>{t.settings.title}</h1>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Personaliza tu experiencia de juego</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
                {/* COLUMNA IZQUIERDA: APARIENCIA */}
                <div className="flex flex-col gap-4 min-h-0">
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ESTILO VISUAL</div>

                    <div className="glass-card flex-1 flex flex-col p-6 min-h-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                        {/* Tema del Sistema (Claro/Oscuro) */}
                        <div className="mb-6">
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Tema de la Aplicación</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    onClick={() => updateSettings({ darkMode: false })}
                                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${!settings.darkMode ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'border-[var(--border)] bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}`}
                                >
                                    <Sun size={20} />
                                    <span style={{ fontWeight: 800 }}>MODO CLARO</span>
                                </button>
                                <button
                                    onClick={() => updateSettings({ darkMode: true })}
                                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${settings.darkMode ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-[var(--border)] bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}`}
                                >
                                    <Moon size={20} />
                                    <span style={{ fontWeight: 800 }}>MODO OSCURO</span>
                                </button>
                            </div>
                        </div>

                        {/* Tema del Tablero */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>{t.settings.boardTheme}</h3>
                            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 grid grid-cols-3 gap-3">
                                {BOARD_THEMES.map((theme) => (
                                    <button
                                        key={theme.name}
                                        onClick={() => updateSettings({ boardTheme: theme })}
                                        className={hoverGlowClass}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: settings.boardTheme.name === theme.name ? '2px solid var(--primary)' : '1px solid var(--border)',
                                            borderRadius: '16px',
                                            padding: '0.75rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            boxShadow: settings.boardTheme.name === theme.name ? '0 0 20px var(--primary-glow)' : 'none'
                                        }}
                                    >
                                        <div style={{ width: '100%', aspectRatio: '1/1', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', borderRadius: '8px', overflow: 'hidden' }}>
                                            <div style={{ backgroundColor: theme.light }} />
                                            <div style={{ backgroundColor: theme.dark }} />
                                            <div style={{ backgroundColor: theme.dark }} />
                                            <div style={{ backgroundColor: theme.light }} />
                                        </div>
                                        <span style={{ fontSize: '0.65rem', color: settings.boardTheme.name === theme.name ? 'var(--primary)' : 'var(--text-main)', fontWeight: 800 }}>{theme.name.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Estilo de Piezas */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>{t.settings.pieceStyle}</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {PIECE_STYLES.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => updateSettings({ pieceStyle: style.id as any })}
                                        className={hoverGlowClass}
                                        style={{
                                            padding: '10px 18px',
                                            borderRadius: '14px',
                                            background: settings.pieceStyle === style.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                            color: settings.pieceStyle === style.id ? 'white' : 'var(--text-main)',
                                            border: '1px solid var(--border)',
                                            fontSize: '0.8rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            boxShadow: settings.pieceStyle === style.id ? '0 0 15px var(--primary-glow)' : 'none'
                                        }}
                                    >
                                        {settings.pieceStyle === style.id && <Check size={14} />}
                                        {style.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: SISTEMA */}
                <div className="flex flex-col gap-4 min-h-0">
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SISTEMA Y AUDIO</div>

                    <div className="glass-card flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                        {/* Idioma - Destacado */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ color: 'var(--primary)', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                    <Globe size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{t.settings.language}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Idioma de la interfaz</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                <button
                                    onClick={() => updateSettings({ language: 'es' })}
                                    className={`px-4 py-2 rounded-lg text-[0.7rem] font-bold transition-all ${settings.language === 'es' ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-[var(--text-muted)] hover:text-white'}`}
                                >
                                    ESPAÑOL
                                </button>
                                <button
                                    onClick={() => updateSettings({ language: 'en' })}
                                    className={`px-4 py-2 rounded-lg text-[0.7rem] font-bold transition-all ${settings.language === 'en' ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-[var(--text-muted)] hover:text-white'}`}
                                >
                                    ENGLISH
                                </button>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="flex-1">
                            <SettingToggle
                                icon={<Volume2 size={20} />}
                                label={t.settings.sound}
                                description="Efectos de sonido durante el juego"
                                enabled={settings.soundEnabled}
                                glowColor="rgba(59, 130, 246, 0.4)"
                                activeColor="rgb(59, 130, 246)"
                                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                            />

                            <SettingToggle
                                icon={<Wind size={20} />}
                                label={t.settings.animations}
                                description="Movimientos fluidos de las piezas"
                                enabled={settings.animationsEnabled}
                                glowColor="rgba(168, 85, 247, 0.4)"
                                activeColor="rgb(168, 85, 247)"
                                onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                            />

                            <SettingToggle
                                icon={<Bell size={20} />}
                                label="Notificaciones Push"
                                description="Alertas sobre retos e invitaciones"
                                enabled={false}
                                glowColor="rgba(245, 158, 11, 0.4)"
                                activeColor="rgb(245, 158, 11)"
                            />

                            <SettingToggle
                                icon={<Shield size={20} />}
                                label="Perfil Público"
                                description="Permitir que otros vean tus estadísticas"
                                enabled={true}
                                glowColor="rgba(34, 197, 94, 0.4)"
                                activeColor="rgb(34, 197, 94)"
                                last
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer metadata */}
            <div className="shrink-0 flex items-center justify-between pt-4 border-t border-white/5" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700 }}>
                <div className="opacity-40">CHESS DREZ ENGINE V3.0.4</div>
                <div className="opacity-40 tracking-widest">© 2026 PREMIUM CHESS PLATFORM</div>
                <div className="flex gap-4">
                    <span className="cursor-pointer hover:text-white transition-colors">TÉRMINOS</span>
                    <span className="cursor-pointer hover:text-white transition-colors">PRIVACIDAD</span>
                </div>
            </div>
        </div>
    );
};

interface SettingToggleProps {
    icon: React.ReactNode;
    label: string;
    description?: string;
    enabled: boolean;
    onClick?: () => void;
    last?: boolean;
    glowColor?: string;
    activeColor?: string;
}

const SettingToggle: React.FC<SettingToggleProps> = ({ icon, label, description, enabled, onClick, last, glowColor = 'var(--primary-glow)', activeColor = 'var(--primary)' }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem',
        borderBottom: last ? 'none' : '1px solid var(--border)',
        cursor: onClick ? 'pointer' : 'default',
        transition: '0.2s',
        opacity: onClick ? 1 : 0.6
    }} onClick={onClick} className={onClick ? "hover:bg-white/[0.02] group" : ""}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
                color: enabled ? activeColor : 'var(--text-muted)',
                background: enabled ? `${activeColor}1a` : 'rgba(255,255,255,0.03)',
                padding: '10px',
                borderRadius: '12px',
                transition: '0.3s',
                boxShadow: enabled ? `0 0 15px ${glowColor}` : 'none'
            }}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: enabled ? 'var(--text-main)' : 'var(--text-muted)', transition: '0.3s' }}>{label}</span>
                {description && <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{description}</span>}
            </div>
        </div>
        <div style={{
            width: '48px',
            height: '26px',
            background: enabled ? activeColor : 'rgba(255,255,255,0.05)',
            borderRadius: '24px',
            position: 'relative',
            border: '1px solid var(--border)',
            transition: '0.3s',
            boxShadow: enabled ? `0 0 10px ${glowColor}` : 'none'
        }}>
            <div style={{
                width: '18px',
                height: '18px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: enabled ? '25px' : '3px',
                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }} />
        </div>
    </div>
);

export default SettingsPage;
