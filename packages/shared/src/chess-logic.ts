import { Chess, Move as ChessJsMove } from 'chess.js';
import { GameState, Move, Color } from './domain-types';

export class ChessLogic {
    private game: Chess;

    constructor(fen?: string) {
        this.game = new Chess(fen);
    }

    get fen(): string {
        return this.game.fen();
    }

    get turn(): Color {
        return this.game.turn() as Color;
    }

    get isGameOver(): boolean {
        return this.game.isGameOver();
    }

    get isCheckmate(): boolean {
        return this.game.isCheckmate();
    }

    get isDraw(): boolean {
        return this.game.isDraw();
    }

    get isCheck(): boolean {
        return this.game.isCheck();
    }

    get history(): string[] {
        return this.game.history();
    }

    makeMove(move: string | Move): boolean {
        try {
            const result = this.game.move(move);
            return !!result;
        } catch (e) {
            return false;
        }
    }

    getLegalMoves(): string[] {
        return this.game.moves();
    }

    getVerboseMoves(): Move[] {
        return this.game.moves({ verbose: true }).map(m => ({
            from: m.from,
            to: m.to,
            promotion: m.promotion
        }));
    }


    getState(): GameState {
        return {
            fen: this.game.fen(),
            turn: this.game.turn() as Color,
            isCheck: this.game.isCheck(),
            isCheckmate: this.game.isCheckmate(),
            isDraw: this.game.isDraw(),
            winner: this.game.isCheckmate() ? (this.game.turn() === 'w' ? 'b' : 'w') : undefined
        };
    }

    reset() {
        this.game.reset();
    }

    load(fen: string) {
        this.game.load(fen);
    }
}
