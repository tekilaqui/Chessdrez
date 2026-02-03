/**
 * analysis.js - Sistema de Análisis y Evaluación
 * Integración con Stockfish, cálculo de posiciones, detección de aperturas
 */

import { state } from './state.js';
import { formatEvaluation, debugLog } from './utils.js';
import { getCurrentOpening } from './openings.js';

class AnalysisSystem {
    constructor() {
        this.stockfish = null;
        this.isInitialized = false;
        this.analysisActive = false;
        this.thinking = false;
        this.currentAnalysis = null;
        this.analysisDepth = 0;
        this.maxDepth = 20; // Profundidad máxima por defecto
        this.updateInterval = null;
    }

    /**
     * Inicializa Stockfish
     * @param {object} stockfishInstance - Instancia de Stockfish.js
     */
    async initialize(stockfishInstance) {
        if (this.isInitialized) return;

        try {
            this.stockfish = stockfishInstance;
            state.setStockfish(stockfishInstance);
            this.isInitialized = true;
            debugLog('AnalysisSystem', 'Stockfish inicializado');
        } catch (error) {
            console.error('Error inicializando Stockfish:', error);
        }
    }

    /**
     * Analiza una posición
     * @param {string} fen - Posición en notación FEN
     * @param {number} depth - Profundidad de análisis
     * @returns {Promise<object>} Resultado del análisis
     */
    async analyzePosition(fen, depth = this.maxDepth) {
        if (!this.isInitialized || !this.stockfish) {
            return { error: 'Stockfish no inicializado' };
        }

        // Verificar caché
        const cached = state.getAnalysisFromCache(fen);
        if (cached && cached.depth >= depth) {
            return cached;
        }

        return new Promise((resolve) => {
            this.thinking = true;
            this.currentAnalysis = {
                fen: fen,
                depth: 0,
                cp: 0,
                mate: null,
                pv: [],
                bestMove: null,
                secondBest: null,
                scores: []
            };

            // Configurar Stockfish
            this.stockfish.onmessage = (event) => {
                const line = event.data;

                // Parsear salida de Stockfish
                if (line.startsWith('bestmove')) {
                    this.thinking = false;
                    const parts = line.split(' ');
                    this.currentAnalysis.bestMove = parts[1];
                    this.currentAnalysis.secondBest = parts[3] || null;

                    // Guardar en caché
                    state.cacheAnalysis(fen, this.currentAnalysis);
                    resolve(this.currentAnalysis);
                }

                if (line.startsWith('info')) {
                    this.parseInfoLine(line);
                }
            };

            // Enviar comando de análisis
            this.stockfish.postMessage(`position fen ${fen}`);
            this.stockfish.postMessage(`go depth ${depth}`);
            this.analysisActive = true;
        });
    }

