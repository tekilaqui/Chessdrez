/**
 * puzzleSystem.js - Sistema de Puzzles y Ejercicios Tácticos
 * Gestión de puzzles, validación de soluciones, estadísticas
 */

import { state } from './state.js';
import { debugLog, getThemeNameES } from './utils.js';
import { audioSystem } from './audioSystem.js';

class PuzzleSystem {
    constructor() {
        this.puzzles = [];
        this.currentPuzzle = null;
        this.puzzleStats = JSON.parse(localStorage.getItem('chess_puz_stats')) || {};
        this.puzzleHistory = JSON.parse(localStorage.getItem('chess_puz_recent')) || [];
        this.isLoaded = false;
        this.userPuzzleElo = parseInt(localStorage.getItem('chess_puz_elo')) || 1500;
    }

    /**
     * Carga puzzles desde una fuente
     * @param {array} puzzlesData - Array de puzzles
     */
    loadPuzzles(puzzlesData) {
        try {
            this.puzzles = puzzlesData || [];
            this.isLoaded = true;
            debugLog('PuzzleSystem', `${this.puzzles.length} puzzles cargados`);
        } catch (error) {
            console.error('Error cargando puzzles:', error);
        }
    }

    /**
     * Obtiene un puzzle aleatorio
     * @param {object} filters - Filtros (tema, dificultad, etc)
     * @returns {object} Puzzle seleccionado
     */
    getRandomPuzzle(filters = {}) {
        if (!this.isLoaded || this.puzzles.length === 0) {
            return null;
        }

        let candidates = this.puzzles;

        // Aplicar filtros
        if (filters.theme) {
            candidates = candidates.filter(p => p.themes?.includes(filters.theme));
        }

        if (filters.minRating) {
            candidates = candidates.filter(p => p.rating >= filters.minRating);
        }

        if (filters.maxRating) {
            candidates = candidates.filter(p => p.rating <= filters.maxRating);
        }

        if (candidates.length === 0) {
            candidates = this.puzzles;
        }

        const randomIndex = Math.floor(Math.random() * candidates.length);
        return candidates[randomIndex];
    }

    /**
     * Obtiene el siguiente puzzle del día
     * @returns {object} Puzzle del día
     */
    getDailyPuzzle() {
        const today = new Date().toDateString();
        const lastDaily = localStorage.getItem('chess_daily_date');

        if (lastDaily === today) {
            const dailyPuzzle = JSON.parse(localStorage.getItem('chess_daily_puzzle'));
            return dailyPuzzle;
        }

        // Nuevo día, nuevo puzzle
        const puzzle = this.getRandomPuzzle();
        localStorage.setItem('chess_daily_date', today);
        localStorage.setItem('chess_daily_puzzle', JSON.stringify(puzzle));
        localStorage.setItem('chess_daily_solved', 'false');

        return puzzle;
    }

    /**
     * Inicia un puzzle
     * @param {object} puzzle - Objeto del puzzle
     */
    startPuzzle(puzzle) {
        state.resetForNewPuzzle();
        state.setCurrentPuzzle(puzzle);

        this.currentPuzzle = {
            ...puzzle,
            moveHistory: [], // Historial de movimientos (indices)
            attemptHistory: [] // Intentos fallidos
        };
        
        state.setGameMode('exercises');
        state.setPuzzleStep(0);

        debugLog('PuzzleSystem', `Puzzle iniciado: ${puzzle.themes?.join(', ')}`);

        return {
            puzzleId: puzzle.puzzle_id,
            fen: puzzle.fen,
            moves: puzzle.moves,
            rating: puzzle.rating,
            themes: puzzle.themes,
            themes_es: puzzle.themes?.map(getThemeNameES).join(', '),
            currentStep: 0,
            totalSteps: puzzle.moves.length
        };
    }

