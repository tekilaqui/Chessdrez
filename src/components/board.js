import { createGame } from '../utils/chess.js';

export default class Board {
    constructor(fen = 'start', options = {}) {
        this.fen = fen;
        this.options = {
            editable: false,
            onSquareClick: null,
            onMove: null,
            ...options
        };
        this.selectedSquare = null;
        this.element = null;
    }

    getPieceImage(piece) {
        const color = piece.color === 'w' ? 'w' : 'b';
        const type = piece.type.toUpperCase();
        return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}${type.toLowerCase()}.png`;
    }

    render() {
        const boardEl = document.createElement('div');
        boardEl.className = 'chess-board';
        if (this.options.editable) {
            boardEl.classList.add('editable');
        }

        this._buildBoard(boardEl);
        this.element = boardEl;
        return boardEl;
    }

    _buildBoard(boardEl) {
        boardEl.innerHTML = '';
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        let game;
        try {
            game = createGame(this.fen);
        } catch (e) {
            console.error("Board init error:", e);
            boardEl.innerHTML = '<div style="color:red; text-align:center;">Error loading board</div>';
            return;
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

                // Interaction
                squareEl.addEventListener('click', (e) => {
                    if (this.options.editable || this.options.onSquareClick) {
                        this.handleSquareClick(square);
                    }
                });

                boardEl.appendChild(squareEl);
            });
        });
    }

    setFen(fen) {
        this.fen = fen;
        if (this.element) {
            this._buildBoard(this.element);
        }
    }

    handleSquareClick(square) {
        // 1. External Handler Priority (e.g. Editor)
        if (this.options.onSquareClick) {
            this.options.onSquareClick(square);
            return;
        }

        // 2. Editable Mode (fallback if no specific handler)
        if (this.options.editable) {
            // Usually handled by onSquareClick, but safety check
            return;
        }

        // 3. Move Handling (Click-Click)
        if (this.options.onMove) {
            // A. No selection -> Select
            if (!this.selectedSquare) {
                // Determine if square has a piece by checking DOM
                // (Since we don't persist game instance here yet)
                const sqEl = this.element.querySelector(`[data-square="${square}"] .piece`);
                if (sqEl) {
                    this.selectedSquare = square;
                    this.highlightSquare(square);
                }
            }
            // B. Selection exists
            else {
                const from = this.selectedSquare;
                const to = square;

                // If clicked same square, deselect
                if (from === to) {
                    this.clearHighlight();
                    this.selectedSquare = null;
                }
                // Move attempt
                else {
                    this.options.onMove({ from, to, promotion: 'q' }); // Always auto-promote to Queen for MVP
                    this.clearHighlight();
                    this.selectedSquare = null;
                }
            }
        }
    }

    highlightSquare(square) {
        this.clearHighlight();
        const sqEl = this.element.querySelector(`[data-square="${square}"]`);
        if (sqEl) {
            sqEl.classList.add('selected-highlight');
            sqEl.style.boxShadow = 'inset 0 0 0 4px rgba(255, 255, 0, 0.5)'; // Visual cue
        }
    }

    clearHighlight() {
        if (!this.element) return;
        this.element.querySelectorAll('.selected-highlight').forEach(el => {
            el.classList.remove('selected-highlight');
            el.style.boxShadow = '';
        });
    }
}
