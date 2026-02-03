/**
 * utils.js - Funciones puras y utilidades del cliente
 * Funciones sin efectos secundarios para lógica reutilizable
 */

import { LANGS, QUALITY_MAP, PUZZLE_THEMES_ES, AI_LEVELS } from './constants.js';

// ==================== TIME FORMATTING ====================

/**
 * Formatea segundos a formato MM:SS
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Formato MM:SS o MM:SS:CC para centésimas
 */
export function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Formatea milisegundos a formato legible
 * @param {number} ms - Milisegundos
 * @returns {string} Formato legible (ej: "2h 30m", "45s")
 */
export function formatMilliseconds(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

// ==================== TEXT SANITIZATION ====================

/**
 * Sanitiza texto para evitar XSS
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizado
 */
export function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

/**
 * Valida si un string es safe para mostrar
 * @param {string} str - String a validar
 * @returns {boolean} True si es seguro
 */
export function isSafeText(str) {
    if (typeof str !== 'string') return false;
    return !/[<>"'&]/.test(str);
}

// ==================== QUALITY & EVALUATION ====================

/**
 * Obtiene el mensaje de calidad para una jugada
 * @param {string} qualityClass - Clase de calidad (brilliant, great, good, etc)
 * @param {string} lang - Idioma ('es' o 'en')
 * @returns {object} {level, label, color}
 */
export function getQualityInfo(qualityClass, lang = 'es') {
    return QUALITY_MAP[qualityClass] || QUALITY_MAP['good'];
}

/**
 * Convierte centipeones a evaluación legible
 * @param {number} cp - Centipeones (ej: 32 = +0.32)
 * @returns {string} Ej: "+0.32" o "#3"
 */
export function formatEvaluation(cp) {
    if (cp === null || cp === undefined) return "0.00";

    // Si es mate (cp > 10000 o < -10000)
    if (Math.abs(cp) > 10000) {
        const moveCount = Math.ceil((32767 - Math.abs(cp)) / 2);
        const sign = cp > 0 ? '#' : '-#';
        return `${sign}${moveCount}`;
    }

    const score = (cp / 100).toFixed(2);
    const sign = cp > 0 ? '+' : '';
    return `${sign}${score}`;
}

/**
 * Calcula la diferencia de evaluación entre dos posiciones
 * @param {number} prevEval - Evaluación anterior (en centipeones)
 * @param {number} newEval - Evaluación nueva
 * @returns {number} Diferencia en centipeones
 */
export function getEvalDifference(prevEval, newEval) {
    if (prevEval === undefined || newEval === undefined) return 0;
    return newEval - prevEval;
}

// ==================== LANGUAGE & THEMES ====================

/**
 * Obtiene el nombre español de un tema de puzzle
 * @param {string} theme - Tema en inglés
 * @returns {string} Tema traducido al español
 */
export function getThemeNameES(theme) {
    if (!theme) return "Varios";
    const t = theme.trim();

    // Si contiene espacios, traducir cada palabra
    if (t.includes(' ')) {
        return t.split(' ').map(word => {
            const lower = word.toLowerCase();
            return PUZZLE_THEMES_ES[lower] || (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    const lowerT = t.toLowerCase();
    return PUZZLE_THEMES_ES[lowerT] || t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Obtiene la cadena de idioma para una clave
 * @param {string} key - Clave del idioma (ej: "mate", "win")
 * @param {string} lang - Idioma ('es' o 'en')
 * @returns {string} String localizado
 */
export function getLangString(key, lang = 'es') {
    return LANGS[lang]?.[key] || LANGS['es'][key] || key;
}

// ==================== ELO & RATING ====================

/**
 * Calcula cambio de ELO después de una partida
 * @param {number} playerElo - ELO actual del jugador
 * @param {number} opponentElo - ELO del oponente
 * @param {number} result - 1 (ganó), 0.5 (tablas), 0 (perdió)
 * @param {number} K - Factor K (por defecto 32)
 * @returns {object} {newElo, change}
 */
export function calculateEloChange(playerElo, opponentElo, result, K = 32) {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
    const eloChange = K * (result - expectedScore);
    const newElo = Math.round(playerElo + eloChange);
    return {
        newElo,
        change: Math.round(eloChange),
        expectedScore: expectedScore.toFixed(3)
    };
}

/**
 * Obtiene información del nivel de IA
 * @param {number} level - Nivel 1-8
 * @returns {object} {name, elo}
 */
export function getAiLevelInfo(level) {
    return AI_LEVELS[Math.min(8, Math.max(1, level))] || AI_LEVELS[5];
}

/**
 * Convierte ELO a nivel de IA aproximado
 * @param {number} elo - ELO rating
 * @returns {number} Nivel 1-8
 */
export function eloToAiLevel(elo) {
    if (elo < 900) return 1;
    if (elo < 1100) return 2;
    if (elo < 1300) return 3;
    if (elo < 1500) return 4;
    if (elo < 1700) return 5;
    if (elo < 1900) return 6;
    if (elo < 2100) return 7;
    return 8;
}

/**
 * Calcula el factor K basado en ELO del jugador
 * @param {number} elo - ELO actual
 * @returns {number} Factor K
 */
export function calculateKFactor(elo) {
    if (elo < 1600) return 32;
    if (elo < 2000) return 24;
    if (elo < 2400) return 16;
    return 8;
}

// ==================== MATH & STATISTICS ====================

/**
 * Calcula promedio simple
 * @param {number[]} arr - Array de números
 * @returns {number} Promedio
 */
export function average(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Calcula desviación estándar
 * @param {number[]} arr - Array de números
 * @returns {number} Desviación estándar
 */
export function stdDev(arr) {
    if (!arr || arr.length === 0) return 0;
    const avg = average(arr);
    const squareDiffs = arr.map(val => Math.pow(val - avg, 2));
    return Math.sqrt(average(squareDiffs));
}

/**
 * Limita un número dentro de un rango
 * @param {number} num - Número a limitar
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {number} Número limitado
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

// ==================== ARRAYS & COLLECTIONS ====================

/**
 * Mezcla aleatoriamente un array (Fisher-Yates)
 * @param {array} arr - Array a mezclar
 * @returns {array} Array mezclado
 */
export function shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Agrupa elementos por propiedad
 * @param {array} arr - Array a agrupar
 * @param {string} key - Propiedad para agrupar
 * @returns {object} Objeto agrupado
 */
export function groupBy(arr, key) {
    return arr.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

// ==================== DEBUGGING ====================

/**
 * Log con timestamp
 * @param {string} label - Etiqueta del log
 * @param {*} data - Datos a loguear
 */
export function debugLog(label, data) {
    const time = new Date().toLocaleTimeString('es-ES');
    console.log(`[${time}] ${label}:`, data);
}

/**
 * Crea un error descriptivo
 * @param {string} context - Contexto donde ocurrió el error
 * @param {string} message - Mensaje de error
 * @param {*} details - Detalles adicionales
 * @returns {Error} Error con formato
 */
export function createError(context, message, details) {
    const error = new Error(`[${context}] ${message}`);
    error.details = details;
    return error;
}
