import { Chess } from 'chess.js';
import { HeuristicResult } from '../types';

export function checkKingSafety(fenBefore: string, fenAfter: string): HeuristicResult | null {
    const boardBefore = new Chess(fenBefore);
    const boardAfter = new Chess(fenAfter);
    const side = boardBefore.turn();

    // Simplification: Check if a pawn in front of the castled king moved
    const kingPos = findKing(boardBefore, side);
    if (!kingPos) return null;

    // Check if castled (on G or C files for white/black)
    const isCastledK = (side === 'w' && kingPos === 'g1') || (side === 'b' && kingPos === 'g8');
    const isCastledQ = (side === 'w' && kingPos === 'c1') || (side === 'b' && kingPos === 'c8');

    if (isCastledK || isCastledQ) {
        // If a pawn in the shield moved
        const shieldSquares = isCastledK
            ? (side === 'w' ? ['f2', 'g2', 'h2'] : ['f7', 'g7', 'h7'])
            : (side === 'w' ? ['a2', 'b2', 'c2'] : ['a7', 'b7', 'c7']);

        const move = getMoveMade(boardBefore, boardAfter);
        if (move && shieldSquares.includes(move.from)) {
            const piece = boardBefore.get(move.from as any);
            if (piece?.type === 'p') {
                return { id: 'king_unsafe', severity: 'medium' };
            }
        }
    }

    return null;
}

function findKing(chess: Chess, color: 'w' | 'b'): string | null {
    const board = chess.board();
    for (const row of board) {
        for (const piece of row) {
            if (piece && piece.type === 'k' && piece.color === color) {
                return piece.square;
            }
        }
    }
    return null;
}

function getMoveMade(before: Chess, after: Chess) {
    // This is a naive way to find the move, but works for deterministic check
    const history = after.history({ verbose: true });
    return history[history.length - 1] || null;
}
