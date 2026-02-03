/**
 * openings.js - Sistema de aperturas y teoría
 * Gestiona datos de aperturas y funciones relacionadas
 */

import { debugLog } from './utils.js';

// Base de datos de aperturas importada de openings_enhanced.js
let OPENINGS_DATA = [];

/**
 * Inicializa la base de datos de aperturas
 * @param {array} openingsData - Datos de aperturas
 */
export function initializeOpenings(openingsData) {
    if (!openingsData || !Array.isArray(openingsData)) {
        console.warn('⚠️  Datos de aperturas inválidos');
        return;
    }
    OPENINGS_DATA = openingsData;
    debugLog('OpeningsSystem', `${openingsData.length} categorías de aperturas cargadas`);
}

/**
 * Busca la apertura actual basada en los movimientos
 * @param {array} moves - Array de movimientos (ej: ["e4", "c5"])
 * @returns {object|null} Datos de la apertura
 */
export function findOpening(moves) {
    if (!moves || moves.length < 1) return null;

    for (const category of OPENINGS_DATA) {
        if (!category.items) continue;

        for (const opening of category.items) {
            const theoryMoves = opening.m || opening.moves;
            if (!theoryMoves) continue;

            // Verificar si los movimientos coinciden
            let matches = true;
            for (let i = 0; i < Math.min(moves.length, theoryMoves.length); i++) {
                const moveA = moves[i].replace(/[+#]/g, ''); // SAN without check/mate
                const moveB = theoryMoves[i].replace(/[+#]/g, '');

                // Intento coincidencia exacta (SAN vs SAN o UCI vs UCI)
                if (moveA !== moveB) {
                    // Fallback para coincidencia UCI simple (ej: e2e4 vs e4) 
                    // si la teoría está en formato largo de 4-5 caracteres
                    if (moveB.length >= 4) {
                        const sanToCompare = moveA.toLowerCase();
                        const uciToCompare = moveB.toLowerCase();
                        // Coincidencia muy básica para peones y piezas (e4 en e2e4)
                        if (!uciToCompare.includes(sanToCompare)) {
                            matches = false;
                            break;
                        }
                    } else {
                        matches = false;
                        break;
                    }
                }
            }

            if (matches && moves.length <= theoryMoves.length) {
                return {
                    name: opening.name,
                    category: category.group,
                    moves: theoryMoves,
                    progress: moves.length,
                    totalMoves: theoryMoves.length,
                    nextMove: theoryMoves[moves.length] || null
                };
            }
        }
    }

    return null;
}

/**
 * Obtiene la apertura actual del juego
 * Asume que existen funciones globales del chess engine
 * @returns {object|null} Datos de la apertura
 */
export function getCurrentOpening(moveHistory) {
    if (!moveHistory || moveHistory.length === 0) {
        return null;
    }

    // Extraer movimientos en notación estándar
    if (!Array.isArray(moveHistory)) {
        return null;
    }
    const moves = moveHistory.map(move => move.move || move);
    return findOpening(moves);
}

/**
 * Obtiene todas las aperturas en una categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {array} Aperturas en la categoría
 */
export function getOpeningsByCategory(categoryName) {
    const category = OPENINGS_DATA.find(c => c.group === categoryName);
    return category ? category.items : [];
}

/**
 * Obtiene todas las categorías
 * @returns {array} Nombres de categorías
 */
export function getCategories() {
    return OPENINGS_DATA.map(cat => cat.group);
}

/**
 * Busca aperturas por nombre
 * @param {string} query - Término de búsqueda
 * @returns {array} Aperturas coincidentes
 */
export function searchOpenings(query) {
    if (!query || query.length < 2) return [];

    const lower = query.toLowerCase();
    const results = [];

    for (const category of OPENINGS_DATA) {
        for (const opening of category.items || []) {
            if (opening.name && opening.name.toLowerCase().includes(lower)) {
                results.push({
                    name: opening.name,
                    category: category.group,
                    moves: opening.m
                });
            }
        }
    }

    return results;
}

/**
 * Obtiene información detallada de una apertura específica
 * @param {string} openingName - Nombre de la apertura
 * @returns {object|null} Información detallada
 */
export function getOpeningInfo(openingName) {
    if (!openingName) return null;

    for (const category of OPENINGS_DATA) {
        for (const opening of category.items || []) {
            if (opening.name === openingName) {
                return {
                    name: opening.name,
                    category: category.group,
                    moves: opening.m,
                    moveCount: opening.m ? opening.m.length : 0,
                    description: `La ${opening.name} es una apertura que comienza con: ${(opening.m || []).slice(0, 4).join(' ')}`,
                    recommendations: getRecommendationsForOpening(opening.name)
                };
            }
        }
    }

    return null;
}

/**
 * Obtiene recomendaciones para una apertura
 * @param {string} openingName - Nombre de la apertura
 * @returns {array} Recomendaciones
 */
function getRecommendationsForOpening(openingName) {
    const recs = {
        'Apertura Española': [
            'Desarrolla piezas menores antes de enrocar',
            'Mantén el centro controlado',
            'Busca debilidades en f7 del oponente'
        ],
        'Siciliana': [
            'Busca ventaja central',
            'Desarrolla rápidamente',
            'Cuidado con ataques en el flanco'
        ],
        'Gambito de Dama': [
            'Acepta o rechaza el gambito según tu estilo',
            'Desarrolla con solidez',
            'Busca contraataques en el centro'
        ]
    };

    return recs[openingName] || [
        'Desarrolla tus piezas',
        'Controla el centro',
        'Enroca a tiempo'
    ];
}

/**
 * Genera una línea de apertura recomendada
 * @param {string} firstMove - Primer movimiento (ej: "e4")
 * @returns {object} Línea de apertura
 */
export function generateOpeningLine(firstMove) {
    const candidates = [];

    for (const category of OPENINGS_DATA) {
        for (const opening of category.items || []) {
            if (opening.m && opening.m[0] === firstMove) {
                candidates.push(opening);
            }
        }
    }

    if (candidates.length === 0) {
        return { moves: [firstMove], note: 'Movimiento poco usual' };
    }

    // Retorna la apertura más popular (primera en la lista)
    const chosen = candidates[0];
    return {
        name: chosen.name,
        moves: chosen.m,
        note: `Recomendado: ${chosen.name}`
    };
}

/**
 * Valida una secuencia de movimientos contra teoría
 * @param {array} moves - Movimientos a validar
 * @returns {object} {isTheoretical, opening, nextMove}
 */
export function validateMovesAgainstTheory(moves) {
    const opening = findOpening(moves);

    if (!opening) {
        return {
            isTheoretical: false,
            opening: null,
            message: 'Fuera de la teoría conocida'
        };
    }

    const isComplete = moves.length >= opening.totalMoves;

    return {
        isTheoretical: true,
        opening: opening.name,
        progress: `${opening.progress}/${opening.totalMoves}`,
        nextMove: opening.nextMove,
        message: isComplete ? 'Aperturas completada' : 'Siguiendo la teoría'
    };
}

export default {
    initializeOpenings,
    findOpening,
    getCurrentOpening,
    getOpeningsByCategory,
    getCategories,
    searchOpenings,
    getOpeningInfo,
    generateOpeningLine,
    validateMovesAgainstTheory
};
