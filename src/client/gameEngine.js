/**
 * gameEngine.js - Motor de Juego
 * Gestiona la lógica principal de ajedrez: movimientos, reglas, turnos, tiempo
 */

import { state } from './state.js';
import { utils } from './utils.js';
import { audioSystem } from './audioSystem.js';
import { calculateEloChange } from './utils.js';
import { QUALITY_MAP, DEFAULT_SETTINGS } from './constants.js';
import { debugLog } from './utils.js';

class GameEngine {
    constructor(chessInstance = null) {
        this.chess = chessInstance; // Instancia de Chess.js
        this.gameId = null;
        this.clockInterval = null;
        this.isInitialized = false;
        this.moveHistory = [];
        this.socket = null; // Para juegos en red
        this.callbacks = {
            onMove: null,
            onGameOver: null,
            onClockUpdate: null
        };
    }

    /**
     * Inyecta dependencias externas
     * @param {Chess} chess - Instancia de Chess.js
     * @param {Socket} socket - Socket.io connection
     */
    setDependencies(chess, socket = null) {
        this.chess = chess;
        this.socket = socket;
        return this;
    }

    /**
     * Inicializa un nuevo juego
     * @param {object} config - Configuración del juego
     * @returns {object} Estado inicial
     */
    initializeGame(config = {}) {
        const {
            mode = 'local',
            timeControl = 600,
            playerColor = 'w',
            opponentLevel = 5,
            randomizer = true
        } = config;

        // Resetear estado
        state.resetForNewGame();
        this.chess.reset();

        // Configurar nuevo juego
        state.setGameMode(mode);
        state.setMyColor(playerColor);
        state.setTime('w', timeControl);
        state.setTime('b', timeControl);
        state.setAIThinking(false);

        this.isInitialized = true;
        this.gameId = this.generateGameId();
        state.setGameId(this.gameId);

        debugLog('GameEngine', `Juego inicializado: ${mode} | Tiempo: ${timeControl}s`);

        return {
            gameId: this.gameId,
            mode: mode,
            playerColor: playerColor,
            fen: this.chess.fen(),
            timeControl: timeControl
        };
    }

    /**
     * Realiza un movimiento en el tablero
     * @param {string} from - Cuadrado origen (ej: "e2")
     * @param {string} to - Cuadrado destino (ej: "e4")
     * @param {object} promotion - Promoción si aplica
     * @returns {object} Resultado del movimiento
     */
    makeMove(from, to, promotion = null) {
        if (!this.isInitialized || !this.chess) {
            return { success: false, error: 'Juego no inicializado' };
        }

        try {
            // Validar que es el turno del jugador
            const currentTurn = this.chess.turn();
            if (currentTurn !== state.getMyColor()[0]) {
                return { success: false, error: 'No es tu turno' };
            }

            // Intentar realizar el movimiento
            const moveObj = {
                from: from.toLowerCase(),
                to: to.toLowerCase(),
                promotion: promotion || undefined
            };

            const move = this.chess.move(moveObj, { sloppy: false });

            if (!move) {
                return { success: false, error: 'Movimiento inválido' };
            }

            // Reproducir sonido
            this.playMoveSound(move);

            // Registrar en historial
            const moveData = {
                fen: this.chess.fen(),
                move: move.san,
                from: move.from,
                to: move.to,
                piece: move.piece,
                captured: move.captured || null,
                promotion: move.promotion || null,
                quality: 'unrated',
                eval: 0
            };
            state.addMoveToHistory(moveData);

            // Verificar estado del juego
            const gameOver = this.checkGameOver();

            return {
                success: true,
                move: move.san,
                fen: this.chess.fen(),
                gameOver: gameOver,
                moveData: moveData
            };
        } catch (error) {
            console.error('Error realizando movimiento:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Obtiene los movimientos legales para una posición
     * @param {string} square - Cuadrado (opcional, si se especifica solo devuelve moves de esa pieza)
     * @returns {array} Array de movimientos legales
     */
    getLegalMoves(square = null) {
        try {
            const moves = this.chess.moves({ verbose: true });

            if (square) {
                return moves.filter(m => m.from === square.toLowerCase());
            }

            return moves;
        } catch (error) {
            console.error('Error obteniendo movimientos legales:', error);
            return [];
        }
    }

    /**
     * Verifica si el juego terminó
     * @returns {object|null} Info del final (null si continúa)
     */
    checkGameOver() {
        if (!this.chess) return null;

        const isCheckmate = this.chess.in_checkmate();
        const isStalemate = this.chess.in_stalemate();
        const isDraw = this.chess.in_draw();

        if (isCheckmate) {
            const winner = this.chess.turn() === 'w' ? 'b' : 'w';
            audioSystem.playEnd();
            return {
                type: 'checkmate',
                winner: winner,
                message: 'Jaque mate'
            };
        }

        if (isStalemate) {
            audioSystem.playEnd();
            return {
                type: 'stalemate',
                result: 'draw',
                message: 'Tablas por ahogado'
            };
        }

        if (isDraw) {
            audioSystem.playEnd();
            return {
                type: 'draw',
                result: 'draw',
                message: 'Tablas'
            };
        }

        return null;
    }

    /**
     * Reproduce el sonido apropiado para un movimiento
     * @param {object} move - Objeto de movimiento
     */
    playMoveSound(move) {
        if (!state.isSoundOn()) return;

        if (move.captured) {
            audioSystem.playCapture();
        } else if (this.chess.in_check()) {
            audioSystem.playCheck();
        } else {
            audioSystem.playMove();
        }
    }

    /**
     * Inicia el reloj del juego
     */
    startClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }

        this.clockInterval = setInterval(() => {
            const currentTurn = this.chess.turn();
            const color = currentTurn === 'w' ? 'w' : 'b';

            state.decrementTime(color, 1);

            const time = state.getTime(color);
            if (time <= 0) {
                this.endGameByTime(color);
            }
        }, 1000);
    }

    /**
     * Detiene el reloj
     */
    stopClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }

    /**
     * Termina el juego por tiempo
     * @param {string} color - Color que agotó el tiempo
     */
    endGameByTime(color) {
        this.stopClock();
        const winner = color === 'w' ? 'b' : 'w';
        audioSystem.playEnd();

        debugLog('GameEngine', `Fin de juego por tiempo. Ganador: ${winner}`);

        return {
            type: 'time_up',
            winner: winner,
            loser: color,
            message: `Tiempo agotado para ${color === 'w' ? 'Blancas' : 'Negras'}`
        };
    }

    /**
     * Resigina el juego
     * @returns {object} Resultado
     */
    resign() {
        this.stopClock();
        const winner = state.getMyColor() === 'w' ? 'b' : 'w';

        audioSystem.playEnd();
        debugLog('GameEngine', 'Jugador se ha rendido');

        return {
            type: 'resignation',
            winner: winner,
            loser: state.getMyColor(),
            message: 'El jugador se ha rendido'
        };
    }

    /**
     * Ofrece tablas
     * @returns {object} Estado de la oferta
     */
    offerDraw() {
        return {
            type: 'draw_offer',
            from: state.getMyColor(),
            message: 'Se ofrece tablas'
        };
    }

    /**
     * Acepta oferta de tablas
     * @returns {object} Resultado
     */
    acceptDraw() {
        this.stopClock();
        audioSystem.playEnd();

        return {
            type: 'draw_agreed',
            result: 'draw',
            message: 'Tablas acordadas'
        };
    }

    /**
     * Deshace el último movimiento
     * @returns {object} Resultado
     */
    undoMove() {
        if (!this.chess) return { success: false };

        const move = this.chess.undo();
        if (move) {
            state.moveHistory.pop();
            return { success: true, move: move };
        }

        return { success: false, error: 'No hay movimientos para deshacer' };
    }

    /**
     * Obtiene el FEN actual
     * @returns {string} Notación FEN
     */
    getFen() {
        return this.chess ? this.chess.fen() : null;
    }

    /**
     * Obtiene el PGN del juego
     * @returns {string} Notación PGN
     */
    getPgn() {
        return this.chess ? this.chess.pgn() : null;
    }

    /**
     * Carga una posición desde FEN
     * @param {string} fen - Notación FEN
     * @returns {boolean} Éxito
     */
    loadFen(fen) {
        try {
            return this.chess.load(fen);
        } catch (error) {
            console.error('Error cargando FEN:', error);
            return false;
        }
    }

    /**
     * Obtiene el historial de movimientos en formato PGN
     * @returns {array} Array de movimientos
     */
    getMoveHistory() {
        return this.chess ? this.chess.moves({ verbose: true }) : [];
    }

    /**
     * Calcula el cambio de ELO después del juego
     * @param {number} playerElo - ELO del jugador
     * @param {number} opponentElo - ELO del oponente
     * @param {string} result - 'win', 'loss', 'draw'
     * @returns {object} Cambio de ELO
     */
    calculateEloChange(playerElo, opponentElo, result) {
        const resultValue = result === 'win' ? 1 : (result === 'draw' ? 0.5 : 0);
        return calculateEloChange(playerElo, opponentElo, resultValue);
    }

    /**
     * Verifica si hay jaque
     * @returns {boolean}
     */
    isInCheck() {
        return this.chess ? this.chess.in_check() : false;
    }

    /**
     * Obtiene la información del tablero actual
     * @returns {object} Información del tablero
     */
    getBoardState() {
        if (!this.chess) return null;

        return {
            fen: this.chess.fen(),
            turn: this.chess.turn(),
            inCheck: this.chess.in_check(),
            inCheckmate: this.chess.in_checkmate(),
            inStalemate: this.chess.in_stalemate(),
            moveCount: this.chess.moves().length,
            halfMoves: this.chess.history().length,
            legalMoves: this.getLegalMoves()
        };
    }

