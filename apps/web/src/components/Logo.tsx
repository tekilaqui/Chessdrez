import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    size?: 'small' | 'medium' | 'large';
    showText?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, className = '', style = {} }) => {
    const iconSize = size === 'small' ? 24 : size === 'large' ? 48 : 32;
    const fontSize = size === 'small' ? '1rem' : size === 'large' ? '1.75rem' : '1.25rem';

    return (
        <Link to="/" className={`logo-container ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: size === 'small' ? '0.5rem' : '0.75rem',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
            ...style
        }} onMouseOver={e => e.currentTarget.style.opacity = '0.8'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            <div style={{
                width: iconSize,
                height: iconSize,
                background: '#22c55e', // Verde del logo proporcionado
                borderRadius: size === 'small' ? '6px' : '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0
            }}>
                <img
                    src="/assets/logo.png"
                    alt="ChessDrez Logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }}
                    onError={(e) => {
                        // Fallback por si la imagen no carga: usar el icono Lucide Rook
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>
            {showText && (
                <span style={{
                    fontSize: fontSize,
                    fontWeight: 900,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    lineHeight: 1
                }}>
                    CHESS<span style={{ color: '#22c55e' }}>DREZ</span>
                </span>
            )}
        </Link>
    );
};

export default Logo;
