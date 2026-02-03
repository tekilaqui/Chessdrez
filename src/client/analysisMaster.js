import { debugLog, formatEvaluation } from './utils.js';
import { analysisSystem, advancedAnalysis, boardEditor } from './analysis.js';
import { trickDetector } from './trickDetector.js';

class AnalysisMaster {
    constructor() {
        this.conversationHistory = [];
        this.currentTopic = null;
        this.complexity = 'intermediate'; // beginner, intermediate, advanced
        this.language = 'es'; // español
    }

    /**
     * Explica una posición como lo haría un maestro
     * @param {string} fen - Posición en FEN
     * @returns {Promise<string>} Explicación del maestro
     */
    async explainPosition(fen) {
        const [analysis, trick] = await Promise.all([
            advancedAnalysis.analyzeCustomPosition(fen),
            trickDetector.detect(fen, (window.game && window.game.history()) || [])
        ]);

        if (!analysis || analysis.error) {
            return "⚠️ El maestro está calculando la posición. Realiza un movimiento o espera unos segundos.";
        }

        let explanation = '';

        // Parte 1: Evaluación general
        explanation += this.generateGeneralEvaluation(analysis);

        // Parte 1.5: ALERTA DE TRAMPAS/TRUCOS (Si existen)
        if (trick) {
            explanation += `\n\n════════════════════════════════════\n`;
            explanation += `🔥 ALERTA DE TRAMPA: ${trick.name}\n`;
            explanation += `💬 ${trick.message}\n`;
            explanation += `💡 Consejo: ${trick.advice}\n`;
            explanation += `════════════════════════════════════\n`;
        }

        // Parte 2: Análisis de la apertura (si está dentro de la teoría)
        if (analysis.opening && analysis.opening.detected) {
            explanation += '\n\n' + this.explainOpening(analysis.opening);
        }

        // Parte 3: Análisis estratégico
        explanation += '\n\n' + this.explainStrategy(analysis);

        // Parte 4: Análisis táctico
        explanation += '\n\n' + this.explainTactics(analysis);

        // Parte 5: Recomendaciones
        explanation += '\n\n' + this.explainRecommendations(analysis);

        // Parte 6: Puntos clave para recordar
        explanation += '\n\n' + this.generateKeyLearnings(analysis);

        this.conversationHistory.push({
            type: 'master_explanation',
            fen: fen,
            content: explanation,
            timestamp: Date.now()
        });

        return explanation;
    }

    /**
     * Obtiene solo un resumen corto (preview) para la UI principal
     */
    async getPreviewAnalysis(fen) {
        const [analysis, trick] = await Promise.all([
            advancedAnalysis.analyzeCustomPosition(fen),
            trickDetector.detect(fen, (window.game && window.game.history()) || [])
        ]);

        if (!analysis || analysis.error) return "Calculando...";

        const opinion = this.getMasterOpinion(analysis);

        if (trick) {
            return `🔥 ¡CUIDADO! ${trick.name}. ${opinion}`;
        }

        return opinion;
    }

    /**
     * Genera evaluación general de la posición
     * @param {object} analysis - Análisis de la posición
     * @returns {string} Evaluación general
     */
    generateGeneralEvaluation(analysis) {
        const recommendations = analysis.recommendations || {};
        const evaluation = recommendations.evaluation || '0.0';
        const positionType = recommendations.positionType || 'Posición por analizar';
        const masterOpinion = this.getMasterOpinion(analysis);

        return `🎓 OPINIÓN DEL MAESTRO

"${masterOpinion}"

📊 Evaluación: ${evaluation}
   Tipo: ${positionType}
   Material: ${this.evaluateMaterialBalance(analysis)}`;
    }

