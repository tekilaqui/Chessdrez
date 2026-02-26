import { Chess, PieceSymbol } from 'chess.js';
import { HeuristicResult } from '../types';

const PIECE_VALUES: Record<PieceSymbol, number> = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0
};

export function checkMaterialLoss(fenBefore: string, fenAfter: string): HeuristicResult | null {
    const boardBefore = new Chess(fenBefore);
    const boardAfter = new Chess(fenAfter);

    const sideToMove = boardBefore.turn();

    const getMaterial = (chess: Chess, color: 'w' | 'b') => {
        let total = 0;
        const board = chess.board();
        for (const row of board) {
            for (const piece of row) {
                if (piece && piece.color === color) {
                    total += PIECE_VALUES[piece.type];
                }
            }
        }
        return total;
    };

    const materialBefore = getMaterial(boardBefore, sideToMove);
    const materialAfter = getMaterial(boardAfter, sideToMove);

    // Opponent material
    const oppColor = sideToMove === 'w' ? 'b' : 'w';
    const oppMaterialBefore = getMaterial(boardBefore, oppColor);
    const oppMaterialAfter = getMaterial(boardAfter, oppColor);

    const deltaPlayer = materialAfter - materialBefore;
    const deltaOpponent = oppMaterialAfter - oppMaterialBefore;

    const netBalance = deltaPlayer - deltaOpponent; // If negative, we lost more value than captured

    if (netBalance <= -3) {
        return { id: 'loses_major_material', severity: 'high', data: { balance: netBalance } };
    } else if (netBalance <= -1) {
        return { id: 'loses_minor_material', severity: 'medium', data: { balance: netBalance } };
    }

    return null;
}