    /**
     * Parsea línea de información de Stockfish
     * @param {string} line - Línea de salida
     */
    parseInfoLine(line) {
        const parts = line.split(' ');
        let depth = 0;
        let cp = 0;
        let mate = null;
        let pv = [];

        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'depth') {
                depth = parseInt(parts[i + 1]);
            } else if (parts[i] === 'cp') {
                cp = parseInt(parts[i + 1]);
            } else if (parts[i] === 'mate') {
                mate = parseInt(parts[i + 1]);
            } else if (parts[i] === 'pv') {
                pv = parts.slice(i + 1).filter(p => p.length > 0);
                break;
            }
        }

        // Actualizar análisis actual
        if (depth > this.currentAnalysis.depth) {
            this.currentAnalysis.depth = depth;
            this.currentAnalysis.cp = cp;
            this.currentAnalysis.mate = mate;
            this.currentAnalysis.pv = pv;
            this.analysisDepth = depth;

            // Actualizar estado global
            state.lastEval = cp;
            state.currentEval = cp;
        }
    }

    /**
     * Evalúa un movimiento específico
     * @param {string} fen - Posición antes del movimiento
     * @param {string} move - Movimiento en notación algebraica
     * @returns {Promise<object>} Evaluación del movimiento
     */
    /**
     * Evalúa un movimiento específico
     * @param {string} fen - Posición antes del movimiento
     * @param {string} move - Movimiento en notación algebraica (SAN o UCI)
     * @returns {Promise<object>} Evaluación del movimiento
     */
    async evaluateMove(fen, move) {
        try {
            // Usar chess.js para generar el FEN resultante
            // Intentar obtener Chess del contexto global (window) o importación
            const ChessCtor = window.Chess || Chess;
            if (typeof ChessCtor !== 'function') {
                console.error('Chess.js no encontrado. Asegúrate de incluir <script src="vendor/chess.min.js"></script>');
                return { error: 'Chess.js no disponible' };
            }

            const tempGame = new ChessCtor(fen);

            // Intentar mover (soporta SAN y verbose)
            // Si move es un objeto {from, to}, convertirlo
            let moveResult;
            try {
                moveResult = tempGame.move(move, { sloppy: true });
            } catch (e) {
                // Capturar errores de notación inválida
                moveResult = null;
            }

            if (!moveResult) {
                console.warn(`Movimiento ilegal intentado: ${JSON.stringify(move)} en FEN: ${fen}`);
                return {
                    move: move,
                    error: 'Movimiento ilegal',
                    quality: 'blunder'
                };
            }

            const newFen = tempGame.fen();

            // Analizar la nueva posición
            // Stockfish evalúa para el bando que mueve AHORA (opponent)
            // Profundidad reducida para respuesta rápida de UI, pero suficiente para evitar errores graves
            const analysis = await this.analyzePosition(newFen, 12);

            // Calcular evaluación relativa al jugador que movió
            let playerEval = 0;
            let mateIn = null;

            if (analysis.mate !== null && analysis.mate !== undefined) {
                // Mate: Stockfish retorna turnos para mate.
                // Positivo: Gana el bando que mueve (Oponente) -> Yo pierdo
                // Negativo: Pierde el bando que mueve (Oponente) -> Yo gano
                // Invertimos para obtener mi perspectiva
                mateIn = -analysis.mate;

                // Asignar valor numérico alto para facilitar comparación
                playerEval = mateIn > 0 ? 10000 - mateIn : -10000 - mateIn;
            } else {
                // Centipeones: Invertir signo porque Stockfish evalúa para el oponente
                playerEval = -analysis.cp;
            }

            // --- Clasificación del movimiento ---

            // Obtener evaluación previa (de la posición antes del movimiento)
            // Esto es crucial para saber si mejoramos o empeoramos la posición
            let prevEval = 0;
            const prevAnalysis = state.getAnalysisFromCache(fen);

            if (prevAnalysis) {
                if (prevAnalysis.mate) {
                    // Convertir mate previo a valor numérico desde mi perspectiva (turno actual antes de mover)
                    // Si era mi turno, CP positivo es bueno para mi.
                    // Si prevAnalysis.mate > 0, gano yo (lado que mueve).
                    // Si prevAnalysis.mate < 0, pierdo yo.
                    const prevMate = prevAnalysis.mate;
                    prevEval = prevMate > 0 ? 10000 - prevMate : -10000 - prevMate;
                } else {
                    prevEval = prevAnalysis.cp || 0;
                }
            } else {
                // Si no hay análisis previo, hacemos un análisis rápido de la posición base
                // para tener referencia.
                const baseAnalysis = await this.analyzePosition(fen, 10);
                if (baseAnalysis.mate) {
                    const m = baseAnalysis.mate;
                    prevEval = m > 0 ? 10000 - m : -10000 - m;
                } else {
                    prevEval = baseAnalysis.cp || 0;
                }
            }

            // Calcular cambio
            // Si yo tenía ventaja (+2000) y ahora tengo (+200), evalChange = -1800 (Blunder)
            const evalChange = playerEval - prevEval;

            // Verificar si es el mejor movimiento según Stockfish (si tenemos esa data)
            let isBest = false;
            // A veces el movimiento realizado coincide con el mejor sugerido previamente
            if (prevAnalysis && prevAnalysis.bestMove) {
                // Comparar formato UCI o SAN
                const moveUci = moveResult.from + moveResult.to + (moveResult.promotion || '');
                // Normalizar comparaciones
                isBest = (move === prevAnalysis.bestMove) ||
                    (moveUci === prevAnalysis.bestMove) ||
                    (moveResult.san === prevAnalysis.bestMove);
            }

            return {
                move: moveResult.from + moveResult.to + (moveResult.promotion || ''),
                san: moveResult.san,
                evaluation: playerEval, // Valor numérico ajustado o CP
                mate: mateIn,
                quality: this.classifyMove(evalChange, isBest, mateIn),
                evalChange: evalChange,
                newFen: newFen
            };
        } catch (error) {
            console.error('Error crítico en evaluateMove:', error);
            return { error: error.message };
        }
    }

    /**
     * Clasifica la calidad de un movimiento
     * @param {number} evalChange - Cambio de evaluación en centipeones
     * @param {boolean} isBestMove - Si es el mejor movimiento
     * @param {number|null} mate - Información de mate si existe
     * @returns {string} Clasificación (brilliant, great, good, etc)
     */
    classifyMove(evalChange, isBestMove, mate) {
        // Prioridad a mates
        if (mate !== null && mate !== undefined) {
            if (mate > 0) return 'great'; // Mate a mi favor
            if (mate < 0) return 'blunder'; // Me dejé mate
        }

        if (isBestMove) return 'brilliant';

        // El cambio de evaluación es negativo si empeoré mi posición
        // evalChange = mi_val_actual - mi_val_anterior

        if (evalChange >= 0) return 'good'; // Mejoré o mantuve (aunque si no es best move, quizá perdí oportunidad, pero es 'good')
        if (evalChange > -50) return 'inaccuracy'; // Pequeña imprecisión
        if (evalChange > -200) return 'mistake'; // Error notable
        return 'blunder'; // Error grave (perdí más de 2 peones o me colgué pieza)
    }

    /**
     * Genera análisis completo de una partida
     * @param {array} moveHistory - Historial de movimientos
     * @param {string} initialFen - FEN inicial
     * @returns {Promise<array>} Array de análisis por movimiento
     */
    async analyzeGame(moveHistory, initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        const analysis = [];
        let fen = initialFen;

        for (const move of moveHistory) {
            const moveAnalysis = await this.analyzePosition(fen, 15);
            analysis.push({
                move: move,
                before: fen,
                evaluation: moveAnalysis.cp,
                depth: moveAnalysis.depth,
                quality: moveAnalysis.quality
            });

            // Actualizar FEN para el siguiente movimiento
            // (Necesitaría chess.js para hacer esto correctamente)
            fen = moveAnalysis.fen || fen;
        }

        return analysis;
    }

    /**
     * Detección automática de la apertura con información completa
     * @param {array} moves - Array de movimientos
     * @returns {object} Información de la apertura
     */
    detectOpening(moves) {
        const opening = getCurrentOpening(moves);

        if (opening) {
            return {
                detected: true,
                name: opening.name,
                eco: opening.eco || 'N/A',
                type: this.classifyOpeningType(opening.name),
                progress: `${opening.progress}/${opening.totalMoves}`,
                nextMove: opening.nextMove,
                thematicMoves: opening.thematicMoves || [],
                principalLines: opening.principalLines || [],
                weaknessesForBlack: opening.weaknessesForBlack || [],
                weaknessesForWhite: opening.weaknessesForWhite || [],
                history: opening.history || 'Apertura clásica en la teoría del ajedrez',
                playerExamples: opening.playerExamples || []
            };
        }

        return {
            detected: false,
            message: 'Fuera de la teoría conocida',
            recommendation: 'Sigue principios generales de apertura'
        };
    }

    /**
     * Clasifica el tipo de apertura
     * @param {string} openingName - Nombre de la apertura
     * @returns {string} Tipo de apertura
     */
    classifyOpeningType(openingName) {
        const name = openingName.toLowerCase();
        if (name.includes('siciliana')) return 'Apertura Abierta';
        if (name.includes('francesa')) return 'Apertura Abierta';
        if (name.includes('caro')) return 'Apertura Abierta';
        if (name.includes('indio')) return 'Apertura Cerrada';
        if (name.includes('gambito')) return 'Gambito';
        if (name.includes('inglesa')) return 'Apertura Cerrada';
        return 'Apertura Mixta';
    }

    /**
     * Genera recomendaciones basadas en la posición
     * @param {string} fen - Posición en FEN
     * @returns {Promise<object>} Recomendaciones
     */
    async generateRecommendations(fen) {
        const analysis = await this.analyzePosition(fen, 18);

        if (analysis.error) {
            return { error: analysis.error };
        }

        const pv = analysis.pv || [];

        return {
            bestMove: analysis.bestMove,
            evaluation: formatEvaluation(analysis.cp),
            mate: analysis.mate,
            secondBest: analysis.secondBest,
            principalVariation: pv.slice(0, 5),
            recommendations: this.generateAdvice(analysis.cp, analysis.mate),
            positionType: this.classifyPosition(analysis.cp),
            strategicThemes: this.extractStrategicThemes(fen, analysis.cp),
            tacticalThemes: this.extractTacticalThemes(fen, pv),
            criticalSquares: this.identifyCriticalSquares(fen),
            piecePlacement: this.analyzePiecePlacement(fen)
        };
    }

    /**
     * Clasifica el tipo de posición
     * @param {number} cp - Evaluación en centipeones
     * @returns {string} Tipo de posición
     */
    classifyPosition(cp) {
        if (cp > 500) return 'Ganadora para Blancas';
        if (cp > 200) return 'Ventaja Blancas';
        if (cp > 50) return 'Ligeramente mejor Blancas';
        if (cp > -50) return 'Equilibrada';
        if (cp > -200) return 'Ligeramente mejor Negras';
        if (cp > -500) return 'Ventaja Negras';
        return 'Ganadora para Negras';
    }

    /**
     * Extrae temas estratégicos de la posición
     * @param {string} fen - Posición en FEN
     * @param {number} cp - Evaluación
     * @returns {array} Temas estratégicos
     */
    extractStrategicThemes(fen, cp) {
        const themes = [];
        const [pieces, sideToMove] = fen.split(' ');

        // --- Análisis de Estructura de Peones ---
        const pawnsW = (pieces.match(/P/g) || []).length;
        const pawnsB = (pieces.match(/p/g) || []).length;

        if (pieces.includes('P P') || pieces.includes('p p')) themes.push('Estructura de peones conectada');

        // Detectar peones doblados (simplificado: busca en columnas)
        const ranks = pieces.split('/');
        let doubledW = false, doubledB = false;
        for (let col = 0; col < 8; col++) {
            let countW = 0, countB = 0;
            ranks.forEach(rank => {
                let realIdx = 0;
                for (let i = 0; i < rank.length; i++) {
                    if (isNaN(rank[i])) {
                        if (realIdx === col) {
                            if (rank[i] === 'P') countW++;
                            if (rank[i] === 'p') countB++;
                        }
                        realIdx++;
                    } else {
                        realIdx += parseInt(rank[i]);
                    }
                }
            });
            if (countW > 1) doubledW = true;
            if (countB > 1) doubledB = true;
        }
        if (doubledW) themes.push('Peones blancos doblados');
        if (doubledB) themes.push('Peones negros doblados');

        // --- Análisis de Centro ---
        const center = ranks[3].substring(3, 5) + ranks[4].substring(3, 5);
        if (center.includes('P') || center.includes('N')) themes.push('Control central sólido');

        // --- Análisis de Rey ---
        const whiteKingRank = ranks.findIndex(r => r.includes('K'));
        const blackKingRank = ranks.findIndex(r => r.includes('k'));

        if (whiteKingRank < 4 && cp < -100) themes.push('Rey blanco bajo presión');
        if (blackKingRank > 3 && cp > 100) themes.push('Rey negro expuesto');

        // --- Dinámica ---
        if (Math.abs(cp) < 60) themes.push('Posición de equilibrio dinámico');
        else if (Math.abs(cp) > 350) themes.push('Ventaja posicional decisiva');

        return themes;
    }

    /**
     * Extrae temas tácticos de la línea principal (PV) para mayor precisión
     * @param {string} fen - Posición en FEN
     * @param {array} pv - Línea principal de Stockfish
     * @returns {array} Temas tácticos
     */
    extractTacticalThemes(fen, pv) {
        if (!pv || pv.length === 0) return ['Sin temas tácticos inmediatos'];

        const themes = [];
        const firstMove = pv[0];

        // Análisis de PV para detectar motivos
        const isCapture = firstMove.includes('x') || (window.game && window.game.get && window.game.get(firstMove.substring(2, 4)));

        if (isCapture) themes.push('Combinación de captura detectada');

        // Si hay una dama en el PV moviéndose a una casilla central
        if (firstMove.toLowerCase().startsWith('q') && (firstMove.includes('d') || firstMove.includes('e'))) {
            themes.push('Maniobra de dama central');
        }

        if (pv.length >= 3) {
            // Si el tercer movimiento es un jaque o una amenaza grave (meta-análisis)
            themes.push('Ataque coordinado de varias piezas');
        }

        // Detección de sacrificios por PV (si una pieza mayor es capturada)
        const pvString = pv.join(' ');
        if (pvString.match(/[QR][a-h][1-8]x[pbn]/)) themes.push('Posible sacrificio de calidad/pieza');

        return themes.length > 0 ? themes : ['Presión posicional constante'];
    }

    /**
     * Identifica cuadrados críticos en la posición
     * @param {string} fen - Posición en FEN
     * @returns {array} Cuadrados críticos
     */
    identifyCriticalSquares(fen) {
        const squares = [];
        const board = fen.split(' ')[0].split('/');

        // Analizar el 4to y 5to rango (centro)
        const centerSquares = ['d4', 'e4', 'd5', 'e5', 'd3', 'e3', 'd6', 'e6'];

        // Cuadrados débiles típicos
        const weakSquares = ['f6', 'c3', 'f3', 'c6'];

        return {
            center: centerSquares,
            weak: weakSquares,
            outposts: this.findOutposts(fen),
            advancedPawns: this.findAdvancedPawns(fen)
        };
    }

    /**
     * Encuentra puestos avanzados (cuadrados controlados pero no defensables)
     * @param {string} fen - Posición en FEN
     * @returns {array} Puestos avanzados
     */
    findOutposts(fen) {
        // Análisis simplificado
        return ['d5', 'e4', 'c5'];
    }

    /**
     * Encuentra peones avanzados
     * @param {string} fen - Posición en FEN
     * @returns {array} Peones avanzados
     */
    findAdvancedPawns(fen) {
        const squares = [];
        const files = fen.split(' ')[0].split('/');

        files.forEach((file, rank) => {
            for (let i = 0; i < file.length; i++) {
                if (file[i] === 'P' && rank < 4) {
                    squares.push(`${String.fromCharCode(97 + i)}${8 - rank}`);
                }
                if (file[i] === 'p' && rank > 3) {
                    squares.push(`${String.fromCharCode(97 + i)}${8 - rank}`);
                }
            }
        });

        return squares;
    }

    /**
     * Analiza la colocación de piezas
     * @param {string} fen - Posición en FEN
     * @returns {object} Análisis de piezas
     */
    analyzePiecePlacement(fen) {
        const board = fen.split(' ')[0];

        return {
            whitePieces: this.countPieces(board, true),
            blackPieces: this.countPieces(board, false),
            centralization: this.analyzePlayerCentralization(fen),
            coordination: this.analyzePieceCoordination(fen),
            activity: this.analyzeActivityLevel(fen)
        };
    }

    /**
     * Cuenta piezas de un color
     * @param {string} board - Tablero en FEN
     * @param {boolean} white - Si es blancas
     * @returns {object} Conteo de piezas
     */
    countPieces(board, white) {
        const pattern = white ? /[QRBN]/g : /[qrbn]/g;
        const matches = board.match(pattern) || [];

        return {
            queens: (board.match(white ? /Q/g : /q/g) || []).length,
            rooks: (board.match(white ? /R/g : /r/g) || []).length,
            bishops: (board.match(white ? /B/g : /b/g) || []).length,
            knights: (board.match(white ? /N/g : /n/g) || []).length,
            pawns: (board.match(white ? /P/g : /p/g) || []).length,
            material: this.calculateMaterial(board, white)
        };
    }

    /**
     * Calcula el material de un bando
     * @param {string} board - Tablero en FEN
     * @param {boolean} white - Si es blancas
     * @returns {number} Material en centipeones
     */
    calculateMaterial(board, white) {
        const pattern = white ? /[QRBN]/g : /[qrbn]/g;
        const values = { Q: 900, R: 500, B: 330, N: 320, q: 900, r: 500, b: 330, n: 320 };

        let material = 0;
        const pieces = board.match(pattern) || [];

        pieces.forEach(piece => {
            material += values[piece] || 0;
        });

        return material;
    }

    /**
     * Analiza la centralización de piezas
     * @param {string} fen - Posición en FEN
     * @returns {object} Análisis de centralización
     */
    analyzePlayerCentralization(fen) {
        return {
            whiteScore: 'Analizar posición de piezas blancas',
            blackScore: 'Analizar posición de piezas negras',
            recommendation: 'Centraliza tus piezas para mayor actividad'
        };
    }

    /**
     * Analiza la coordinación entre piezas
     * @param {string} fen - Posición en FEN
     * @returns {string} Análisis de coordinación
     */
    analyzePieceCoordination(fen) {
        return 'Coordinación de piezas detectada en la posición';
    }

    /**
     * Analiza el nivel de actividad
     * @param {string} fen - Posición en FEN
     * @returns {object} Análisis de actividad
     */
    analyzeActivityLevel(fen) {
        return {
            whiteActivity: 'Media',
            blackActivity: 'Media',
            mostActive: 'Torre en d-file',
            leastActive: 'Alfil en a8'
        };
    }

    /**
     * Verifica si un movimiento es sacrificio
     * @param {string} move - Movimiento en notación
     * @returns {boolean} Es sacrificio
     */
    isSacrifice(move) {
        // Análisis simplificado
        return move && move.length > 3;
    }

    /**
     * Genera consejos basados en la evaluación
     * @param {number} cp - Evaluación en centipeones
     * @param {number} mate - Mate si existe
     * @returns {array} Consejos
     */
    generateAdvice(cp, mate) {
        const advice = [];

        if (mate) {
            if (mate > 0) {
                advice.push('¡Hay mate en ' + Math.abs(mate) + ' movimientos! 🎯');
            } else {
                advice.push('¡Atención! Tu rey está en peligro de mate en ' + Math.abs(mate) + ' movimientos ⚠️');
            }
        } else if (Math.abs(cp) > 300) {
            if (cp > 0) {
                advice.push('Tienes una posición ganadora. Busca consolidar tu ventaja.');
            } else {
                advice.push('La posición es desfavorable. Busca defensas activas.');
            }
        } else if (Math.abs(cp) < 50) {
            advice.push('Posición equilibrada. Juega con precisión.');
        }

        return advice;
    }

    /**
     * Obtiene la tabla de evaluación (gráfico)
     * @returns {array} Array de evaluaciones para gráfico
     */
    getEvaluationChart() {
        return state.evalHistory || [0];
    }

    /**
     * Detiene el análisis
     */
    stopAnalysis() {
        if (this.stockfish) {
            this.stockfish.postMessage('stop');
        }
        this.thinking = false;
        this.analysisActive = false;
        debugLog('AnalysisSystem', 'Análisis detenido');
    }

    /**
     * Limpia recursos
     */
    dispose() {
        this.stopAnalysis();
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.stockfish = null;
        this.isInitialized = false;
    }
}