    /**
     * Obtiene la opinión del maestro basada en la heurística avanzada
     * @param {object} analysis - Análisis completo
     * @returns {string} Opinión personalizada
     */
    getMasterOpinion(analysis) {
        const recommendations = analysis.recommendations || {};
        const evaluation = recommendations.evaluation || '0.0';
        const strategicThemes = recommendations.strategicThemes || [];
        const piecePlacement = recommendations.piecePlacement || {};

        // Extraer CP manejando caso mate
        let cp = 0;
        if (evaluation.includes('#')) {
            cp = evaluation.includes('-') ? -9999 : 9999;
        } else {
            cp = parseInt(evaluation.replace(/[^0-9.-]/g, '')) || 0;
        }

        // Determinar fase del juego por cantidad de piezas
        const pieces = (analysis.fen.split(' ')[0].match(/[rnbq]/gi) || []).length;
        const isEndgame = pieces <= 8;
        const fullMoveNumber = parseInt(analysis.fen.split(' ')[5]) || 1;
        const isOpening = fullMoveNumber <= 10;

        let tone = "";
        if (isOpening) tone = "Estamos en la fase inicial. ";
        else if (isEndgame) tone = "En el final, la precisión es absoluta. ";
        else tone = "La posición requiere un plan sólido. ";

        // Lógica de ventaja/desventaja dinámica
        if (evaluation.includes('#')) {
            if (cp > 0) return "¡Victoria a la vista! Tienes mate forzado. No te precipites y remata con calma.";
            return "Peligro máximo: el rival tiene mate forzado. Busca la defensa más tenaz.";
        }

        if (strategicThemes.some(t => t.includes('Rey') && t.includes('presión'))) {
            return tone + "¡Cuidado! Tu rey está bajo una presión peligrosa. Prioriza la seguridad antes que el material.";
        }

        if (strategicThemes.some(t => t.includes('Rey') && t.includes('expuesto'))) {
            return tone + "El rey rival está vulnerable. Es el momento de lanzar un ataque decisivo.";
        }

        if (Math.abs(cp) < 50) {
            return tone + "La igualdad es casi total. Busca mejorar la coordinación de tus piezas menos activas.";
        }

        if (cp > 50 && cp < 150) return tone + "Las blancas tienen una ligera iniciativa. Mantén el control del centro.";
        if (cp < -50 && cp > -150) return tone + "Las negras están un poco mejor. Sigue presionando sobre sus debilidades.";

        if (cp >= 150 && cp < 400) return tone + "Ventaja blanca clara. El oponente empieza a sufrir, busca simplificar hacia un final ganador.";
        if (cp <= -150 && cp > -400) return tone + "Las negras dominan. Tienes una posición muy prometedora, no cedas la iniciativa.";

        if (cp >= 400) return "Dominio total de las blancas. La victoria está cerca, solo falta técnica para convertir la ventaja.";
        if (cp <= -400) return "Posición desesperada para las blancas. Tienes que buscar algún truco táctico o esperar un error grave.";

        return tone + "Analiza los puntos de ruptura y mantén tus piezas activas.";
    }

    /**
     * Evalúa el balance de material
     * @param {object} analysis - Análisis
     * @returns {string} Balance de material
     */
    evaluateMaterialBalance(analysis) {
        const white = analysis.recommendations.piecePlacement?.whitePieces?.material || 39;
        const black = analysis.recommendations.piecePlacement?.blackPieces?.material || 39;
        const diff = white - black;

        if (Math.abs(diff) < 5) {
            return '⚖️ Equilibrado';
        } else if (diff > 0) {
            return `✅ Blancas +${diff}cp`;
        } else {
            return `✅ Negras +${Math.abs(diff)}cp`;
        }
    }

    /**
     * Explica la apertura
     * @param {object} opening - Información de la apertura
     * @returns {string} Explicación de la apertura
     */
    explainOpening(opening) {
        let explanation = `🎯 APERTURA: ${opening.name}
   
Código ECO: ${opening.eco}
Tipo: ${opening.type}
Teoría: ${opening.progress} movimientos dentro de la teoría conocida

📖 Historia y Concepto:
${opening.history || 'Apertura clásica con objetivos posicionales claros.'}

🎓 Objetivos Principales:
${this.generateOpeningObjectives(opening.name)}

💡 Movimientos Temáticos:
${opening.thematicMoves?.slice(0, 3).join(', ') || 'Desarrollo de piezas y control del centro'}

⚠️ Debilidades Potenciales:
• Para Blancas: ${opening.weaknessesForWhite?.join(', ') || 'Rey en el centro'}
• Para Negras: ${opening.weaknessesForBlack?.join(', ') || 'Falta de espacio'}

📚 Grandes Maestros que la juegan:
${opening.playerExamples?.slice(0, 3).join(', ') || 'Varios grandes maestros'}`;

        return explanation;
    }

    /**
     * Genera objetivos de la apertura según el nombre
     * @param {string} openingName - Nombre de la apertura
     * @returns {string} Objetivos
     */
    generateOpeningObjectives(openingName) {
        const name = openingName.toLowerCase();

        if (name.includes('siciliana')) {
            return '• Crear desequilibrio y posiciones asimétricas\n• Generar contraataque dinámico\n• Luchar por la iniciativa desde la posición de negras';
        }
        if (name.includes('francesa')) {
            return '• Control del centro con e6 como base\n• Desarrollo flexible del alfil\n• Presión sobre la estructura blanca';
        }
        if (name.includes('gambito')) {
            return '• Sacrificar peón por desarrollo y iniciativa\n• Control del centro\n• Ventaja de espacio';
        }
        if (name.includes('indio')) {
            return '• Control del centro desde afuera\n• Presión sobre la diagonal larga\n• Estructura de peones sólida';
        }

        return '• Desarrollar piezas\n• Controlar el centro\n• Asegurar el rey';
    }

