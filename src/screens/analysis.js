import Board from '../components/board.js';
import PositionEditor from '../components/position-editor.js';
import { createGame } from '../utils/chess.js';

export default class Analysis {
    render() {
        const container = document.createElement('div');
        this.container = container;
        container.className = 'screen-analysis';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.height = '100%';
        container.style.paddingBottom = '80px';

        // Header
        const header = document.createElement('div');
        header.style.padding = '15px 20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';

        header.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center;">
                <button class="btn btn-secondary" style="border-radius:50%; width:40px; height:40px; padding:0; display:flex; align-items:center; justify-content:center;" onclick="window.chessApp.navigateTo('home')">←</button>
                <h3 style="margin:0; font-size:16px;">Análisis</h3>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn btn-sm btn-primary" id="btn-editor">✏️ Editor de Tablero</button>
                <button class="btn btn-sm btn-secondary">📥 PGN</button>
            </div>
        `;
        container.appendChild(header);

        // Event listener for Editor
        setTimeout(() => {
            const btnEditor = container.querySelector('#btn-editor');
            if (btnEditor) {
                btnEditor.onclick = () => this.openEditor(container);
            }
        }, 0);

        // Board Area using new Board component
        const boardArea = document.createElement('div');
        boardArea.style.padding = '0 20px';
        boardArea.style.marginBottom = '20px';
        boardArea.style.display = 'flex';
        boardArea.style.justifyContent = 'center';

        const board = new Board('start', {
            onMove: (move) => this.handleMove(move)
        });
        this.board = board;
        this.game = createGame('start');
        boardArea.appendChild(board.render());
        container.appendChild(boardArea);

        // Eval Bar
        const evalBar = document.createElement('div');
        evalBar.style.margin = '0 20px 20px 20px';
        evalBar.style.height = '6px';
        evalBar.style.background = '#333';
        evalBar.style.borderRadius = '3px';
        evalBar.style.overflow = 'hidden';
        evalBar.innerHTML = `<div style="width: 55%; height: 100%; background: #fff;"></div>`; // +1.0 roughly
        container.appendChild(evalBar);

        // Analysis Lines
        const lines = document.createElement('div');
        lines.style.flex = '1';
        lines.style.background = 'var(--bg-panel)';
        lines.style.padding = '20px';
        lines.style.overflowY = 'auto';

        lines.innerHTML = `
            <div style="margin-bottom:15px; font-family:monospace; font-size:13px;">
                <div style="color:var(--text-secondary); margin-bottom:5px;">Mejor jugada (+0.5)</div>
                <div style="color:var(--text-primary);">1. e4 e5 2. Nf3 Nc6 3. Bb5 a6</div>
            </div>
            <div style="margin-bottom:15px; font-family:monospace; font-size:13px;">
                <div style="color:var(--text-secondary); margin-bottom:5px;">Alternativa (+0.3)</div>
                <div style="color:var(--text-muted);">1. d4 d5 2. c4 e6 3. Nc3 Nf6</div>
            </div>
        `;
        container.appendChild(lines);

        return container;
    }

    openEditor(container) {
        const currentFen = this.board.fen;
        const editor = new PositionEditor(
            currentFen,
            (newFen) => {
                // On Save (Analyze)
                this.board.setFen(newFen);
                // Close modal
                const modal = container.querySelector('.position-editor-modal');
                if (modal) modal.remove();

                // Trigger Analysis update (mock for now)
                this.updateAnalysis(container, newFen);
            },
            () => {
                // On Cancel
                const modal = container.querySelector('.position-editor-modal');
                if (modal) modal.remove();
            }
        );
        container.appendChild(editor.render());
    }



    handleMove(move) {
        try {
            // Validate and apply move
            const result = this.game.move({
                from: move.from,
                to: move.to,
                promotion: move.promotion || 'q'
            });

            if (result) {
                // Update Board
                this.board.setFen(this.game.fen());

                // Update Analysis/Maestro
                this.updateAnalysis(this.container, this.game.fen());
            }
        } catch (e) {
            console.error("Move error:", e);
        }
    }

    // Creating a reference to container to be used in handleMove
    // Better approach: Store container or query it.
    // For now, I'll update render to store this.container

    updateAnalysis(container, fen) {
        // Mock Maestro Analysis
        console.log("Maestro Analyzing:", fen);

        const feedback = this.getMaestroFeedback(this.game);

        // Update lines/comments
        const lines = container.querySelectorAll('.screen-analysis > div:last-child > div');
        if (lines.length > 0) {
            lines[0].innerHTML = `
                <div style="color:var(--primary); font-weight:bold; margin-bottom:5px;">Maestro dice:</div>
                <div style="color:var(--text-primary); font-size:14px; margin-bottom:10px;">"${feedback.comment}"</div>
                <div style="color:var(--text-muted); font-size:12px;">Eval: ${feedback.eval}</div>
            `;
        }
    }

    getMaestroFeedback(game) {
        // Simple heuristic mock
        const turn = game.turn() === 'w' ? 'Negras' : 'Blancas'; // Turn just passed
        if (game.isCheckmate()) {
            return { comment: `¡Jaque Mate! Victoria para las ${turn}.`, eval: '#' };
        }
        if (game.isCheck()) {
            return { comment: "¡Cuidado! El rey está en jaque.", eval: 'Check' };
        }
        if (game.isDraw()) {
            return { comment: "Tablas. La partida ha terminado en empate.", eval: '0.00' };
        }

        // Random encouraging comments
        const comments = [
            "Buena estructura de peones.",
            "Desarrollando piezas activamente.",
            "Control del centro es clave.",
            "Interesante maniobra.",
            "Una posición sólida para ambos bandos.",
            "Hay que tener cuidado con las diagonales.",
            "El caballo está bien situado ahí."
        ];
        return {
            comment: comments[Math.floor(Math.random() * comments.length)],
            eval: (Math.random() * 2 - 1).toFixed(2)
        };
    }
}
