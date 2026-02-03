import { Chess } from '../lib/chess.js';

export const createGame = (fen) => {
    return new Chess(fen);
};

export const getPieceAt = (fen, square) => {
    const game = new Chess(fen);
    return game.get(square);
};
