import Board from './board.js';
import { createGame } from '../utils/chess.js';

export default class PositionEditor {
    constructor(initialFen, onSave, onCancel) {
        this.fen = initialFen || '8/8/8/8/8/8/8/8 w - - 0 1';
        this.onSave = onSave;
        this.onCancel = onCancel;
        this.selectedPiece = 'wP'; // Default selected piece to place
        this.board = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'position-editor-modal';

        const content = document.createElement('div');
        content.className = 'position-editor-content';
        // Content flows naturally now
        content.style.width = '100%';
        container.appendChild(content);

        // -- Board Section --
        const boardSection = document.createElement('div');
        boardSection.className = 'editor-board-section';
        this.board = new Board(this.fen, {
            editable: true,
            onSquareClick: (square) => this.handleBoardClick(square)
        });
        boardSection.appendChild(this.board.render());
        content.appendChild(boardSection);

        // -- Controls Section --
        const controls = document.createElement('div');
        controls.className = 'editor-controls';

        // 1. Actions Config (Moved UP)
        const actionButtons = document.createElement('div');
        actionButtons.className = 'editor-actions-row';
        actionButtons.style.marginBottom = '10px';
        actionButtons.innerHTML = `
            <button class="btn btn-secondary" id="btn-start">Posición Inicial</button>
            <button class="btn btn-secondary" id="btn-clear">Limpiar Tablero</button>
        `;
        controls.appendChild(actionButtons);

        const mainActions = document.createElement('div');
        mainActions.className = 'editor-main-actions';
        mainActions.style.marginBottom = '20px';
        mainActions.innerHTML = `
            <button class="btn btn-primary full-width" id="btn-analyze">ANALIZAR ESTA POSICIÓN</button>
            <button class="btn btn-secondary full-width" id="btn-cancel" style="margin-top:10px;">CANCELAR</button>
        `;
        controls.appendChild(mainActions);

        // Header (Moved down or kept? User wanted buttons below board. Header usually top, but let's put it here as divider or just keep at top of controls?)
        // Let's keep Header at top of controls if it acts as a title for the palette
        const header = document.createElement('div');
        header.innerHTML = '<h3 style="margin: 10px 0; color:var(--accent);">Editor de Piezas</h3>';
        controls.appendChild(header);

        // 2. Piece Palette (Moved DOWN)
        const palette = document.createElement('div');
        palette.className = 'piece-palette';
        const pieces = ['P', 'N', 'B', 'R', 'Q', 'K'];

        ['w', 'b'].forEach(color => {
            const row = document.createElement('div');
            row.className = 'palette-row';
            pieces.forEach(type => {
                const pieceCode = color + type;
                const pDiv = document.createElement('div');
                pDiv.className = 'palette-piece';
                if (this.selectedPiece === pieceCode) pDiv.classList.add('selected');

                // Use same images as board
                const imgUrl = `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}${type.toLowerCase()}.png`;
                pDiv.style.backgroundImage = `url(${imgUrl})`;

                pDiv.onclick = () => {
                    this.selectedPiece = pieceCode;
                    // Update UI selection
                    controls.querySelectorAll('.palette-piece').forEach(el => el.classList.remove('selected'));
                    pDiv.classList.add('selected');
                };
                row.appendChild(pDiv);
            });
            // Add Trash/Eraser
            const trash = document.createElement('div');
            trash.className = 'palette-piece trash';
            trash.innerHTML = '🗑️';
            trash.onclick = () => {
                this.selectedPiece = null; // Eraser mode
                controls.querySelectorAll('.palette-piece').forEach(el => el.classList.remove('selected'));
                trash.classList.add('selected');
            };
            if (color === 'w') row.appendChild(trash); // Only need one trash really, but putting it in first row

            palette.appendChild(row);
        });
        controls.appendChild(palette);

        // FEN Input (At bottom)
        const fenContainer = document.createElement('div');
        fenContainer.className = 'fen-container';
        fenContainer.innerHTML = '<label>FEN</label>';
        this.fenInput = document.createElement('input');
        this.fenInput.type = 'text';
        this.fenInput.value = this.fen;
        this.fenInput.onchange = (e) => this.updateFen(e.target.value);
        fenContainer.appendChild(this.fenInput);
        controls.appendChild(fenContainer);

        content.appendChild(controls);

        // Event Listeners for buttons
        setTimeout(() => {
            container.querySelector('#btn-start').onclick = () => this.updateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            container.querySelector('#btn-clear').onclick = () => this.updateFen('8/8/8/8/8/8/8/8 w - - 0 1');
            container.querySelector('#btn-analyze').onclick = () => this.onSave(this.fen);
            container.querySelector('#btn-cancel').onclick = () => this.onCancel();
        }, 0);

        return container;
    }

    handleBoardClick(square) {
        // Logic to toggle/place piece
        // We need to modify the FEN manually since chess.js is immutable-ish regarding arbitrary placement if we use validation
        // But for editor, we just want to set the piece.
        // We will use chess.js to parse, modify, and generate FEN.

        // ISSUE: chess.js doesn't easily support "put piece at square" cleanly if we just use createGame().
        // We need a Chess instance that allows setup.

        try {
            const game = createGame(this.fen);

            if (this.selectedPiece) {
                // Place piece
                game.put({ type: this.selectedPiece[1].toLowerCase(), color: this.selectedPiece[0] }, square);
            } else {
                // Remove piece
                game.remove(square);
            }

            const newFen = game.fen();
            this.updateFen(newFen);

        } catch (e) {
            console.error("Error modifying position:", e);
            // Fallback if current position is invalid (chess.js might strict validate)
            // If chess.js refuses to load an invalid position (e.g. 10 kings), we might need a looser FEN handler.
            // For now, assuming standard chess.js behavior.
        }
    }

    updateFen(newFen) {
        this.fen = newFen;
        if (this.fenInput) this.fenInput.value = newFen;
        this.board.setFen(newFen);
    }
}