    /**
     * Explica la estrategia de la posición
     * @param {object} analysis - Análisis
     * @returns {string} Explicación estratégica
     */
    explainStrategy(analysis) {
        const themes = analysis.recommendations.strategicThemes || [];
        const squares = analysis.recommendations.criticalSquares || {};

        let explanation = `♟️ ESTRATEGIA

Temas Estratégicos Principales:
${themes.map((t, i) => `${i + 1}. ${t}`).join('\n')}

🎯 Cuadrados Críticos:
• Centro: ${squares.center?.join(', ') || 'd4, e4, d5, e5'}
• Débiles: ${squares.weak?.join(', ') || 'f6, c3'}
• Puestos Avanzados: ${squares.outposts?.join(', ') || 'd5, e4'}

📊 Estructura de Peones:
${this.analyzePawnStructure(analysis)}

🏰 Seguridad del Rey:
${this.analyzeKingSafety(analysis)}

🎲 Planes Posibles:
${this.suggestPlans(analysis)}`;

        return explanation;
    }

    /**
     * Analiza estructura de peones
     * @param {object} analysis - Análisis
     * @returns {string} Análisis de estructura
     */
    analyzePawnStructure(analysis) {
        return `• Peones centrales: Controlan la iniciativa
• Peones flanqueados: Debilitamientos potenciales
• Peones avanzados: ${analysis.recommendations.criticalSquares?.advancedPawns?.join(', ') || 'Ninguno relevante'}
• Bloqueos: Posibles restricciones de desarrollo`;
    }

    /**
     * Analiza seguridad del rey
     * @param {object} analysis - Análisis
     * @returns {string} Análisis de seguridad
     */
    analyzeKingSafety(analysis) {
        return `• Rey Blanco: Seguro en su flanco
• Rey Negro: Requiere vigilancia en línea abierta
• Espacios de escape: Limitados
• Defensa disponible: Suficiente`;
    }

    /**
     * Sugiere planes estratégicos
     * @param {object} analysis - Análisis
     * @returns {string} Planes sugeridos
     */
    suggestPlans(analysis) {
        return `Plan A: Atacar en el flanco de rey después de consolidar el centro
Plan B: Generar presión en columnas abiertas
Plan C: Sacrificar peón por actividad de piezas
Plan Defensivo: Si la posición lo requiere, reagrupar y buscar contrajuego`;
    }

    /**
     * Explica tácticas
     * @param {object} analysis - Análisis
     * @returns {string} Explicación táctica
     */
    explainTactics(analysis) {
        const tactics = analysis.recommendations.tacticalThemes || [];

        let explanation = `⚔️ TÁCTICA

Motivos Tácticos Disponibles:
${tactics.map((t, i) => `${i + 1}. ${t}`).join('\n') || '• Sin motivos tácticos inmediatos'}

🎯 Amenazas Mutuas:
${this.identifyThreats(analysis)}

🛡️ Defensas Necesarias:
${this.identifyDefenses(analysis)}

💥 Tácticas Ligadas:
${this.linkTactics(analysis)}`;

        return explanation;
    }

    /**
     * Identifica amenazas
     * @param {object} analysis - Análisis
     * @returns {string} Amenazas
     */
    identifyThreats(analysis) {
        return `• Amenaza principal: Mejorar posición de piezas activas
• Amenaza secundaria: Crear debilidades en la defensa rival
• Vigilar: Posibles sacrificios de fianchetto`;
    }

    /**
     * Identifica defensas
     * @param {object} analysis - Análisis
     * @returns {string} Defensas
     */
    identifyDefenses(analysis) {
        return `• Defender la 7ª fila
• Vigilar debilidades alrededor del rey
• Mantener cohesión entre piezas`;
    }

    /**
     * Vincula tácticas
     * @param {object} analysis - Análisis
     * @returns {string} Tácticas vinculadas
     */
    linkTactics(analysis) {
        return `• Tenedor después de jaque: Tener en cuenta
• Clavada combinada con ataque: Vigilar
• Sacrificio seguido de ataque: Evaluar cuidadosamente`;
    }

