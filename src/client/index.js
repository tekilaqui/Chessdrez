/**
 * index.js - Entry Point del Cliente Refactorizado
 * Inicializa y coordina todos los módulos del cliente de ajedrez
 */

// Importar todos los módulos
import { state } from './state.js';
import { utils, formatTime, calculateEloChange, debugLog } from './utils.js';
import { LANGS, COACH_TEMPLATES, QUALITY_MAP, DEFAULT_SETTINGS } from './constants.js';
import { audioSystem } from './audioSystem.js';
import { academy } from './academy.js';
import { initializeOpenings, findOpening, validateMovesAgainstTheory } from './openings.js';
import { gameEngine } from './gameEngine.js';
import { analysisSystem } from './analysis.js';
import { puzzleSystem } from './puzzleSystem.js';
import { uiSystem } from './ui.js';

/**
 * ClientApp - Aplicación principal del cliente
 * Coordina todos los módulos
 */
class ClientApp {
    constructor() {
        this.initialized = false;
        this.game = null;
        this.analysis = null;
        this.ui = null;
    }

    /**
     * Inicializa la aplicación completa
     * @param {object} config - Configuración inicial
     */
    async initialize(config = {}) {
        try {
            debugLog('ClientApp', 'Iniciando aplicación...');

            // 1. Restaurar preferencias del usuario
            this.restoreUserPreferences();

            // 2. Inicializar UI
            uiSystem.initialize('board');
            this.ui = uiSystem;

            // 3. Inicializar sistema de sonidos
            await audioSystem.initialize();

            // 4. Cargar datos (si están disponibles)
            if (window.OPENINGS_DATA) {
                initializeOpenings(window.OPENINGS_DATA);
            }

            if (window.PUZZLES_DATA) {
                puzzleSystem.loadPuzzles(window.PUZZLES_DATA);
            }

            // 5. Inicializar Stockfish si existe
            if (window.Stockfish) {
                await analysisSystem.initialize(new window.Stockfish());
            }

            // 6. Configurar event listeners
            this.setupEventListeners();

            // 7. Cargar Academia
            const currentLesson = academy.getCurrentLesson();
            if (currentLesson) {
                debugLog('ClientApp', `Lección actual: ${currentLesson.title}`);
            }

            this.initialized = true;
            debugLog('ClientApp', '✅ Aplicación inicializada correctamente');

            return true;
        } catch (error) {
            console.error('❌ Error inicializando aplicación:', error);
            return false;
        }
    }

    /**
     * Restaura preferencias del usuario desde localStorage
     */
    restoreUserPreferences() {
        const lang = localStorage.getItem('chess_lang') || DEFAULT_SETTINGS.lang;
        const soundOn = localStorage.getItem('chess_sound') !== 'false';

        state.setLanguage(lang);
        state.setSoundOn(soundOn);
        audioSystem.setEnabled(soundOn);

        debugLog('ClientApp', `Preferencias restauradas: ${lang}, Sonido: ${soundOn ? 'ON' : 'OFF'}`);
    }

    /**
     * Configura event listeners globales
     */
    setupEventListeners() {
        // Listener para cambio de modo
        document.addEventListener('game-mode-change', (e) => {
            const mode = e.detail.mode;
            this.startNewGame({ mode });
        });

        // Listener para movimientos
        document.addEventListener('move-made', (e) => {
            const { from, to, promotion } = e.detail;
            this.handleMove(from, to, promotion);
        });

        // Listener para sonidos
        document.addEventListener('toggle-sound', () => {
            audioSystem.toggle();
        });

        // Listener para idioma
        document.addEventListener('language-change', (e) => {
            state.setLanguage(e.detail.lang);
            this.updateLanguageUI(e.detail.lang);
        });

        debugLog('ClientApp', 'Event listeners configurados');
    }