    /**
     * Valida un movimiento en el puzzle
     * @param {string} move - Movimiento en notación algebraica
     * @returns {object} Resultado de la validación
     */
    validatePuzzleMove(move) {
        if (!this.currentPuzzle) {
            return { valid: false, error: 'No hay puzzle activo' };
        }

        const expectedMoves = this.currentPuzzle.moves;
        if (!expectedMoves || expectedMoves.length === 0) {
            return { valid: false, error: 'Puzzle corrupto' };
        }

        const currentStep = state.getPuzzleStep();
        const expectedMove = expectedMoves[currentStep];

        const isCorrect = move === expectedMove;

        if (isCorrect) {
            // Registrar movimiento correcto
            this.currentPuzzle.moveHistory.push(currentStep);
            state.setPuzzleStep(currentStep + 1);
            audioSystem.playMove();

            // Verificar si el puzzle está completo
            if (currentStep + 1 >= expectedMoves.length) {
                return {
                    valid: true,
                    correct: true,
                    complete: true,
                    message: '¡Excelente! ¡Puzzle resuelto! 🎉'
                };
            }

            return {
                valid: true,
                correct: true,
                complete: false,
                nextStep: currentStep + 1,
                nextMove: expectedMoves[currentStep + 1],
                message: 'Movimiento correcto. Continúa...'
            };
        } else {
            // Registrar intento fallido
            this.currentPuzzle.attemptHistory.push({
                step: currentStep,
                attemptedMove: move,
                expectedMove: expectedMove
            });
            
            audioSystem.playError();
            
            // NO reseteamos, solo indicamos el error
            return {
                valid: false,
                correct: false,
                message: `Movimiento incorrecto. Esperaba: ${expectedMove}`,
                hint: `Intenta ${expectedMove}`,
                currentStep: currentStep // Mantener en la misma posición
            };
        }
    }

    /**
     * Navega un paso atrás en el puzzle (CORRECCIÓN POR FALLO)
     * Vuelve a la posición anterior al movimiento fallido
     * @returns {object} Resultado
     */
    stepBack() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const currentStep = state.getPuzzleStep();
        
        if (currentStep > 0) {
            state.setPuzzleStep(currentStep - 1);
            
            return {
                success: true,
                newStep: currentStep - 1,
                move: this.currentPuzzle.moves[currentStep - 1],
                message: 'Paso atrás'
            };
        }