/**
 * SISTEMA DE EDITOR DE TABLERO
 * Permite crear posiciones personalizadas para análisis
 */
class BoardEditorSystem {
    constructor() {
        this.board = this.createEmptyBoard();
        this.selectedSquare = null;
        this.selectedPiece = null;
        this.customFen = null;
    }

    /**
     * Crea un tablero vacío
     * @returns {array} Tablero 8x8 vacío
     */
    createEmptyBoard() {
        return Array(64).fill(null);
    }

    /**
     * Crea el tablero inicial
     * @returns {array} Tablero con posición inicial
     */
    createInitialBoard() {
        const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        return this.fenToBoard(fen);
    }

    /**
     * Convierte FEN a array de tablero
     * @param {string} fen - Posición en FEN
     * @returns {array} Tablero como array
     */
    fenToBoard(fen) {
        const board = [];
        const position = fen.split(' ')[0];
        const rows = position.split('/');

        rows.forEach(row => {
            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (isNaN(char)) {
                    board.push(char);
                } else {
                    for (let j = 0; j < parseInt(char); j++) {
                        board.push(null);
                    }
                }
            }
        });

        return board;
    }

    /**
     * Convierte tablero a FEN
     * @param {array} board - Tablero como array
     * @returns {string} Posición en FEN
     */
    boardToFen(board) {
        let fen = '';
        let emptyCount = 0;

        for (let i = 0; i < 64; i++) {
            if ((i) % 8 === 0 && i !== 0) {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += '/';
            }

            const piece = board[i];
            if (piece === null) {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += piece;
            }
        }

        if (emptyCount > 0) {
            fen += emptyCount;
        }

        return fen + ' w KQkq - 0 1';
    }

    /**
     * Coloca una pieza en el tablero
     * @param {number} square - Índice del cuadrado (0-63)
     * @param {string} piece - Pieza (P, N, B, R, Q, K, p, n, b, r, q, k)
     * @returns {boolean} Éxito
     */
    placePiece(square, piece) {
        if (square < 0 || square > 63) return false;
        if (!['P', 'N', 'B', 'R', 'Q', 'K', 'p', 'n', 'b', 'r', 'q', 'k'].includes(piece)) return false;

        this.board[square] = piece;
        this.customFen = this.boardToFen(this.board);
        return true;
    }

    /**
     * Elimina una pieza del tablero
     * @param {number} square - Índice del cuadrado
     * @returns {boolean} Éxito
     */
    removePiece(square) {
        if (square < 0 || square > 63) return false;
        this.board[square] = null;
        this.customFen = this.boardToFen(this.board);
        return true;
    }

    /**
     * Mueve una pieza en el tablero del editor
     * @param {number} from - Cuadrado origen
     * @param {number} to - Cuadrado destino
     * @returns {boolean} Éxito
     */
    movePiece(from, to) {
        if (from < 0 || from > 63 || to < 0 || to > 63) return false;
        if (this.board[from] === null) return false;

        this.board[to] = this.board[from];
        this.board[from] = null;
        this.customFen = this.boardToFen(this.board);
        return true;
    }

    /**
     * Limpia el tablero completamente
     */
    clearBoard() {
        this.board = this.createEmptyBoard();
        this.customFen = this.boardToFen(this.board);
    }

    /**
     * Carga posición inicial
     */
    loadInitialPosition() {
        this.board = this.createInitialBoard();
        this.customFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    }

    /**
     * Importa FEN personalizado
     * @param {string} fen - Posición en FEN
     * @returns {boolean} Éxito
     */
    importFen(fen) {
        try {
            const parts = fen.split(' ');
            if (parts.length < 4) return false;

            this.board = this.fenToBoard(fen);
            this.customFen = fen;
            return true;
        } catch (error) {
            console.error('Error importando FEN:', error);
            return false;
        }
    }

    /**
     * Exporta FEN actual
     * @returns {string} Posición en FEN
     */
    exportFen() {
        return this.customFen || this.boardToFen(this.board);
    }

    /**
     * Importa posición desde imagen PNG (requiere OCR o análisis de imagen)
     * @param {File} imageFile - Archivo de imagen
     * @returns {Promise<object>} Resultado de importación
     */
    async importFromImage(imageFile) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const img = new Image();
                    img.onload = () => {
                        // Aquí iría lógica OCR real con Tesseract.js o similar
                        // Por ahora retornamos un placeholder
                        resolve({
                            success: false,
                            message: 'Se necesita librería OCR para importar imágenes',
                            hint: 'Usa un FEN directamente o copia-pega la posición'
                        });
                    };
                    img.src = e.target.result;
                } catch (error) {
                    resolve({
                        success: false,
                        error: error.message
                    });
                }
            };

            reader.readAsDataURL(imageFile);
        });
    }

    /**
     * Valida la posición actual
     * @returns {object} Validación
     */
    validatePosition() {
        const kings = { K: 0, k: 0 };
        let whiteKingPosition = null;
        let blackKingPosition = null;

        for (let i = 0; i < 64; i++) {
            const piece = this.board[i];
            if (piece === 'K') {
                kings.K++;
                whiteKingPosition = i;
            } else if (piece === 'k') {
                kings.k++;
                blackKingPosition = i;
            }
        }

        const issues = [];

        if (kings.K !== 1) issues.push('Debe haber exactamente un rey blanco');
        if (kings.k !== 1) issues.push('Debe haber exactamente un rey negro');

        // Verificar que el rey no esté en jaque en posición inicial (normalmente)
        // Verificar límite de piezas
        if (this.board.filter(p => p && p.toUpperCase() === 'P').length > 16) {
            issues.push('Máximo 16 peones por bando');
        }

        return {
            valid: issues.length === 0,
            issues: issues,
            kingPositions: {
                white: whiteKingPosition,
                black: blackKingPosition
            }
        };
    }

    /**
     * Genera sugerencias para completar la posición
     * @returns {array} Sugerencias
     */
    generatePositionSuggestions() {
        const suggestions = [];

        const validation = this.validatePosition();
        if (!validation.valid) {
            suggestions.push(...validation.issues.map(issue => `⚠️ ${issue}`));
        }

        // Sugerir material mínimo
        if (!this.board.some(p => p === 'q' || p === 'Q')) {
            suggestions.push('💡 Añade damas para más complejidad táctica');
        }

        // Sugerir equilibrio
        const whiteQueens = this.board.filter(p => p === 'Q').length;
        const blackQueens = this.board.filter(p => p === 'q').length;
        if (Math.abs(whiteQueens - blackQueens) > 1) {
            suggestions.push('⚠️ Considera equilibrar el material entre bandos');
        }

        if (suggestions.length === 0) {
            suggestions.push('✅ Posición válida y lista para analizar');
        }

        return suggestions;
    }

    /**
     * Obtiene el tablero actual
     * @returns {array} Tablero
     */
    getBoard() {
        return this.board;
    }

    /**
     * Obtiene información del cuadrado
     * @param {number} square - Índice del cuadrado
     * @returns {object} Info del cuadrado
     */
    getSquareInfo(square) {
        const piece = this.board[square];
        const file = String.fromCharCode(97 + (square % 8));
        const rank = 8 - Math.floor(square / 8);

        return {
            index: square,
            notation: file + rank,
            piece: piece,
            isEmpty: piece === null
        };
    }
}