    /**
     * Inicia un nuevo juego
     * @param {object} config - Configuración del juego
     */
    startNewGame(config = {}) {
        try {
            if (!gameEngine.chess) {
                console.error('❌ Chess.js no inicializado');
                return;
            }

            const gameConfig = {
                mode: config.mode || 'local',
                timeControl: config.timeControl || DEFAULT_SETTINGS.timeControl || 600,
                playerColor: config.playerColor || 'w',
                opponentLevel: config.opponentLevel || 5
            };

            const result = gameEngine.initializeGame(gameConfig);
            state.setGameId(result.gameId);

            // Inicializar UI
            this.ui.updateGameInfo({
                mode: result.mode,
                turn: 'w',
                whiteElo: config.whiteElo,
                blackElo: config.blackElo
            });

            // Iniciar reloj si hay control de tiempo
            if (gameConfig.timeControl > 0) {
                gameEngine.startClock();
            }

            this.ui.showToast(`Nuevo juego: ${result.mode}`, 'info');
            debugLog('ClientApp', `Nuevo juego iniciado: ${result.mode}`);

            return result;
        } catch (error) {
            console.error('Error iniciando juego:', error);
            this.ui.showToast('Error al iniciar juego', 'error');
        }
    }

    /**
     * Maneja un movimiento
     * @param {string} from - Cuadrado origen
     * @param {string} to - Cuadrado destino
     * @param {object} promotion - Promoción si aplica
     */
    handleMove(from, to, promotion = null) {
        try {
            const result = gameEngine.makeMove(from, to, promotion);

            if (result.success) {
                // Actualizar UI
                this.ui.updateBoard(result.moveData);
                this.ui.updateMoveHistory(state.getMoveHistory());

                // Verificar fin del juego
                if (result.gameOver) {
                    this.handleGameOver(result.gameOver);
                    return;
                }

                // Iniciar análisis si está activo
                if (state.isAnalysisActive()) {
                    this.startAnalysis(result.fen);
                }

                // Detectar apertura
                const opening = findOpening(state.getMoveHistory().map(m => m.move));
                if (opening) {
                    this.ui.showToast(`Apertura: ${opening.name}`, 'info', 2000);
                }

                document.dispatchEvent(new CustomEvent('move-completed', { detail: result }));
            } else {
                this.ui.showToast(result.error, 'error');
                debugLog('ClientApp', `Movimiento inválido: ${result.error}`);
            }
        } catch (error) {
            console.error('Error en movimiento:', error);
            this.ui.showToast('Error procesando movimiento', 'error');
        }
    }

    /**
     * Inicia análisis de la posición
     * @param {string} fen - Posición en FEN
     */
    async startAnalysis(fen) {
        if (!analysisSystem.isInitialized) return;

        state.setAnalysisActive(true);

        const analysis = await analysisSystem.analyzePosition(fen, 18);
        this.ui.updateEvaluation(analysis.cp, analysis.depth);

        // Dibujar flecha del mejor movimiento
        if (analysis.bestMove) {
            const from = analysis.bestMove.substring(0, 2);
            const to = analysis.bestMove.substring(2, 4);
            this.ui.drawArrow(from, to, { color: '#00d084', alpha: 0.6 });
        }

        document.dispatchEvent(new CustomEvent('analysis-updated', { detail: analysis }));
    }

    /**
     * Maneja el fin del juego
     * @param {object} gameOverInfo - Información del fin del juego
     */
    handleGameOver(gameOverInfo) {
        gameEngine.stopClock();
        state.setGameMode('view');

        const message = gameOverInfo.message || 'Fin del juego';
        this.ui.showToast(message, 'info', 5000);

        const buttons = [
            {
                label: 'Nueva partida',
                callback: () => this.startNewGame(),
                style: 'primary'
            },
            {
                label: 'Analizar',
                callback: () => this.analyzeCurrentGame(),
                style: 'secondary'
            }
        ];

        this.ui.showModal('Fin de la Partida', message, buttons);

        debugLog('ClientApp', `Fin del juego: ${gameOverInfo.type}`);
    }

    /**
     * Analiza la partida completa
     */
    async analyzeCurrentGame() {
        const moveHistory = state.getMoveHistory();
        if (moveHistory.length === 0) return;

        this.ui.showToast('Analizando partida...', 'info');
        // Aquí iría el análisis completo
    }