        return {
            success: false,
            message: 'Ya estás en el inicio'
        };
    }

    /**
     * Navega un paso adelante en el puzzle
     * @returns {object} Resultado
     */
    stepForward() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const currentStep = state.getPuzzleStep();
        const totalSteps = this.currentPuzzle.moves.length;

        if (currentStep < totalSteps - 1) {
            state.setPuzzleStep(currentStep + 1);
            
            return {
                success: true,
                newStep: currentStep + 1,
                move: this.currentPuzzle.moves[currentStep + 1],
                message: 'Paso adelante'
            };
        }

        return {
            success: false,
            message: 'Ya estás en el final'
        };
    }

    /**
     * Vuelve al inicio del puzzle
     * @returns {object} Resultado
     */
    goToStart() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        state.setPuzzleStep(0);
        
        return {
            success: true,
            newStep: 0,
            message: 'Volviendo al inicio'
        };
    }

    /**
     * Va al final del puzzle
     * @returns {object} Resultado
     */
    goToEnd() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const totalSteps = this.currentPuzzle.moves.length;
        const finalStep = Math.max(0, totalSteps - 1);
        
        state.setPuzzleStep(finalStep);
        
        return {
            success: true,
            newStep: finalStep,
            message: 'Yendo al final'
        };
    }

    /**
     * Navega a un paso específico
     * @param {number} step - Paso destino
     * @returns {object} Resultado
     */
    goToStep(step) {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const totalSteps = this.currentPuzzle.moves.length;
        const clampedStep = Math.max(0, Math.min(step, totalSteps - 1));

        state.setPuzzleStep(clampedStep);
        
        return {
            success: true,
            newStep: clampedStep,
            move: this.currentPuzzle.moves[clampedStep],
            message: `Navegando a paso ${clampedStep + 1}`
        };
    }

    /**
     * Obtiene información del estado actual del puzzle
     * @returns {object} Estado actual
     */
    getPuzzleState() {
        if (!this.currentPuzzle) {
            return null;
        }

        const currentStep = state.getPuzzleStep();
        const totalSteps = this.currentPuzzle.moves.length;

        return {
            currentStep: currentStep,
            totalSteps: totalSteps,
            progress: Math.round((currentStep / totalSteps) * 100),
            currentMove: this.currentPuzzle.moves[currentStep],
            attempts: this.currentPuzzle.attemptHistory.length,
            completed: currentStep >= totalSteps - 1
        };
    }

    /**
     * Termina el puzzle (resuelto o abandonado)
     * @param {string} result - 'solved', 'abandoned', 'timeout'
     * @returns {object} Resultado con puntuación correcta
     */
    endPuzzle(result = 'solved') {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const success = result === 'solved';
        const themes = this.currentPuzzle.themes || [];
        const rating = this.currentPuzzle.rating || 1500;

        // Calcular puntuación basada en:
        // 1. Si fue resuelto
        // 2. Número de intentos fallidos
        // 3. Eficiencia (movimientos correctos / intentos totales)
        // 4. Si se usó solución (-10 puntos)
        
        const attempts = this.currentPuzzle.attemptHistory.length;
        const totalMoves = this.currentPuzzle.moves.length;
        const usedSolution = this.currentPuzzle.usedSolution || false;
        
        let points = 0;
        let multiplier = 1;
        let solutionPenalty = 0;

        if (success) {
            // Base: 10 puntos por puzzle resuelto
            points = 10;
            
            // Bonus por eficiencia
            if (attempts === 0) {
                // Perfecto sin errores
                multiplier = 2;
                points = 20;
            } else if (attempts === 1) {
                // 1 error
                multiplier = 1.5;
                points = 15;
            } else if (attempts <= 3) {
                // 2-3 errores
                multiplier = 1.2;
                points = 12;
            } else {
                // 4+ errores
                multiplier = 1;
                points = 10;
            }
            
            // Ajuste por dificultad del puzzle
            if (rating > 1800) points = Math.round(points * 1.5);
            else if (rating > 1600) points = Math.round(points * 1.2);

            // PENALIZACIÓN POR USAR SOLUCIÓN: -10 puntos
            if (usedSolution) {
                solutionPenalty = -10;
                points = Math.max(0, points + solutionPenalty); // No puede ir negativo
            }
        } else {
            // Abandonado o timeout: -5 puntos
            points = -5;
            multiplier = 0;
        }

        // Actualizar ELO del puzzle
        const oldElo = this.userPuzzleElo;
        if (success) {
            this.userPuzzleElo = Math.round(this.userPuzzleElo + (rating - this.userPuzzleElo) * 0.04);
        } else {
            this.userPuzzleElo = Math.round(this.userPuzzleElo - (this.userPuzzleElo - rating) * 0.02);
        }

        this.userPuzzleElo = Math.max(400, Math.min(3000, this.userPuzzleElo));

        // Actualizar estadísticas
        this.updatePuzzleStats(themes, success, rating);

        // Guardar historial con puntuación detallada
        this.puzzleHistory.unshift({
            puzzle_id: this.currentPuzzle.puzzle_id,
            themes: themes.map(getThemeNameES).join(', '),
            success: success,
            rating: rating,
            attempts: attempts,
            usedSolution: usedSolution,
            solutionPenalty: solutionPenalty,
            points: points,
            multiplier: multiplier,
            date: new Date().getTime()
        });

        // Mantener últimas 50
        if (this.puzzleHistory.length > 50) {
            this.puzzleHistory.pop();
        }

        localStorage.setItem('chess_puz_elo', this.userPuzzleElo.toString());
        localStorage.setItem('chess_puz_stats', JSON.stringify(this.puzzleStats));
        localStorage.setItem('chess_puz_recent', JSON.stringify(this.puzzleHistory));

        debugLog('PuzzleSystem', `Puzzle ${result}: ${points}pts (x${multiplier}) | Intentos: ${attempts} | Solución: ${usedSolution ? 'SÍ (-10)' : 'NO'} | ELO: ${oldElo}→${this.userPuzzleElo}`);

        return {
            success: success,
            result: result,
            points: points,
            multiplier: multiplier,
            attempts: attempts,
            usedSolution: usedSolution,
            solutionPenalty: solutionPenalty,
            eloChange: this.userPuzzleElo - oldElo,
            newElo: this.userPuzzleElo,
            themes: themes,
            message: success 
                ? `¡Resuelto! +${points} puntos ${usedSolution ? '(-10 por solución)' : '(x' + multiplier + ')'}`
                : `Abandonado. -${Math.abs(points)} puntos`
        };
    }

    /**
     * Actualiza las estadísticas de puzzles
     * @param {array} themes - Temas del puzzle
     * @param {boolean} success - Si fue resuelto correctamente
     * @param {number} rating - Rating del puzzle
     */
    updatePuzzleStats(themes, success, rating) {
        for (const theme of themes) {
            if (!this.puzzleStats[theme]) {
                this.puzzleStats[theme] = {
                    attempts: 0,
                    success: 0,
                    successRate: 0,
                    rating: 0
                };
            }

            this.puzzleStats[theme].attempts++;
            if (success) {
                this.puzzleStats[theme].success++;
            }

            this.puzzleStats[theme].successRate = 
                Math.round((this.puzzleStats[theme].success / this.puzzleStats[theme].attempts) * 100);
            this.puzzleStats[theme].rating = rating;
        }
    }

    /**
     * Obtiene estadísticas de temas
     * @returns {object} Estadísticas desglosadas por tema
     */
    getStatsByTheme() {
        const stats = [];

        for (const [theme, data] of Object.entries(this.puzzleStats)) {
            stats.push({
                theme: getThemeNameES(theme),
                themeCode: theme,
                attempts: data.attempts,
                success: data.success,
                successRate: data.successRate,
                rating: data.rating
            });
        }

        return stats.sort((a, b) => b.attempts - a.attempts);
    }

    /**
     * Obtiene información de progreso
     * @returns {object} Progreso general
     */
    getProgress() {
        const totalPuzzles = this.puzzleHistory.length;
        const solvedCount = this.puzzleHistory.filter(p => p.success).length;
        const successRate = totalPuzzles > 0 
            ? Math.round((solvedCount / totalPuzzles) * 100)
            : 0;

        return {
            currentElo: this.userPuzzleElo,
            totalAttempts: totalPuzzles,
            totalSolved: solvedCount,
            successRate: successRate,
            themes: Object.keys(this.puzzleStats).length,
            recentPuzzles: this.puzzleHistory.slice(0, 10)
        };
    }

    /**
     * Obtiene el historial reciente de puzzles
     * @param {number} limit - Límite de resultados
     * @returns {array} Historial reciente
     */
    getRecentPuzzles(limit = 20) {
        return this.puzzleHistory.slice(0, limit);
    }

    /**
     * Busca puzzles por tema
     * @param {string} theme - Tema a buscar
     * @returns {array} Puzzles del tema
     */
    getPuzzlesByTheme(theme) {
        if (!this.isLoaded) return [];
        return this.puzzles.filter(p => p.themes?.includes(theme));
    }

    /**
     * Busca puzzles por rango de rating
     * @param {number} min - Rating mínimo
     * @param {number} max - Rating máximo
     * @returns {array} Puzzles en rango
     */
    getPuzzlesByRating(min, max) {
        if (!this.isLoaded) return [];
        return this.puzzles.filter(p => p.rating >= min && p.rating <= max);
    }

    /**
     * Exporta estadísticas
     * @returns {object} Datos para exportar
     */
    exportStats() {
        return {
            elo: this.userPuzzleElo,
            stats: this.puzzleStats,
            history: this.puzzleHistory,
            progress: this.getProgress()
        };
    }

    /**
     * Reinicia estadísticas (usar con cuidado)
     */
    resetStats() {
        this.puzzleStats = {};
        this.puzzleHistory = [];
        this.userPuzzleElo = 1500;
        localStorage.removeItem('chess_puz_stats');
        localStorage.removeItem('chess_puz_recent');
        localStorage.removeItem('chess_puz_elo');
        debugLog('PuzzleSystem', 'Estadísticas reiniciadas');
    }

    /**
     * Obtiene estadísticas de intentos del puzzle actual
     * @returns {object} Detalles de intentos
     */
    getAttemptStats() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const attempts = this.currentPuzzle.attemptHistory;
        
        return {
            totalAttempts: attempts.length,
            failedSteps: attempts.map(a => a.step),
            attemptDetails: attempts.map((a, i) => ({
                attempt: i + 1,
                step: a.step,
                attemptedMove: a.attemptedMove,
                correctMove: a.expectedMove
            })),
            efficiency: attempts.length === 0 
                ? 100 
                : Math.round(((this.currentPuzzle.moves.length - attempts.length) / this.currentPuzzle.moves.length) * 100)
        };
    }

    /**
     * Obtiene una pista para el movimiento actual
     * @returns {object} Información de la pista
     */
    getHint() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const currentStep = state.getPuzzleStep();
        const totalSteps = this.currentPuzzle.moves.length;

        if (currentStep >= totalSteps) {
            return { error: 'Puzzle ya completado' };
        }

        const nextMove = this.currentPuzzle.moves[currentStep];
        
        // Extraer información del movimiento (ej: "e2e4" → from: "e2", to: "e4")
        const fromSquare = nextMove.substring(0, 2);
        const toSquare = nextMove.substring(2, 4);
        const promotion = nextMove.length > 4 ? nextMove.substring(4) : null;

        audioSystem.playMove();

        return {
            hint: true,
            message: `Mueve desde ${fromSquare.toUpperCase()} a ${toSquare.toUpperCase()}`,
            fromSquare: fromSquare,
            toSquare: toSquare,
            move: nextMove,
            promotion: promotion
        };
    }

    /**
     * Obtiene la solución completa del puzzle
     * Marca como "usar solución" y resta puntos
     * @returns {object} Solución completa + penalización
     */
    useSolution() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const currentStep = state.getPuzzleStep();
        const totalSteps = this.currentPuzzle.moves.length;
        const remainingMoves = this.currentPuzzle.moves.slice(currentStep);

        // Marcar que se usó solución (penalización en endPuzzle)
        this.currentPuzzle.usedSolution = true;
        
        // Registrar intento de "solución" como fallo
        this.currentPuzzle.attemptHistory.push({
            step: currentStep,
            attemptedMove: 'SOLUTION_USED',
            expectedMove: this.currentPuzzle.moves[currentStep],
            penalty: true
        });

        audioSystem.playError();

        // Convertir movimientos a notación legible
        const solutionMoves = remainingMoves.map((move, index) => {
            const from = move.substring(0, 2);
            const to = move.substring(2, 4);
            return `${index + currentStep + 1}. ${from}→${to}`;
        });

        debugLog('PuzzleSystem', 'Se usó solución - Penalización aplicada');

        return {
            used: true,
            message: '💡 Solución mostrada - Se restan 10 puntos',
            remainingMoves: remainingMoves,
            solutionDisplay: solutionMoves.join(', '),
            penalty: -10,
            hint: 'Completa el puzzle manualmente para ganar puntos'
        };
    }

    /**
     * Resuelve el puzzle automáticamente (cuando se usa solución)
     * Ejecuta todos los movimientos restantes y termina
     * @returns {object} Resultado de resolución
     */
    autoSolvePuzzle() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        const currentStep = state.getPuzzleStep();
        const totalSteps = this.currentPuzzle.moves.length;

        // Avanzar al final
        state.setPuzzleStep(totalSteps);

        // Marcar todos los movimientos restantes como automáticos
        this.currentPuzzle.autoSolved = true;

        debugLog('PuzzleSystem', 'Puzzle resuelto automáticamente con solución');

        return {
            autoSolved: true,
            message: 'Puzzle resuelto con solución',
            stepsAdvanced: totalSteps - currentStep
        };
    }

    /**
     * MÉTODO COMPLETO: Usar solución + resolver puzzle
     * Esto es lo que debe llamar el botón "Solución" en la UI
     * @returns {object} Información completa de resolución con penalización
     */
    showSolutionAndResolve() {
        if (!this.currentPuzzle) {
            return { error: 'No hay puzzle activo' };
        }

        // 1. Mostrar solución con penalización
        const solutionInfo = this.useSolution();

        // 2. Resolver automáticamente
        const resolveInfo = this.autoSolvePuzzle();

        // 3. Terminar el puzzle
        const endResult = this.endPuzzle('solved');

        // 4. Retornar información completa
        return {
            success: true,
            message: '💡 Solución aplicada - Puzzle resuelto con penalización',
            solution: solutionInfo.solutionDisplay,
            solutionMoves: solutionInfo.remainingMoves,
            penalty: solutionInfo.penalty,
            pointsFinal: endResult.points,
            eloChange: endResult.eloChange,
            newElo: endResult.newElo
        };
    }

    /**
     * Calcula la penalización por usar solución
     * @returns {number} Puntos a restar
     */
    calculateSolutionPenalty() {
        if (!this.currentPuzzle || !this.currentPuzzle.usedSolution) {
            return 0;
        }

        // -10 puntos fijos por usar solución
        return -10;
    }
}

// Singleton
export const puzzleSystem = new PuzzleSystem();

export default PuzzleSystem;
export const puzzleSystem = new PuzzleSystem();

export default PuzzleSystem;
