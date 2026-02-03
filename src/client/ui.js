/**
 * ui.js - Sistema de Interfaz de Usuario
 * Renderizado del tablero, actualizaciones de UI, animaciones y visualización
 */

import { state } from './state.js';
import { formatTime, formatEvaluation, debugLog } from './utils.js';
import { LANGS, QUALITY_MAP } from './constants.js';

class UISystem {
    constructor() {
        this.boardElement = null;
        this.selectedSquare = null;
        this.animationQueue = [];
        this.isAnimating = false;
        this.highlightedSquares = [];
        this.arrowCanvas = null;
        this.arrowCtx = null;
    }

    /**
     * Inicializa el sistema de UI
     * @param {string} boardElementId - ID del elemento del tablero
     */
    initialize(boardElementId = 'board') {
        this.boardElement = document.getElementById(boardElementId);
        if (!this.boardElement) {
            console.warn(`⚠️ Elemento #${boardElementId} no encontrado`);
            return false;
        }

        // Crear canvas para flechas
        this.initializeArrowCanvas();
        debugLog('UISystem', 'UI inicializado');
        return true;
    }

    /**
     * Inicializa canvas para flechas de análisis
     */
    initializeArrowCanvas() {
        const container = this.boardElement.parentElement;
        if (!container) return;

        this.arrowCanvas = document.createElement('canvas');
        this.arrowCanvas.id = 'analysis-arrows';
        this.arrowCanvas.style.position = 'absolute';
        this.arrowCanvas.style.top = '0';
        this.arrowCanvas.style.left = '0';
        this.arrowCanvas.style.zIndex = '10';
        this.arrowCanvas.style.cursor = 'pointer';

        container.appendChild(this.arrowCanvas);
        this.arrowCtx = this.arrowCanvas.getContext('2d');
    }

    /**
     * Actualiza el tablero después de un movimiento
     * @param {object} moveData - Datos del movimiento
     */
    updateBoard(moveData) {
        if (!this.boardElement) return;

        // Aquí iría lógica para actualizar visual del tablero
        // Esto dependería de si usamos Chessboard.js u otro sistema
        debugLog('UISystem', `Movimiento: ${moveData.move}`);

        this.highlightMoveSquares(moveData.from, moveData.to);
    }

    /**
     * Destaca los cuadrados de un movimiento
     * @param {string} from - Cuadrado origen
     * @param {string} to - Cuadrado destino
     */
    highlightMoveSquares(from, to) {
        this.clearHighlights();

        const squares = [from, to];
        this.highlightedSquares = squares;

        // Buscar elementos del tablero y aplicar estilo
        for (const sq of squares) {
            const squareEl = document.querySelector(`[data-square="${sq}"]`);
            if (squareEl) {
                squareEl.classList.add('highlighted-move');
            }
        }
    }

    /**
     * Limpia todos los resaltados
     */
    clearHighlights() {
        for (const sq of this.highlightedSquares) {
            const squareEl = document.querySelector(`[data-square="${sq}"]`);
            if (squareEl) {
                squareEl.classList.remove('highlighted-move');
            }
        }
        this.highlightedSquares = [];
    }

    /**
     * Dibuja una flecha de análisis
     * @param {string} from - Cuadrado origen (ej: "e2")
     * @param {string} to - Cuadrado destino (ej: "e4")
     * @param {object} options - Opciones (color, grosor)
     */
    drawArrow(from, to, options = {}) {
        if (!this.arrowCtx) return;

        const {
            color = '#00d084',
            thickness = 3,
            alpha = 0.7
        } = options;

        // Convertir notación a coordenadas pixel
        const fromPos = this.squareToPixels(from);
        const toPos = this.squareToPixels(to);

        if (!fromPos || !toPos) return;

        this.arrowCtx.save();
        this.arrowCtx.globalAlpha = alpha;
        this.arrowCtx.strokeStyle = color;
        this.arrowCtx.fillStyle = color;
        this.arrowCtx.lineWidth = thickness;

        // Dibujar línea
        this.arrowCtx.beginPath();
        this.arrowCtx.moveTo(fromPos.x, fromPos.y);
        this.arrowCtx.lineTo(toPos.x, toPos.y);
        this.arrowCtx.stroke();

        // Dibujar punta de flecha
        const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const arrowSize = 15;

        this.arrowCtx.beginPath();
        this.arrowCtx.moveTo(toPos.x, toPos.y);
        this.arrowCtx.lineTo(toPos.x - arrowSize * Math.cos(angle - Math.PI / 6), toPos.y - arrowSize * Math.sin(angle - Math.PI / 6));
        this.arrowCtx.lineTo(toPos.x - arrowSize * Math.cos(angle + Math.PI / 6), toPos.y - arrowSize * Math.sin(angle + Math.PI / 6));
        this.arrowCtx.fill();

        this.arrowCtx.restore();
    }

    /**
     * Convierte notación de cuadrado a píxeles
     * @param {string} square - Cuadrado (ej: "e4")
     * @returns {object|null} Coordenadas {x, y} o null
     */
    squareToPixels(square) {
        // Esto requeriría conocer el tamaño del tablero
        // Por ahora retornamos null como placeholder
        return null;
    }

    /**
     * Limpia el canvas de flechas
     */
    clearArrows() {
        if (!this.arrowCtx) return;
        this.arrowCtx.clearRect(0, 0, this.arrowCanvas.width, this.arrowCanvas.height);
    }