    /**
     * Inicia modo de puzzles
     * @param {object} config - Configuración
     */
    startPuzzleMode(config = {}) {
        state.setGameMode('exercises');

        const puzzle = config.puzzle || puzzleSystem.getRandomPuzzle();
        if (!puzzle) {
            this.ui.showToast('No hay puzzles disponibles', 'error');
            return;
        }

        const result = puzzleSystem.startPuzzle(puzzle);
        this.ui.showToast(`Puzzle: ${result.themes_es}`, 'info');

        debugLog('ClientApp', 'Modo puzzle iniciado');

        return result;
    }

    /**
     * Maneja un movimiento en puzzle
     * @param {string} move - Movimiento
     */
    handlePuzzleMove(move) {
        const result = puzzleSystem.validatePuzzleMove(move);

        if (result.complete) {
            this.ui.showToast('¡Puzzle resuelto! 🎉', 'success');
            puzzleSystem.endPuzzle('solved');
        } else if (!result.correct) {
            this.ui.showToast(result.message, 'error');
        }

        document.dispatchEvent(new CustomEvent('puzzle-move', { detail: result }));
    }

    /**
     * Inicia modo Academia
     */
    startAcademyMode() {
        state.setGameMode('academy');

        const lesson = academy.getCurrentLesson();
        if (!lesson) {
            this.ui.showToast('Academia completada! 🏆', 'success');
            return;
        }

        this.ui.showToast(`Lección: ${lesson.title}`, 'info');
        debugLog('ClientApp', `Lección iniciada: ${lesson.title}`);

        return lesson;
    }

    /**
     * Completa una lección
     * @param {number} lessonId - ID de la lección
     */
    completeLessonAcademy(lessonId) {
        const result = academy.completeLesson(lessonId);

        if (result.levelCompleted) {
            this.ui.showToast(result.message, 'success', 4000);
        } else {
            this.ui.showToast('Lección completada', 'success', 2000);
        }

        return result;
    }

    /**
     * Actualiza la UI según el idioma
     * @param {string} lang - Código de idioma
     */
    updateLanguageUI(lang) {
        // Aquí iría la lógica para actualizar todos los textos
        debugLog('ClientApp', `Idioma cambiado a: ${lang}`);
        document.dispatchEvent(new CustomEvent('language-updated', { detail: { lang } }));
    }

    /**
     * Obtiene el estado actual de la aplicación
     * @returns {object} Estado
     */
    getAppState() {
        return {
            mode: state.getGameMode(),
            gameId: state.getGameId(),
            initialized: this.initialized,
            analysis: analysisSystem.isInitialized,
            soundOn: state.isSoundOn(),
            language: state.getLanguage(),
            academyLevel: state.getAcademyLevel(),
            puzzleElo: puzzleSystem.userPuzzleElo
        };
    }

    /**
     * Exporta datos del usuario
     * @returns {object} Datos exportables
     */
    exportUserData() {
        return {
            state: state.toJSON(),
            puzzle: puzzleSystem.exportStats(),
            academy: academy.exportData(),
            preferences: {
                language: state.getLanguage(),
                sound: state.isSoundOn()
            }
        };
    }

    /**
     * Limpia recursos
     */
    dispose() {
        gameEngine.dispose();
        analysisSystem.dispose();
        audioSystem.dispose();
        uiSystem.dispose();
        this.initialized = false;
        debugLog('ClientApp', 'Aplicación limpiada');
    }
}

// Instancia global singleton
export const app = new ClientApp();

// Exportar todos los módulos para uso externo
export {
    state,
    gameEngine,
    analysisSystem,
    puzzleSystem,
    audioSystem,
    academy,
    uiSystem,
    LANGS,
    COACH_TEMPLATES,
    QUALITY_MAP,
    DEFAULT_SETTINGS,
    formatTime,
    calculateEloChange,
    debugLog
};

export default app;
