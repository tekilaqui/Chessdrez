/**
 * audioSystem.js - Sistema de sonidos
 * Gestiona reproducción de sonidos de forma centralizada
 */

import { SOUND_URLS } from './constants.js';
import { debugLog } from './utils.js';

class AudioSystem {
    constructor() {
        this.enabled = localStorage.getItem('chess_sound') !== 'false';
        this.sounds = {};
        this.initialized = false;
        this.audioContext = null;
    }

    /**
     * Inicializa los sonidos (lazy load)
     */
    async initialize() {
        if (this.initialized) return;

        try {
            // Crear contexto de audio para mejor control
            if (!this.audioContext && window.AudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            // Precargar sonidos
            for (const [name, url] of Object.entries(SOUND_URLS)) {
                try {
                    const audio = new Audio();
                    audio.src = url;
                    audio.preload = 'auto';
                    audio.onerror = () => {
                        console.warn(`⚠️  Error cargando sonido: ${name}`);
                    };
                    this.sounds[name] = audio;
                } catch (e) {
                    console.warn(`⚠️  No se pudo cargar sonido ${name}:`, e.message);
                }
            }

            this.initialized = true;
            debugLog('AudioSystem', 'Inicializado correctamente');
        } catch (e) {
            console.error('❌ Error inicializando AudioSystem:', e);
        }
    }

    /**
     * Reproduce un sonido
     * @param {string} soundName - Nombre del sonido (move, capture, check, end, error)
     */
    play(soundName) {
        if (!this.enabled) return;

        if (!this.initialized) {
            this.initialize();
        }

        const audio = this.sounds[soundName];
        if (!audio) {
            console.warn(`⚠️  Sonido no encontrado: ${soundName}`);
            return;
        }

        try {
            // Reset reproducción anterior
            audio.currentTime = 0;
            
            // Intentar reproducir
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    debugLog('AudioSystem.play', `Error reproduciendo ${soundName}: ${e.message}`);
                });
            }
        } catch (e) {
            console.warn(`⚠️  Error reproduciendo ${soundName}:`, e.message);
        }
    }

    /**
     * Sonido de movimiento
     */
    playMove() {
        this.play('move');
    }

    /**
     * Sonido de captura
     */
    playCapture() {
        this.play('capture');
    }

    /**
     * Sonido de jaque
     */
    playCheck() {
        this.play('check');
    }

    /**
     * Sonido de fin de partida
     */
    playEnd() {
        this.play('end');
    }

    /**
     * Sonido de error
     */
    playError() {
        this.play('error');
    }

    /**
     * Habilita/deshabilita sonidos
     * @param {boolean} enabled - True para habilitar
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('chess_sound', enabled ? 'true' : 'false');
        debugLog('AudioSystem', `Sonidos ${enabled ? 'habilitados' : 'deshabilitados'}`);
    }

    /**
     * Verifica si los sonidos están habilitados
     * @returns {boolean}
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Alterna estado de sonidos
     * @returns {boolean} Nuevo estado
     */
    toggle() {
        this.setEnabled(!this.enabled);
        return this.enabled;
    }

    /**
     * Detiene todos los sonidos
     */
    stopAll() {
        try {
            for (const audio of Object.values(this.sounds)) {
                audio.pause();
                audio.currentTime = 0;
            }
        } catch (e) {
            console.warn('⚠️  Error deteniendo sonidos:', e);
        }
    }

    /**
     * Limpia recursos
     */
    dispose() {
        this.stopAll();
        this.sounds = {};
        this.initialized = false;
        if (this.audioContext && this.audioContext.close) {
            this.audioContext.close();
        }
    }
}

// Singleton
export const audioSystem = new AudioSystem();

export default AudioSystem;
