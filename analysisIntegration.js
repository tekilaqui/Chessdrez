/**
 * analysisIntegration.js
 * Integración del sistema de análisis v2.0 con la UI existente
 * Se conecta a los elementos existentes en index.html
 */

import { advancedAnalysis, boardEditor, analysisSystem } from './src/client/analysis.js';
import { analysisMaster } from './src/client/analysisMaster.js';
import { initializeOpenings } from './src/client/openings.js';

class AnalysisIntegration {
    constructor() {
        this.currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.isInitialized = false;
        this.latestAnalysisFen = null;
    }

    /**
     * Inicializa la integración con el DOM existente
     */
    async initialize() {
        if (this.isInitialized) return;

        console.log('🔄 Inicializando integración de análisis v2.1...');

        try {
            // 1. Inicializar base de datos de aperturas
            if (window.OPENINGS_ENHANCED) {
                initializeOpenings(window.OPENINGS_ENHANCED);
                console.log('📖 Teoría de aperturas cargada');
            } else if (window.OPENINGS_DATA) {
                initializeOpenings(window.OPENINGS_DATA);
                console.log('📖 Datos de aperturas cargados (legacy)');
            }

            // 2. Inicializar Stockfish dedicado para el Maestro
            const stockfishWorker = new Worker('stockfish.js');
            await analysisSystem.initialize(stockfishWorker);
            console.log('♟️ Stockfish dedicado para el Maestro ACTIVADO');

            this.addAnalysisPanel();
            this.isInitialized = true;
            console.log('✅ Integración de análisis completa');
        } catch (error) {
            console.error('❌ Error en integración:', error);
        }
    }

