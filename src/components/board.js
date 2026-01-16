import { createGame } from '../utils/chess.js';

export default class Board {
    constructor(fen = 'start', onMove = null) {
        this.fen = fen;
        this.onMove = onMove;
        this.selectedSquare = null;
    }

    getPieceImage(piece) {
        const color = piece.color === 'w' ? 'w' : 'b';
        const type = piece.type.toUpperCase();
        // Fallback or local images if needed, but this URL is generally stable for demos
        return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}${type.toLowerCase()}.png`;
    }

    render() {
        const boardEl = document.createElement('div');
        boardEl.className = 'chess-board';

        // 8x8 Grid
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        // Synchronous logic (assuming chess.js is bundled or available via module)
        let game;
        try {
            game = createGame(this.fen);
        } catch (e) {
            console.error("Board init error:", e);
            boardEl.innerHTML = '<div style="color:red; text-align:center;">Error loading board</div>';
            return boardEl;
        }

        ranks.forEach(rank => {
            files.forEach(file => {
                const square = file + rank;
                const piece = game.get(square);
                const isDark = (files.indexOf(file) + ranks.indexOf(rank)) % 2 !== 0;

                const squareEl = document.createElement('div');
                squareEl.className = `square ${isDark ? 'dark' : 'light'}`;
                squareEl.dataset.square = square;

                if (piece) {
                    const pieceEl = document.createElement('div');
                    pieceEl.className = 'piece';
                    pieceEl.style.backgroundImage = `url(${this.getPieceImage(piece)})`;
                    squareEl.appendChild(pieceEl);
                }

                squareEl.addEventListener('click', () => this.handleSquareClick(square));
                boardEl.appendChild(squareEl);
            });
        });

        return boardEl;
    }

    handleSquareClick(square) {
        console.log(`Clicked ${square}`);
        // Basic selection logic
        // In real app, we would validate moves using chess.js
        if (this.onMove) this.onMove(square);
    }
}