    /**
     * Actualiza la información de la partida
     * @param {object} gameInfo - Información del juego
     */
    updateGameInfo(gameInfo) {
        const infoElement = document.getElementById('game-info');
        if (!infoElement) return;

        let html = `
            <div class="game-info-item">
                <span class="label">Modo:</span>
                <span class="value">${gameInfo.mode}</span>
            </div>
            <div class="game-info-item">
                <span class="label">Turno:</span>
                <span class="value">${gameInfo.turn === 'w' ? '♔ Blancas' : '♚ Negras'}</span>
            </div>
        `;

        if (gameInfo.whiteElo) {
            html += `
                <div class="game-info-item">
                    <span class="label">Blancas:</span>
                    <span class="value">${gameInfo.whiteElo} ELO</span>
                </div>
            `;
        }

        if (gameInfo.blackElo) {
            html += `
                <div class="game-info-item">
                    <span class="label">Negras:</span>
                    <span class="value">${gameInfo.blackElo} ELO</span>
                </div>
            `;
        }

        infoElement.innerHTML = html;
    }

    /**
     * Actualiza el reloj
     * @param {number} whiteTime - Tiempo blancas (segundos)
     * @param {number} blackTime - Tiempo negras (segundos)
     * @param {string} turn - Turno actual ('w' o 'b')
     */
    updateClock(whiteTime, blackTime, turn) {
        const whiteClockEl = document.getElementById('white-clock');
        const blackClockEl = document.getElementById('black-clock');

        if (whiteClockEl) {
            whiteClockEl.textContent = formatTime(whiteTime);
            whiteClockEl.classList.toggle('active', turn === 'w');
        }

        if (blackClockEl) {
            blackClockEl.textContent = formatTime(blackTime);
            blackClockEl.classList.toggle('active', turn === 'b');
        }
    }

    /**
     * Actualiza el historial de movimientos
     * @param {array} moveHistory - Historial de movimientos
     */
    updateMoveHistory(moveHistory) {
        const historyElement = document.getElementById('move-history');
        if (!historyElement) return;

        let html = '<div class="moves-container">';

        for (let i = 0; i < moveHistory.length; i += 2) {
            const whiteMove = moveHistory[i];
            const blackMove = moveHistory[i + 1];

            html += `
                <div class="move-pair" data-index="${i}">
                    <span class="move-number">${Math.floor(i / 2) + 1}.</span>
                    <span class="move-white ${whiteMove?.quality ? 'quality-' + whiteMove.quality : ''}">${whiteMove?.move || ''}</span>
                    ${blackMove ? `<span class="move-black ${blackMove?.quality ? 'quality-' + blackMove.quality : ''}">${blackMove.move}</span>` : ''}
                </div>
            `;
        }

        html += '</div>';
        historyElement.innerHTML = html;
    }

    /**
     * Actualiza la evaluación
     * @param {number} cp - Evaluación en centipeones
     * @param {number} depth - Profundidad del análisis
     */
    updateEvaluation(cp, depth) {
        const evalElement = document.getElementById('evaluation');
        if (!evalElement) return;

        const evalStr = formatEvaluation(cp);
        let evalClass = 'eval-neutral';

        if (cp > 100) evalClass = 'eval-white';
        if (cp < -100) evalClass = 'eval-black';

        evalElement.textContent = evalStr;
        evalElement.className = `evaluation ${evalClass}`;

        if (depth) {
            const depthEl = document.getElementById('analysis-depth');
            if (depthEl) {
                depthEl.textContent = `d${depth}`;
            }
        }
    }

    /**
     * Muestra un mensaje toast
     * @param {string} message - Mensaje
     * @param {string} type - Tipo ('info', 'success', 'error', 'warning')
     * @param {number} duration - Duración en ms
     */
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    /**
     * Muestra un modal
     * @param {string} title - Título
     * @param {string} content - Contenido HTML
     * @param {array} buttons - Botones [{label, callback}]
     */
    showModal(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${buttons.map((btn, idx) => `
                        <button class="btn btn-${btn.style || 'primary'}" data-button="${idx}">
                            ${btn.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        buttons.forEach((btn, idx) => {
            modal.querySelector(`[data-button="${idx}"]`).onclick = () => {
                if (btn.callback) btn.callback();
                modal.remove();
            };
        });

        return modal;
    }

    /**
     * Actualiza la barra de material
     * @param {object} material - Material restante {w: {...}, b: {...}}
     */
    updateMaterial(material) {
        const whiteMaterialEl = document.getElementById('white-material');
        const blackMaterialEl = document.getElementById('black-material');

        if (whiteMaterialEl && material.w) {
            whiteMaterialEl.textContent = this.getMaterialString(material.w);
        }

        if (blackMaterialEl && material.b) {
            blackMaterialEl.textContent = this.getMaterialString(material.b);
        }
    }

    /**
     * Convierte material a string visual
     * @param {object} material - Material {pawn, knight, bishop, rook, queen}
     * @returns {string}
     */
    getMaterialString(material) {
        let str = '';
        if (material.queen) str += '♕'.repeat(material.queen);
        if (material.rook) str += '♖'.repeat(material.rook);
        if (material.bishop) str += '♗'.repeat(material.bishop);
        if (material.knight) str += '♘'.repeat(material.knight);
        if (material.pawn) str += '♙'.repeat(material.pawn);
        return str;
    }

    /**
     * Alterna visibilidad de panel
     * @param {string} panelId - ID del panel
     */
    togglePanel(panelId) {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }

    /**
     * Limpia toda la UI
     */
    clear() {
        this.clearHighlights();
        this.clearArrows();
        this.selectedSquare = null;
    }

    /**
     * Libera recursos
     */
    dispose() {
        this.clear();
        if (this.arrowCanvas) {
            this.arrowCanvas.remove();
        }
        this.boardElement = null;
    }
}

// Singleton
export const uiSystem = new UISystem();

export default UISystem;
