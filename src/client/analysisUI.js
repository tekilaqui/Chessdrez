/**
 * analysisUI.js - Interfaz de usuario para análisis avanzado
 * Integra editor de tablero, análisis con maestro y entrenador
 */

import { analysisSystem, boardEditor, advancedAnalysis } from './analysis.js';
import { analysisMaster } from './analysisMaster.js';
import { debugLog } from './utils.js';

class AnalysisUI {
    constructor() {
        this.currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.selectedPiece = null;
        this.isInitialized = false;
    }

    /**
     * Inicializa la interfaz
     */
    async initialize() {
        if (this.isInitialized) return;

        this.setupEventListeners();
        this.setupTabSwitching();
        this.setupAnalysisPanel();
        this.setupEditorPanel();
        this.setupMasterPanel();
        
        this.isInitialized = true;
        debugLog('AnalysisUI', 'Interface inicializada');
    }

    /**
     * Configura cambio de tabs
     */
    setupTabSwitching() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = btn.getAttribute('data-tab');
                
                // Deactivar todos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Activar seleccionado
                btn.classList.add('active');
                document.getElementById(`${tabName}Tab`)?.classList.add('active');

                debugLog('AnalysisUI', `Tab cambiado a: ${tabName}`);
            });
        });
    }

    /**
     * Configura panel de análisis
     */
    setupAnalysisPanel() {
        const loadFenBtn = document.getElementById('loadFen');
        const resetBoardBtn = document.getElementById('resetBoard');
        const fenInput = document.getElementById('fenInput');

        loadFenBtn?.addEventListener('click', () => {
            const fen = fenInput.value.trim();
            if (fen) {
                this.currentFen = fen;
                this.updateAnalysisPanel();
            }
        });

        resetBoardBtn?.addEventListener('click', () => {
            this.currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            fenInput.value = this.currentFen;
            this.updateAnalysisPanel();
        });
    }

    /**
     * Actualiza panel de análisis
     */
    async updateAnalysisPanel() {
        try {
            const analysis = await advancedAnalysis.analyzeCustomPosition(this.currentFen);

            // Actualizar evaluación
            this.updateEvaluationDisplay(analysis.recommendations);

            // Actualizar apertura
            if (analysis.opening.detected) {
                this.showOpeningInfo(analysis.opening);
            }

            // Actualizar mejor movimiento
            this.updateBestMove(analysis.recommendations);

            // Actualizar variante principal
            this.updatePrincipalVariation(analysis.recommendations);

            // Actualizar temas
            this.updateThemes(analysis.recommendations);

            // Actualizar consejos
            this.updateAdvice(analysis.recommendations);

            debugLog('AnalysisUI', 'Panel de análisis actualizado');
        } catch (error) {
            console.error('Error actualizando análisis:', error);
        }
    }

    /**
     * Actualiza visualización de evaluación
     */
    updateEvaluationDisplay(recommendations) {
        const evalText = document.getElementById('evalText');
        if (evalText) {
            evalText.textContent = recommendations.evaluation;
        }

        const evalBar = document.getElementById('evalBar');
        if (evalBar) {
            const cp = recommendations.evaluation;
            // Calcular posición en la barra
            const position = Math.max(0, Math.min(100, 50 + (cp / 1000) * 50));
            evalBar.style.backgroundPosition = `${position}% 0`;
        }
    }

    /**
     * Muestra información de apertura
     */
    showOpeningInfo(opening) {
        const openingCard = document.getElementById('openingCard');
        const openingInfo = document.getElementById('openingInfo');

        if (openingCard && openingInfo) {
            openingCard.style.display = 'block';
            openingInfo.innerHTML = `
                <strong>${opening.name}</strong><br>
                Código: ${opening.eco}<br>
                Tipo: ${opening.type}<br>
                Progreso: ${opening.progress}
            `;
        }
    }

    /**
     * Actualiza mejor movimiento
     */
    updateBestMove(recommendations) {
        const bestMoveNotation = document.getElementById('bestMoveNotation');
        const bestMoveEval = document.getElementById('bestMoveEval');

        if (bestMoveNotation) {
            bestMoveNotation.textContent = recommendations.bestMove || '--';
        }

        if (bestMoveEval) {
            bestMoveEval.textContent = `Evaluación: ${recommendations.evaluation}`;
        }
    }

    /**
     * Actualiza variante principal
     */
    updatePrincipalVariation(recommendations) {
        const pvDisplay = document.querySelector('.pv-moves');
        if (pvDisplay && recommendations.principalVariation) {
            pvDisplay.textContent = recommendations.principalVariation.join(' ');
        }
    }

    /**
     * Actualiza temas estratégicos y tácticos
     */
    updateThemes(recommendations) {
        // Temas estratégicos
        const strategicList = document.getElementById('strategicThemes');
        if (strategicList && recommendations.strategicThemes) {
            strategicList.innerHTML = recommendations.strategicThemes
                .map(theme => `<li>• ${theme}</li>`)
                .join('');
        }

        // Temas tácticos
        const tacticalList = document.getElementById('tacticalThemes');
        if (tacticalList && recommendations.tacticalThemes) {
            tacticalList.innerHTML = recommendations.tacticalThemes
                .map(theme => `<li>• ${theme}</li>`)
                .join('');
        }
    }

    /**
     * Actualiza consejos
     */
    updateAdvice(recommendations) {
        const advicePanel = document.getElementById('advicePanel');
        if (advicePanel && recommendations.recommendations) {
            advicePanel.innerHTML = recommendations.recommendations
                .map((advice, i) => `<div class="advice-item">💡 ${advice}</div>`)
                .join('');
        }
    }

    /**
     * Configura panel del editor
     */
    setupEditorPanel() {
        // Seleccionar piezas
        document.querySelectorAll('.piece-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const piece = btn.getAttribute('data-piece');
                if (piece === 'DELETE') {
                    this.selectedPiece = null;
                } else {
                    this.selectedPiece = piece;
                }
                
                // Highlight del botón seleccionado
                document.querySelectorAll('.piece-btn').forEach(b => b.style.opacity = '1');
                if (piece !== 'DELETE') {
                    btn.style.opacity = '0.5';
                }

                // Actualizar instrucciones
                const instructions = document.getElementById('editorInstructions');
                if (instructions) {
                    instructions.innerHTML = piece === 'DELETE' 
                        ? 'Haz click en el tablero para borrar piezas'
                        : `Colocar: ${btn.textContent}`;
                }
            });
        });

        // Limpiar todo
        document.getElementById('clearAllPieces')?.addEventListener('click', () => {
            boardEditor.clearBoard();
            this.renderEditorBoard();
        });

        // Analizar posición personalizada
        document.getElementById('analyzeCustom')?.addEventListener('click', async () => {
            const fen = boardEditor.exportFen();
            this.currentFen = fen;
            document.getElementById('fenInput').value = fen;
            await this.updateAnalysisPanel();
            // Cambiar a tab de análisis
            document.querySelector('[data-tab="analysis"]')?.click();
        });

        // Exportar/Importar FEN
        document.getElementById('copyFen')?.addEventListener('click', () => {
            const fenExport = document.getElementById('fenExport');
            if (fenExport) {
                fenExport.value = boardEditor.exportFen();
                fenExport.select();
                document.execCommand('copy');
                alert('FEN copiado al portapapeles');
            }
        });

        document.getElementById('importFen')?.addEventListener('click', () => {
            const fenExport = document.getElementById('fenExport');
            if (fenExport && fenExport.value) {
                boardEditor.importFen(fenExport.value);
                this.renderEditorBoard();
            }
        });

        // Importar imagen
        document.getElementById('imageUpload')?.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                const result = await boardEditor.importFromImage(file);
                if (result.success) {
                    this.renderEditorBoard();
                } else {
                    alert('Se necesita librería OCR para analizar imágenes');
                }
            }
        });

        // Resetear editor
        document.getElementById('resetEditorBoard')?.addEventListener('click', () => {
            boardEditor.loadInitialPosition();
            this.renderEditorBoard();
        });

        this.renderEditorBoard();
    }

    /**
     * Renderiza el tablero del editor
     */
    renderEditorBoard() {
        const container = document.getElementById('editorBoardContainer');
        if (!container) return;

        const board = boardEditor.getBoard();
        container.innerHTML = '';

        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.textContent = board[i] || '';

            square.addEventListener('click', () => {
                if (this.selectedPiece === null) {
                    boardEditor.removePiece(i);
                } else if (this.selectedPiece === 'DELETE') {
                    boardEditor.removePiece(i);
                } else {
                    boardEditor.placePiece(i, this.selectedPiece);
                }
                this.renderEditorBoard();
            });

            container.appendChild(square);
        }

        // Actualizar FEN export
        const fenExport = document.getElementById('fenExport');
        if (fenExport) {
            fenExport.value = boardEditor.exportFen();
        }

        // Validación
        this.updateValidation();
    }

    /**
     * Actualiza panel de validación
     */
    updateValidation() {
        const validation = boardEditor.validatePosition();
        const validationPanel = document.getElementById('validationPanel');

        if (validationPanel) {
            const suggestions = boardEditor.generatePositionSuggestions();
            validationPanel.innerHTML = suggestions
                .map(suggestion => `<div class="validation-item">${suggestion}</div>`)
                .join('');
        }
    }

    /**
     * Configura panel del maestro
     */
    setupMasterPanel() {
        const complexitySelect = document.getElementById('complexityLevel');
        complexitySelect?.addEventListener('change', (e) => {
            analysisMaster.setComplexityLevel(e.target.value);
        });

        const startMasterBtn = document.getElementById('startMasterAnalysis');
        startMasterBtn?.addEventListener('click', async () => {
            const explanation = await analysisMaster.explainPosition(this.currentFen);
            const masterContent = document.getElementById('masterContent');
            if (masterContent) {
                masterContent.innerHTML = explanation.split('\n').map(line => `<p>${line}</p>`).join('');
            }
        });

        const mobileResumenBtn = document.getElementById('getMobileResumen');
        mobileResumenBtn?.addEventListener('click', async () => {
            const resumen = await analysisMaster.generateMobileResumen(this.currentFen);
            const masterContent = document.getElementById('masterContent');
            if (masterContent) {
                masterContent.textContent = resumen;
            }
        });
    }

    /**
     * Renderiza el tablero de análisis
     */
    renderAnalysisBoard() {
        const container = document.getElementById('analysisBoardContainer');
        if (!container) return;

        const board = boardEditor.fenToBoard(this.currentFen);
        container.innerHTML = '';

        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.textContent = board[i] || '';
            container.appendChild(square);
        }
    }

    /**
     * Configura event listeners generales
     */
    setupEventListeners() {
        // Voltear tablero
        document.getElementById('flipBoard')?.addEventListener('click', () => {
            // Lógica para voltear tablero
            debugLog('AnalysisUI', 'Tablero volteado');
        });
    }

    /**
     * Importa el HTML en la página
     */
    static async loadHTML() {
        try {
            const response = await fetch('/analysis-enhanced.html');
            const html = await response.text();
            const container = document.getElementById('analysisContainer');
            if (container) {
                container.innerHTML = html;
            }
            debugLog('AnalysisUI', 'HTML cargado');
        } catch (error) {
            console.error('Error cargando HTML:', error);
        }
    }
}

// Crear instancia
export const analysisUI = new AnalysisUI();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => analysisUI.initialize());
} else {
    analysisUI.initialize();
}

export default AnalysisUI;
