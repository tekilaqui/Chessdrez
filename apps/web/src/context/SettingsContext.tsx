import React, { createContext, useContext, useState, useEffect } from 'react';

interface BoardTheme {
    name: string;
    light: string;
    dark: string;
}

interface Settings {
    soundEnabled: boolean;
    darkMode: boolean;
    animationsEnabled: boolean;
    language: 'es' | 'en';
    boardTheme: BoardTheme;
    pieceStyle: 'cburnett' | 'neo' | 'wood' | 'pixel';
}

export const BOARD_THEMES: BoardTheme[] = [
    { name: 'Esmeralda', light: '#edefef', dark: '#69923e' },
    { name: 'Técnico', light: '#e5e7eb', dark: '#4b5563' },
    { name: 'Azul', light: '#dee3e6', dark: '#8ca2ad' },
    { name: 'Madera', light: '#ebecd0', dark: '#779556' },
    { name: 'Arena', light: '#f0d9b5', dark: '#b58863' },
    { name: 'Cyber', light: '#0f172a', dark: '#22c55e' }
];

const DEFAULT_SETTINGS: Settings = {
    soundEnabled: true,
    darkMode: true,
    animationsEnabled: true,
    language: 'es',
    boardTheme: BOARD_THEMES[0],
    pieceStyle: 'cburnett',
};

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('chessdrez_settings');
        if (saved) {
            try {
                return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
            } catch (e) {
                return DEFAULT_SETTINGS;
            }
        }
        return DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('chessdrez_settings', JSON.stringify(settings));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [settings.darkMode]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within a SettingsProvider');
    return context;
};
