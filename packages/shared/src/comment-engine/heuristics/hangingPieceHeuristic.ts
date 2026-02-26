import { Chess, Square } from 'chess.js';
import { HeuristicResult } from '../types';

export function checkHangingPiece(fenBefore: string, fenAfter: string): HeuristicResult | null {
    const chess = new Chess(fenAfter);
    const sideJustMoved = chess.turn() === 'w' ? 'b' : 'w';
    const board = chess.board();

    // Check all pieces of the side that just moved
    // board is a 2D array of ranks (8..1). We need to derive square names.
    const files = ['a','b','c','d','e','f','g','h'];
    for (let r = 0; r < board.length; r++) {
        const rank = 8 - r; // r=0 -> rank 8
        const row = board[r];
        for (let f = 0; f < row.length; f++) {
            const piece = row[f];
            if (piece && piece.color === sideJustMoved && piece.type !== 'k') {
                const square = `${files[f]}${rank}`;

                if (isHanging(chess, square)) {
                    return {
                        id: 'hangs_piece',
                        severity: 'medium',
                        data: { piece: piece.type, square }
                    };
                }
            }
        }
    }

    return null;
}

function isHanging(chess: Chess, square: Square): boolean {
    const piece = chess.get(square);
    if (!piece) return false;

    // Check if attacked by opponent
    const opponentColor = piece.color === 'w' ? 'b' : 'w';
    if (!chess.isAttacked(square, opponentColor)) return false;

    // A piece is "hanging" if it is attacked and NOT protected
    if (!isProtected(chess, square)) return true;

    return false;
}

function isProtected(chess: Chess, square: Square): boolean {
    const piece = chess.get(square);
    if (!piece) return false;

    // To check if a piece is protected in chess.js, we temporarily remove it 
    // and see if the same-color side can "attack" that square.
    const originalPiece = chess.remove(square);
    const protectedBySameColor = chess.isAttacked(square, piece.color);
    chess.put(originalPiece!, square);

    return protectedBySameColor;
}