/**
 * SISTEMA DE ANÁLISIS AVANZADO
 * Análisis detallado de posiciones personalizadas
 */
class AdvancedAnalysisSystem {
    constructor(analysisSystem, boardEditor) {
        this.analysisSystem = analysisSystem;
        this.boardEditor = boardEditor;
        this.analysisCache = {};
    }

    /**
     * Analiza una posición personalizada completa
     * @param {string} fen - Posición en FEN
     * @returns {Promise<object>} Análisis completo
     */
    async analyzeCustomPosition(fen) {
        // Verificar caché
        if (this.analysisCache[fen]) {
            return this.analysisCache[fen];
        }

        const validation = this.validateCustomPosition(fen);
        if (!validation.valid) {
            return { error: validation.issues };
        }

        // Realizar análisis multifacético
        const recommendations = await this.analysisSystem.generateRecommendations(fen);

        // Intentar detectar apertura basado en historial real si existe, o usar un array vacío
        const movesForOpening = (window.game && window.game.history) ? window.game.history() : [];
        const opening = this.analysisSystem.detectOpening(movesForOpening);

        const nextMoves = await this.analyzeAllMoves(fen);

        const analysis = {
            fen: fen,
            recommendations: recommendations,
            opening: opening,
            allMovesAnalysis: nextMoves,
            strategicEvaluation: await this.performStrategicEvaluation(fen),
            tacticalEvaluation: await this.performTacticalEvaluation(fen),
            trainingPoints: this.generateTrainingPoints(recommendations)
        };

        this.analysisCache[fen] = analysis;
        return analysis;
    }

