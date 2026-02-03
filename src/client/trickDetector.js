/**
 * trickDetector.js - Detector de Trampas y Trucos en Tiempo Real
 * Integra bases de datos locales y APIs externas para identificar celadas
 */

import { debugLog } from './utils.js';

class TrickDetector {
    constructor() {
        this.cache = new Map();
        this.lichessExplorerUrl = 'https://explorer.lichess.ovh/lichess';
    }

    /**
     * Detecta si la posición actual contiene una trampa conocida o un truco estadístico
     * @param {string} fen - Posición actual
     * @param {array} moves - Historial de movimientos
     * @returns {Promise<object|null>} Información del truco detectado
     */
    async detect(fen, moves = []) {
        // 1. Detección por Base de Datos Local (Prioridad 1: Trampas Famosas)
        const localTrap = this.checkLocalTraps(fen);
        if (localTrap) {
            return {
                type: 'discovery',
                name: localTrap.name,
                severity: 'high',
                message: localTrap.warning,
                advice: localTrap.plan,
                source: 'local_db'
            };
        }

        // 2. Detección Estocástica vía Lichess API (Prioridad 2: Trucos Estadísticos)
        // Solo si estamos en la fase de apertura (menos de 15 jugadas)
        if (moves.length < 30) {
            try {
                const statisticTrick = await this.checkLichessTricks(fen);
                if (statisticTrick) return statisticTrick;
            } catch (e) {
                debugLog('TrickDetector', 'Lichess API unavailable or error');
            }
        }

        return null;
    }

    /**
     * Verifica trampas en el MAESTRO_KNOWLEDGE (basado en partes del FEN)
     */
    checkLocalTraps(fen) {
        if (!window.MAESTRO_KNOWLEDGE || !window.MAESTRO_KNOWLEDGE.traps) return null;

        const cleanFen = fen.split(' ')[0]; // Solo las piezas

        return window.MAESTRO_KNOWLEDGE.traps.find(trap => {
            if (!trap.fen_part) return false;
            return cleanFen.includes(trap.fen_part.split(' ')[0]);
        });
    }

    /**
     * Consulta Lichess Explorer para ver si una jugada parece un "truco"
     * Un truco es un movimiento que tiene pocos resultados para maestros pero muchos para aficionados,
     * y las blancas/negras suelen ganar desproporcionadamente.
     */
    async checkLichessTricks(fen) {
        if (this.cache.has(fen)) return this.cache.get(fen);

        // Parámetros para aficionados (jugadores reales de lichess)
        const url = `${this.lichessExplorerUrl}?fen=${encodeURIComponent(fen)}&speeds=blitz,rapid,classical&ratings=1000,1200,1500,1800,2000`;

        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        const moves = data.moves || [];

        if (moves.length === 0) return null;

        // Buscamos jugadas "venenosas":
        // 1. No son la jugada de Stockfish preferida (asumimos que la 1ra es mejor)
        // 2. Tienen un porcentaje de victoria muy alto para el que la juega
        // 3. El oponente suele fallar mucho (muchas pérdidas en proporción a empates)

        for (const m of moves.slice(0, 3)) {
            const total = m.white + m.draws + m.black;
            if (total < 100) continue; // Necesitamos muestra estadística

            const winRate = (data.pawnValue >= 0) ? (m.white / total) : (m.black / total);

            // Si una jugada fuera de las principales tiene > 55% de victoria en humanos
            if (winRate > 0.58) {
                const trick = {
                    type: 'statistical',
                    name: "Línea Venenosa / Truco Estadístico",
                    severity: 'medium',
                    message: `⚠️ Movimiento cautelar: La jugada '${m.san}' tiene un éxito inusualmente alto en niveles de club (${Math.round(winRate * 100)}%).`,
                    advice: "Analiza con cuidado. Puede haber una trampa táctica o una celada de apertura.",
                    source: 'lichess_stats'
                };
                this.cache.set(fen, trick);
                return trick;
            }
        }

        this.cache.set(fen, null);
        return null;
    }
}

export const trickDetector = new TrickDetector();