    /**
     * Explica las recomendaciones con razonamiento táctico
     * @param {object} analysis - Análisis
     * @returns {string} Recomendaciones razonadas
     */
    explainRecommendations(analysis) {
        const recommendations = analysis.recommendations || {};
        const tactical = (recommendations.tacticalThemes && recommendations.tacticalThemes[0]) || 'Mejorar la posición';

        let explanation = `✨ ANÁLISIS DE MOVIMIENTO
        
1️⃣ MEJOR JUGADA: ${recommendations.bestMove || 'N/A'}
   Esta línea se basa en: ${tactical.toLowerCase()}. 
   Mantiene una valoración de ${recommendations.evaluation || '0.0'} y busca forzar debilidades.

2️⃣ ALTERNATIVA SÓLIDA: ${recommendations.secondBest || 'N/A'}
   Si quieres un enfoque más tranquilo, esta opción mantiene el equilibrio estructural sin arriesgar tanto.

3️⃣ CÁLCULO PROFUNDO:
${recommendations.principalVariation?.slice(0, 4).map((m, i) => `   ${i + 1}. ${m}`).join(' → ') || '   Explorando variantes posicionales...'}

🎓 CRÍTICA POSICIONAL:
   Evita movimientos que cedan el control de las casillas críticas ${recommendations.criticalSquares?.center?.slice(0, 2).join('/') || 'centrales'}. Cada pieza debe tener un propósito claro.`;

        return explanation;
    }

    /**
     * Genera lecciones clave
     * @param {object} analysis - Análisis
     * @returns {string} Puntos clave para recordar
     */
    generateKeyLearnings(analysis) {
        return `📚 PUNTOS CLAVE PARA RECORDAR

1. ${this.generateKeyLesson1(analysis.recommendations)}

2. ${this.generateKeyLesson2(analysis)}

3. ${this.generateKeyLesson3(analysis)}

4. ${this.generateKeyLesson4(analysis)}

5. 🎯 En tu próxima partida:
   • Aplica estos principios
   • Recuerda el contexto estratégico
   • Calcula tácticamente antes de cada movimiento
   • Mantén la compostura bajo presión`;
    }

    /**
     * Genera primera lección clave
     * @param {object} recommendations - Recomendaciones
     * @returns {string} Lección
     */
    generateKeyLesson1(recommendations) {
        return `Centralización: Los mejores movimientos generalmente centralizan las piezas y mejoran la coordinación.`;
    }

    /**
     * Genera segunda lección clave
     * @param {object} analysis - Análisis
     * @returns {string} Lección
     */
    generateKeyLesson2(analysis) {
        return `Estructura: La estructura de peones define el juego. Protégela o atácala según corresponda.`;
    }

    /**
     * Genera tercera lección clave
     * @param {object} analysis - Análisis
     * @returns {string} Lección
     */
    generateKeyLesson3(analysis) {
        return `Dinámica: La actividad de piezas a menudo compensa desventajas materiales pequeñas.`;
    }

    /**
     * Genera cuarta lección clave
     * @param {object} analysis - Análisis
     * @returns {string} Lección
     */
    generateKeyLesson4(analysis) {
        return `Precisión: En posiciones críticas, un solo movimiento puede cambiar todo. Calcula siempre.`;
    }

    /**
     * Genera resumen ejecutivo para móvil
     * @param {string} fen - Posición en FEN
     * @returns {Promise<string>} Resumen ejecutivo
     */
    async generateMobileResumen(fen) {
        const analysis = await advancedAnalysis.analyzeCustomPosition(fen);

        return `📱 ANÁLISIS RÁPIDO

⭐ ${analysis.recommendations.positionType}

🔥 Mejor: ${analysis.recommendations.bestMove}

💡 Consejos:
${analysis.recommendations.recommendations?.slice(0, 2).map(c => `• ${c}`).join('\n') || '• Juega con precisión'}

🎯 Focus: ${analysis.recommendations.strategicThemes?.[0] || 'Control del centro'}`;
    }

    /**
     * Genera notas visuales para el tablero
     * @param {string} fen - Posición en FEN
     * @returns {Promise<object>} Notas visuales
     */
    async generateBoardNotes(fen) {
        const analysis = await advancedAnalysis.analyzeCustomPosition(fen);

        return {
            highlightSquares: {
                critical: analysis.recommendations.criticalSquares?.center || [],
                outposts: analysis.recommendations.criticalSquares?.outposts || [],
                weak: analysis.recommendations.criticalSquares?.weak || []
            },
            arrowMoves: [
                { from: 'e2', to: 'e4', color: 'green', label: 'Mejor' },
                { from: 'a1', to: 'a3', color: 'yellow', label: 'Alternativa' }
            ],
            annotations: {
                'e4': '🎯 Control central',
                'd5': '⚠️ Puesto avanzado'
            }
        };
    }

    /**
     * Cambia el nivel de complejidad
     * @param {string} level - beginner, intermediate, advanced
     */
    setComplexityLevel(level) {
        this.complexity = level;
        debugLog('AnalysisMaster', `Complejidad cambiada a: ${level}`);
    }

    /**
     * Obtiene historial de conversación
     * @returns {array} Historial
     */
    getConversationHistory() {
        return this.conversationHistory;
    }

    /**
     * Limpia historial
     */
    clearHistory() {
        this.conversationHistory = [];
    }
}

// Singleton
export const analysisMaster = new AnalysisMaster();

export default AnalysisMaster;
