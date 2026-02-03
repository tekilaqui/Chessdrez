/**
 * analysisIntegration.js
 * Integración del sistema de análisis v2.0 con la UI existente
 * Se conecta a los elementos existentes en index.html
 */

import { advancedAnalysis, boardEditor } from './src/client/analysis.js';
import { analysisMaster } from './src/client/analysisMaster.js';

class AnalysisIntegration {
    constructor() {
        this.currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        this.isInitialized = false;
    }

    /**
     * Inicializa la integración con el DOM existente
     */
    async initialize() {
        if (this.isInitialized) return;

        console.log('🔄 Inicializando integración de análisis...');

        try {
            this.setupEventListeners();
            this.addAnalysisPanel();
            this.isInitialized = true;
            console.log('✅ Integración de análisis lista');
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
            console.warn('⚠️ No se encontró #analysis-content');
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
     * Integración con botones existentes del juego
     */
    async analyzeCurrentGame() {
        // Este método puede ser llamado desde client.js si existe
        const explanation = await analysisMaster.explainPosition(this.currentFen);
        const output = document.getElementById('analysis-master-output');
        if (output) {
            output.innerHTML = this.formatMasterOutput(explanation);
        }
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
    analysisIntegration.initialize();
}

// Exposer globalmente para debugging
window.analysisIntegration = analysisIntegration;
window.analysisMaster = analysisMaster;
window.advancedAnalysis = advancedAnalysis;
