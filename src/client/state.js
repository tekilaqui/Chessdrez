/**
 * state.js - GameState Singleton
 * Gestiona el estado global del juego de forma centralizada
 * Proporciona getters/setters para evitar mutaciones directas
 */

class GameState {
    constructor() {
        // GAME IDENTITY
        this.gameId = null;
        this.currentMode = 'local'; // local, online, ai, exercises, analysis, academy
        this.myColor = 'w'; // 'w' or 'b'

        // BOARD STATE
        this.selectedSquare = null;
        this.hintsActive = false;
        this.analysisActive = false;

        // AI & OPPONENT
        this.aiThinking = false;
        this.opponentAutoMode = true;
        this.aiLevel = 5; // 1-8

        // CLOCK & TIMING
        this.gameStarted = false;
        this.whiteTime = 600; // seconds (10 minutes default)
        this.blackTime = 600;
        this.clockInterval = null;

        // PUZZLE STATE
        this.currentPuzzle = null;
        this.puzzleStep = 0;
        this.puzSeconds = 0;
        this.puzTimerInterval = null;
        this.isDailyPuzzle = false;

        // HISTORY & ANALYSIS
        this.moveHistory = []; // [{fen, move, cp, diff, quality}]
        this.historyPositions = ['start'];
        this.currentHistoryIndex = 0;
        this.moveQualityHistory = [];
        this.evalHistory = [0];

        // ACADEMY
        this.academyLevel = parseInt(localStorage.getItem('chess_academy_level')) || 0;
        this.currentAcademyLevelIndex = 0;
        this.currentAcademyPuzzleIndex = 0;
        this.academyInProgress = false;

        // LANGUAGE & PREFERENCES
        this.currentLang = localStorage.getItem('chess_lang') || 'es';
        this.soundOn = localStorage.getItem('chess_sound') !== 'false';

        // ANALYSIS & EVALUATION
        this.lastEval = undefined;
        this.currentEval = undefined;
        this.analysisCache = new Map(); // FEN -> Analysis results

        // STOCKFISH
        this.stockfish = null;
        this.lastAIProcessedMove = null;
    }

    // ==================== GETTERS ====================

    getGameMode() {
        return this.currentMode;
    }

    getMyColor() {
        return this.myColor;
    }

    getGameId() {
        return this.gameId;
    }

    getSelectedSquare() {
        return this.selectedSquare;
    }

    isAIThinking() {
        return this.aiThinking;
    }

    isAnalysisActive() {
        return this.analysisActive;
    }

    getHints() {
        return this.hintsActive;
    }

    getCurrentPuzzle() {
        return this.currentPuzzle;
    }

    getPuzzleStep() {
        return this.puzzleStep;
    }

    getTime(color) {
        return color === 'w' ? this.whiteTime : this.blackTime;
    }

    getAcademyLevel() {
        return this.academyLevel;
    }

    getMoveHistory() {
        return this.moveHistory;
    }

    getHistoryPositions() {
        return this.historyPositions;
    }

    getCurrentHistoryIndex() {
        return this.currentHistoryIndex;
    }

    getLanguage() {
        return this.currentLang;
    }

    isSoundOn() {
        return this.soundOn;
    }

    // ==================== SETTERS ====================

    setGameMode(mode) {
        this.currentMode = mode;
    }

    setMyColor(color) {
        this.myColor = color;
    }

    setGameId(id) {
        this.gameId = id;
    }

    setSelectedSquare(square) {
        this.selectedSquare = square;
    }

    setAIThinking(thinking) {
        this.aiThinking = thinking;
    }

    setAnalysisActive(active) {
        this.analysisActive = active;
    }

    setHints(active) {
        this.hintsActive = active;
    }

    setCurrentPuzzle(puzzle) {
        this.currentPuzzle = puzzle;
        this.puzzleStep = 0;
    }

    setPuzzleStep(step) {
        this.puzzleStep = step;
    }

    setTime(color, time) {
        if (color === 'w') {
            this.whiteTime = time;
        } else {
            this.blackTime = time;
        }
    }

    decrementTime(color, seconds = 1) {
        if (color === 'w') {
            this.whiteTime = Math.max(0, this.whiteTime - seconds);
        } else {
            this.blackTime = Math.max(0, this.blackTime - seconds);
        }
    }

    setAcademyLevel(level) {
        this.academyLevel = level;
        localStorage.setItem('chess_academy_level', level.toString());
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('chess_lang', lang);
    }

    setSoundOn(on) {
        this.soundOn = on;
        localStorage.setItem('chess_sound', on ? 'true' : 'false');
    }

    setStockfish(stockfish) {
        this.stockfish = stockfish;
    }

    // ==================== HISTORY MANAGEMENT ====================

    addMoveToHistory(moveData) {
        this.moveHistory.push(moveData);
        this.currentHistoryIndex = this.moveHistory.length - 1;
    }

    recordHistoryState(fen) {
        this.historyPositions.push(fen);
    }

    addQualityToHistory(quality) {
        this.moveQualityHistory.push(quality);
    }

    addEvalToHistory(evaluation) {
        this.evalHistory.push(evaluation);
    }

    // ==================== ANALYSIS ====================

    cacheAnalysis(fen, result) {
        this.analysisCache.set(fen, result);
    }

    getAnalysisFromCache(fen) {
        return this.analysisCache.get(fen);
    }

    clearAnalysisCache() {
        this.analysisCache.clear();
    }

    // ==================== RESET ====================

    resetForNewGame() {
        this.gameId = null;
        this.selectedSquare = null;
        this.moveHistory = [];
        this.historyPositions = ['start'];
        this.currentHistoryIndex = 0;
        this.moveQualityHistory = [];
        this.evalHistory = [0];
        this.aiThinking = false;
        this.lastEval = undefined;
        this.currentEval = undefined;
        this.analysisCache.clear();
    }

    resetForNewPuzzle() {
        this.currentPuzzle = null;
        this.puzzleStep = 0;
        this.puzSeconds = 0;
        this.selectedSquare = null;
        this.moveHistory = [];
        this.evalHistory = [0];
    }

    // ==================== PERSISTENCE ====================

    toJSON() {
        return {
            gameId: this.gameId,
            currentMode: this.currentMode,
            myColor: this.myColor,
            moveHistory: this.moveHistory,
            evalHistory: this.evalHistory,
            moveQualityHistory: this.moveQualityHistory,
            whiteTime: this.whiteTime,
            blackTime: this.blackTime,
            academyLevel: this.academyLevel,
            currentLang: this.currentLang,
            soundOn: this.soundOn
        };
    }

    fromJSON(data) {
        Object.assign(this, data);
    }
}

// Singleton instance
export const state = new GameState();

// Export class for testing
export default GameState;