    /**
     * Genera un ID único para el juego
     * @returns {string} ID del juego
     */
    generateGameId() {
        return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Registra callbacks para eventos
     * @param {string} eventName - 'onMove', 'onGameOver', 'onClockUpdate'
     * @param {function} callback - Función a ejecutar
     */
    on(eventName, callback) {
        if (this.callbacks.hasOwnProperty(eventName)) {
            this.callbacks[eventName] = callback;
        }
        return this;
    }

    /**
     * Emite un evento
     * @param {string} eventName - Nombre del evento
     * @param {*} data - Datos del evento
     */
    emit(eventName, data) {
        if (this.callbacks[eventName] && typeof this.callbacks[eventName] === 'function') {
            this.callbacks[eventName](data);
        }
    }

    /**
     * Obtiene estadísticas de la partida
     * @returns {object} {totalMoves, captures, checks, evalHistory}
     */
    getGameStats() {
        if (!this.moveHistory || this.moveHistory.length === 0) {
            return {
                totalMoves: 0,
                captures: 0,
                checks: 0,
                duration: 0
            };
        }

        const captures = this.moveHistory.filter(m => m.captured).length;
        const checks = this.moveHistory.filter(m => m.san && m.san.includes('+')).length;
        const startTime = this.moveHistory[0].timestamp || Date.now();
        const endTime = this.moveHistory[this.moveHistory.length - 1].timestamp || Date.now();

        return {
            totalMoves: this.moveHistory.length,
            captures: captures,
            checks: checks,
            duration: Math.floor((endTime - startTime) / 1000)
        };
    }

    /**
     * Exporta el juego en formato PGN con metadatos
     * @param {object} metadata - {Event, Site, Date, White, Black, Result}
     * @returns {string} PGN completo
     */
    exportPgn(metadata = {}) {
        if (!this.chess) return '';

        const pgn = this.chess.pgn();
        const tags = {
            Event: metadata.Event || 'ChessTricks Game',
            Site: metadata.Site || 'https://chesstricks.local',
            Date: metadata.Date || new Date().toISOString().split('T')[0],
            White: metadata.White || 'Player',
            Black: metadata.Black || 'Opponent',
            Result: metadata.Result || '*',
            ...metadata
        };

        let pgnWithTags = '';
        for (const [key, value] of Object.entries(tags)) {
            pgnWithTags += `[${key} "${value}"]\n`;
        }
        pgnWithTags += `\n${pgn}`;

        return pgnWithTags;
    }

    /**
     * Valida una secuencia de movimientos (para puzzles/training)
     * @param {array} moves - Array de movimientos en notación SAN
     * @returns {object} {valid: boolean, errors: array}
     */
    validateMoveSequence(moves) {
        const errors = [];
        const tempFen = this.chess.fen();

        for (let i = 0; i < moves.length; i++) {
            const move = this.chess.move(moves[i], { sloppy: true });
            if (!move) {
                errors.push(`Movimiento ${i + 1}: "${moves[i]}" es inválido`);
            }
        }

        // Restaurar FEN original
        this.chess.load(tempFen);

        return {
            valid: errors.length === 0,
            errors: errors,
            totalMoves: moves.length
        };
    }

    /**
     * Obtiene los mejores movimientos según una evaluación
     * (Requiere integración con analysis.js)
     * @param {number} limit - Cantidad de movimientos a retornar
     * @returns {array} Array de movimientos ordenados por calidad
     */
    async getSuggestedMoves(limit = 3) {
        const legalMoves = this.getLegalMoves();
        // Esto se integrará con analysis.js cuando esté disponible
        return legalMoves.slice(0, limit);
    }

    /**
     * Obtiene el análisis de una posición específica
     * (Placeholder para integración con analysis.js)
     * @returns {promise} Datos de análisis
     */
    async analyzePosition() {
        debugLog('GameEngine', 'analyzePosition() requiere analysis.js');
        return null;
    }

    /**
     * Establece métodos de callback para eventos del reloj
     * @param {function} callback - Se ejecuta cada segundo
     */
    setClockUpdateCallback(callback) {
        this.on('onClockUpdate', callback);
        return this;
    }

    /**
     * Obtiene el estado serializado del juego para guardar/cargar
     * @returns {object} Estado completo
     */
    serialize() {
        return {
            gameId: this.gameId,
            fen: this.getFen(),
            pgn: this.getPgn(),
            moveHistory: this.moveHistory,
            isInitialized: this.isInitialized,
            stats: this.getGameStats()
        };
    }

    /**
     * Restaura el juego desde un estado serializado
     * @param {object} state - Estado previamente guardado
     * @returns {boolean} Éxito
     */
    deserialize(state) {
        if (!state.fen || !this.chess) return false;

        try {
            this.loadFen(state.fen);
            this.gameId = state.gameId;
            this.moveHistory = state.moveHistory || [];
            this.isInitialized = state.isInitialized;
            debugLog('GameEngine', 'Estado restaurado');
            return true;
        } catch (error) {
            console.error('Error restaurando estado:', error);
            return false;
        }
    }

    /**
     * Limpia recursos
     */
    dispose() {
        this.stopClock();
        this.chess = null;
        this.isInitialized = false;
        this.moveHistory = [];
        this.callbacks = {};
        debugLog('GameEngine', 'Recurso liberado');
    }
}

// Singleton
export const gameEngine = new GameEngine();

export default GameEngine;