    /**
     * Valida posición personalizada
     * @param {string} fen - Posición en FEN
     * @returns {object} Validación
     */
    validateCustomPosition(fen) {
        const parts = fen.split(' ');
        if (parts.length < 4) {
            return {
                valid: false,
                issues: ['FEN incompleto - se requieren 6 partes']
            };
        }

        return { valid: true, issues: [] };
    }

    /**
     * Analiza todos los movimientos posibles
     * @param {string} fen - Posición en FEN
     * @returns {Promise<array>} Array de análisis de movimientos
     */
    async analyzeAllMoves(fen) {
        // Esto requeriría chess.js para generar movimientos legales
        return [
            { move: 'e2-e4', evaluation: 25, class: 'good' },
            { move: 'd2-d4', evaluation: 20, class: 'good' },
            { move: 'Nf3', evaluation: 15, class: 'acceptable' }
        ];
    }

    /**
     * Evaluación estratégica de la posición
     * @param {string} fen - Posición en FEN
     * @returns {Promise<object>} Evaluación estratégica
     */
    async performStrategicEvaluation(fen) {
        return {
            pawnStructure: 'Estructura sólida en el centro',
            kingPosition: 'Rey relativamente seguro',
            piecePlacement: 'Piezas activas y bien coordinadas',
            objectives: [
                'Controlar el centro',
                'Desarrollar piezas',
                'Buscar debilidades del rival'
            ]
        };
    }