    /**
     * Agrega panel de análisis maestro al DOM
     */
    addAnalysisPanel() {
        const analysisContent = document.getElementById('analysis-content');
        if (!analysisContent) {
            // console.warn('⚠️ No se encontró #analysis-content');
            return;
        }

        // Crear panel del maestro
        const masterPanel = document.createElement('div');
        masterPanel.id = 'analysis-master-panel';
        masterPanel.style.cssText = `
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            border: 1px solid rgba(76, 175, 80, 0.3);
        `;

        masterPanel.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h3 style="margin: 0 0 10px 0; color: #4CAF50; font-size: 16px;">
                    🎓 Maestro de Análisis
                </h3>
                
                <label style="display: block; margin-bottom: 10px;">
                    <strong>Nivel:</strong>
                    <select id="analysis-complexity" style="margin-left: 10px; padding: 5px;">
                        <option value="beginner">🟢 Principiante</option>
                        <option value="intermediate" selected>🟡 Intermedio</option>
                        <option value="advanced">🔴 Avanzado</option>
                    </select>
                </label>

                <label style="display: block; margin-bottom: 10px;">
                    <strong>FEN:</strong><br>
                    <input type="text" id="analysis-fen-input" 
                        style="width: 100%; padding: 8px; margin-top: 5px; 
                               background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; 
                               color: #fff; font-family: monospace; font-size: 11px;"
                        placeholder="Pega aquí un FEN para analizar...">
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button id="btn-analyze" style="
                    flex: 1; padding: 10px; background: #4CAF50; border: none; 
                    color: white; border-radius: 4px; cursor: pointer; font-weight: bold;
                ">🔍 Analizar Posición</button>
                
                <button id="btn-reset-fen" style="
                    flex: 1; padding: 10px; background: rgba(76, 175, 80, 0.2); 
                    border: 1px solid #4CAF50; color: #4CAF50; border-radius: 4px; 
                    cursor: pointer; font-weight: bold;
                ">↺ Posición Inicial</button>
            </div>

            <div id="analysis-master-output" style="
                background: rgba(0,0,0,0.5);
                padding: 15px;
                border-radius: 4px;
                max-height: 400px;
                overflow-y: auto;
                color: #fff;
                font-size: 13px;
                line-height: 1.6;
                white-space: pre-wrap;
                word-wrap: break-word;
            ">
                <p style="color: #888; margin: 0;">
                    👋 Bienvenido al Maestro de Análisis<br><br>
                    1. Pega un FEN en el campo superior<br>
                    2. Haz click en "Analizar Posición"<br>
                    3. El maestro te explicará la posición<br><br>
                    Puedes cambiar el nivel de complejidad según tu experiencia.
                </p>
            </div>
        `;

        analysisContent.appendChild(masterPanel);

        // Conectar eventos
        this.connectAnalysisEvents();
    }

    /**
     * Conecta los eventos del panel de análisis
     */
    connectAnalysisEvents() {
        const fenInput = document.getElementById('analysis-fen-input');
        const analyzeBtn = document.getElementById('btn-analyze');
        const resetBtn = document.getElementById('btn-reset-fen');
        const complexitySelect = document.getElementById('analysis-complexity');
        const output = document.getElementById('analysis-master-output');

        // Cargar FEN inicial
        if (fenInput) {
            fenInput.value = this.currentFen;
        }

        // Botón analizar
        analyzeBtn?.addEventListener('click', async () => {
            const fen = fenInput?.value || this.currentFen;

            if (!fen) {
                output.innerHTML = '⚠️ Por favor pega un FEN válido';
                return;
            }

            output.innerHTML = '🔄 Analizando posición...';

            try {
                this.currentFen = fen;
                const complexity = complexitySelect?.value || 'intermediate';
                analysisMaster.setComplexityLevel(complexity);

                const explanation = await analysisMaster.explainPosition(fen);

                output.innerHTML = this.formatMasterOutput(explanation);
            } catch (error) {
                console.error('Error:', error);
                output.innerHTML = `❌ Error: ${error.message}`;
            }
        });

        // Botón reset
        resetBtn?.addEventListener('click', () => {
            this.currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            if (fenInput) {
                fenInput.value = this.currentFen;
            }
            output.innerHTML = '✅ Posición inicial cargada';
        });

        // Cambiar complejidad
        complexitySelect?.addEventListener('change', (e) => {
            analysisMaster.setComplexityLevel(e.target.value);
            console.log('📊 Complejidad cambiada a:', e.target.value);
        });
    }

    /**
     * Formatea la salida del maestro para HTML
     */
    formatMasterOutput(text) {
        if (typeof text !== 'string') return String(text);

        return text
            .split('\n')
            .map(line => {
                // Emojis especiales
                if (line.includes('🎓')) return `<strong style="color: #FFD93D;">${line}</strong>`;
                if (line.includes('🔥')) return `<strong style="color: #FF6B6B;">${line}</strong>`;
                if (line.includes('📊')) return `<strong style="color: #4CAF50;">${line}</strong>`;
                if (line.includes('🎯')) return `<strong style="color: #6BCB77;">${line}</strong>`;
                if (line.includes('⚔️')) return `<strong style="color: #FF9999;">${line}</strong>`;
                if (line.includes('♟️')) return `<strong style="color: #B0BEC5;">${line}</strong>`;
                if (line.includes('✨')) return `<strong style="color: #FFD93D;">${line}</strong>`;
                if (line.includes('💡')) return `<span style="color: #FFD93D;">${line}</span>`;

                // Líneas de separación
                if (line.includes('═')) return `<div style="border-top: 1px solid rgba(76, 175, 80, 0.3); margin: 10px 0;"></div>`;

                // Indentación
                if (line.startsWith('  •')) return `<div style="margin-left: 20px; color: #90EE90;">• ${line.substring(4)}</div>`;
                if (line.startsWith('   ')) return `<div style="margin-left: 20px; color: #888;">${line}</div>`;

                return `<div>${line}</div>`;
            })
            .join('');
    }

    /**
     * Actualiza el cuadro de opinión del maestro con la posición actual (Versión Corta)
     */
    async updateMaestroOpinion(fen) {
        const display = document.getElementById('maestro-opinion-display');
        const textBox = document.getElementById('maestro-opinion-text');
        const openingTop = document.getElementById('opening-status-top');
        const openingBottom = document.getElementById('opening-status-bottom');

        if (!display || !textBox) return;

        // Solo mostrar en modo estudio o análisis
        if (window.currentMode !== 'study' && window.currentMode !== 'ai') {
            display.style.display = 'none';
            if (openingTop) openingTop.classList.remove('visible');
            if (openingBottom) openingBottom.classList.remove('visible');
            return;
        }

        display.style.display = 'block';

        try {
            console.log('🧐 Actualizando opinión para FEN:', fen);
            this.latestAnalysisFen = fen;

            // 1. Detección de Apertura
            const moves = (window.game && window.game.history()) || [];
            const opening = analysisSystem.detectOpening(moves);

            if (opening && opening.detected) {
                const openingText = `📖 ${opening.name}`;
                console.log('✅ Apertura detectada:', opening.name);
                if (openingTop) {
                    openingTop.innerText = openingText;
                    openingTop.classList.add('visible');
                }
                if (openingBottom) {
                    openingBottom.innerText = openingText;
                    openingBottom.classList.add('visible');
                }
            } else {
                if (openingTop) openingTop.classList.remove('visible');
                if (openingBottom) openingBottom.classList.remove('visible');
            }

            // 2. Obtener opinión y detectar trampas
            textBox.innerHTML = `<div class="opinion-preview" style="font-style: italic; opacity: 0.7;">El maestro está analizando la posición...</div>`;

            const [preview, trick] = await Promise.all([
                analysisMaster.getPreviewAnalysis(fen),
                import('./src/client/trickDetector.js').then(m => m.trickDetector.detect(fen, moves))
            ]);

            console.log('🤖 Resultado detector de trucos:', trick ? trick.name : 'Ninguno');

            const isTrap = !!trick;
            if (isTrap) {
                display.classList.add('trap-active');
            } else {
                display.classList.remove('trap-active');
            }

            let html = `<div class="opinion-preview" style="font-style: italic; color: #EEE;">"${preview}"</div>`;

            if (isTrap) {
                html += `
                <div class="trap-action-bar" style="margin-top:12px; display:flex; gap:8px;">
                    <button onclick="analysisIntegration.showFullAnalysisModal()" class="btn-read-more" style="flex:1; background: rgba(255, 82, 82, 0.2); border: 1px solid var(--error); color:white; cursor:pointer; font-size:0.7rem; text-transform: uppercase; font-weight:800; padding:6px; border-radius: 4px;">
                        ⚠️ VER PLAN DEFENSIVO
                    </button>
                    ${trick.source === 'local_db' ? `
                    <button onclick="analysisIntegration.startTrapTutorial('${trick.name}')" class="btn-read-more" style="background: var(--accent); border: none; color:black; cursor:pointer; font-size:0.7rem; text-transform: uppercase; font-weight:800; padding:6px 10px; border-radius: 4px;">
                        🎓 VER TRUCO
                    </button>` : ''}
                </div>`;
            } else {
                html += `
                <button onclick="analysisIntegration.showFullAnalysisModal()" class="btn-read-more" style="margin-top:12px; background: rgba(78, 205, 199, 0.1); border: 1px solid var(--accent); color:var(--accent); cursor:pointer; font-size:0.7rem; text-transform: uppercase; letter-spacing: 1px; font-weight:800; padding:6px 10px; border-radius: 4px; transition: 0.3s;">
                    🔍 Detalle Estratégico
                </button>`;
            }

            textBox.innerHTML = html;

            // Si el panel de detalle ya está abierto, lo actualizamos automáticamente
            const panel = document.getElementById('strategic-detail-panel');
            if (panel && panel.style.display !== 'none') {
                this.showFullAnalysisModal();
            }
        } catch (error) {
            console.error('Error actualizando opinión:', error);
            textBox.innerHTML = 'El maestro se ha tomado un descanso.';
            display.classList.remove('trap-active');
        }
    }

    /**
     * Muestra el análisis completo en el panel persistente
     */
    async showFullAnalysisModal() {
        const fen = this.latestAnalysisFen || (window.game && window.game.fen());
        if (!fen) return;

        const panel = document.getElementById('strategic-detail-panel');
        const body = document.getElementById('strategic-detail-content');
        const boardLayout = document.getElementById('board-layout');

        if (!panel || !body) return;

        $(panel).fadeIn();
        if (window.innerWidth >= 1200) {
            boardLayout?.classList.add('analysis-grid-active');
        }

        body.innerHTML = '<span style="opacity:0.6; display:block; text-align:center; padding:40px;">Profundizando bajo demanda...</span>';

        try {
            const fullExplanation = await analysisMaster.explainPosition(fen);
            body.innerHTML = this.formatMasterOutput(fullExplanation);
            body.scrollTop = 0;
        } catch (error) {
            body.innerHTML = 'Error al generar el plan estratégico.';
        }
    }

    /**
     * Cierra el panel de detalle
     */
    closeStrategicPanel() {
        $('#strategic-detail-panel').fadeOut();
        document.getElementById('board-layout')?.classList.remove('analysis-grid-active');
        if (this.isInTrapTutorial) this.exitTrapTutorial();
    }

    /**
     * Inicia un tutorial interactivo de una trampa
     */
    async startTrapTutorial(trapName) {
        if (!window.MAESTRO_KNOWLEDGE) return;
        const trap = window.MAESTRO_KNOWLEDGE.traps.find(t => t.name === trapName);
        if (!trap || !trap.fen_part) return;

        this.isInTrapTutorial = true;
        this.originalFen = window.game.fen();

        // Cargar posición de la trampa
        window.game.load(trap.fen_part);
        window.board.position(trap.fen_part);

        const body = document.getElementById('strategic-detail-content');
        const panel = document.getElementById('strategic-detail-panel');
        $(panel).fadeIn();

        body.innerHTML = `
            <div style="background: rgba(255, 82, 82, 0.1); border: 1px solid var(--error); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: var(--error); margin-bottom: 8px;">🎓 EXPLICACIÓN DE LA TRAMPA</h4>
                <p style="font-size: 0.9rem;">${trap.warning}</p>
                <p style="margin-top: 10px; font-weight: 700; color: var(--accent);">Plan: ${trap.plan}</p>
            </div>
            <div id="trap-controls" style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="analysisIntegration.exitTrapTutorial()" class="btn-best-move" style="background: var(--error); flex:1;">SALIR Y VOLVER</button>
            </div>
        `;
    }

    exitTrapTutorial() {
        if (this.originalFen) {
            window.game.load(this.originalFen);
            window.board.position(this.originalFen);
        }
        this.isInTrapTutorial = false;
        this.closeStrategicPanel();
    }

    /**
     * Dibuja una flecha indicando la mejor jugada
     */
    async highlightBestMove() {
        const fen = this.latestAnalysisFen || (window.game && window.game.fen());
        if (!fen) {
            console.warn('No hay FEN para sugerir jugada');
            return;
        }

        try {
            const btn = document.getElementById('btn-show-best-move');
            const originalText = btn ? btn.innerHTML : '';
            if (btn) btn.innerHTML = '🕒 ...';

            // Forzar análisis fresco si no hay bestMove
            const analysis = await advancedAnalysis.analyzeCustomPosition(fen);
            if (btn) btn.innerHTML = originalText;

            if (analysis && analysis.recommendations && analysis.recommendations.bestMove) {
                const bestMove = analysis.recommendations.bestMove;
                console.log('🎯 Indicando mejor jugada:', bestMove);

                if (typeof window.drawBestMoveArrow === 'function') {
                    window.hintsActive = true;
                    // Limpiar canvas primero
                    const canvas = document.getElementById('arrowCanvas');
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    window.drawBestMoveArrow(bestMove, '#4ecdc7');
                } else {
                    console.error('drawBestMoveArrow missing');
                    alert('Mejor jugada: ' + bestMove);
                }
            } else {
                console.warn('No best move found in analysis results');
                if (btn) btn.innerHTML = '❌ Sin datos';
                setTimeout(() => { if (btn) btn.innerHTML = originalText; }, 2000);
            }
        } catch (e) {
            console.error('Error al pintar flecha:', e);
        }
    }

    /**
     * Integración con botones existentes del juego
     */
    async analyzeCurrentGame() {
        const fen = (window.game && window.game.fen()) || this.currentFen;
        await this.updateMaestroOpinion(fen);
    }
}

// Crear instancia global
const analysisIntegration = new AnalysisIntegration();

// Exportar
export { analysisIntegration };

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        analysisIntegration.initialize();
    });
} else {
    // Pequeño delay para asegurar que variables globales como OPENINGS_ENHANCED estén listas
    setTimeout(() => {
        analysisIntegration.initialize();
    }, 500);
}

// Exponer globalmente para debugging y acceso desde client.js
window.analysisIntegration = analysisIntegration;
window.analysisMaster = analysisMaster;
window.advancedAnalysis = advancedAnalysis;
window.analysisSystem = analysisSystem;