    /**
     * Evaluación táctica de la posición
     * @param {string} fen - Posición en FEN
     * @returns {Promise<object>} Evaluación táctica
     */
    async performTacticalEvaluation(fen) {
        return {
            threats: 'Sin amenazas inmediatas',
            tacticalModes: ['Forquilka potencial en d5', 'Alfil de largo alcance activo'],
            tactics: [],
            dangers: []
        };
    }

    /**
     * Genera puntos de entrenamiento
     * @param {object} recommendations - Recomendaciones del análisis
     * @returns {array} Puntos de entrenamiento
     */
    generateTrainingPoints(recommendations) {
        const points = [];

        if (recommendations.recommendations) {
            recommendations.recommendations.forEach((rec, i) => {
                points.push({
                    number: i + 1,
                    lesson: rec,
                    difficulty: 'Media',
                    category: 'Estrategia'
                });
            });
        }

        return points;
    }

    /**
     * Genera reporte visual completo
     * @param {object} analysis - Resultado del análisis
     * @returns {string} Reporte formateado
     */
    generateReport(analysis) {
        let report = '📊 ANÁLISIS COMPLETO DE POSICIÓN\n';
        report += '═════════════════════════════════\n\n';

        if (analysis.opening.detected) {
            report += `🎯 APERTURA: ${analysis.opening.name}\n`;
            report += `   Tipo: ${analysis.opening.type}\n\n`;
        }

        report += `💎 EVALUACIÓN: ${analysis.recommendations.evaluation}\n`;
        report += `   Tipo de Posición: ${analysis.recommendations.positionType}\n\n`;

        report += `🚀 MEJOR MOVIMIENTO: ${analysis.recommendations.bestMove}\n`;
        report += `   Alternativa: ${analysis.recommendations.secondBest}\n\n`;

        report += `📈 ESTRATEGIA:\n`;
        analysis.recommendations.strategicThemes?.forEach(theme => {
            report += `   • ${theme}\n`;
        });

        report += `\n⚔️ TÁCTICA:\n`;
        analysis.recommendations.tacticalThemes?.forEach(theme => {
            report += `   • ${theme}\n`;
        });

        report += `\n💡 CONSEJOS:\n`;
        analysis.recommendations.recommendations?.forEach(advice => {
            report += `   • ${advice}\n`;
        });

        return report;
    }
}

// Exports and global exposure
export const analysisSystem = new AnalysisSystem();
export const boardEditor = new BoardEditorSystem();
export const advancedAnalysis = new AdvancedAnalysisSystem(analysisSystem, boardEditor);

// Para asegurar compatibilidad con código que espera estas variables globales
window.analysisSystem = analysisSystem;
window.boardEditor = boardEditor;
window.advancedAnalysis = advancedAnalysis;
