import { Chess } from 'chess.js';
import { HeuristicResult } from '../types';

export function checkDevelopment(fenBefore: string, fenAfter: string): HeuristicResult | null {
    const boardBefore = new Chess(fenBefore);
    const boardAfter = new Chess(fenAfter);

    const moveCount = parseInt(fenBefore.split(' ')[5]);
    if (moveCount > 15) return null; // Only check in opening

    const move = getMoveMade(boardBefore, boardAfter);
    if (!move) return null;

    // Rule: Don't move the same piece multiple times in the opening if others are not developed
    if (isMovingSamePieceRepeatedly(boardBefore, move)) {
        return { id: 'development_slow', severity: 'low' };
    }

    return null;
}

function getMoveMade(before: Chess, after: Chess) {
    const history = after.history({ verbose: true });
    return history[history.length - 1] || null;
}

function isMovingSamePieceRepeatedly(before: Chess, lastMove: any): boolean {
    const history = before.history({ verbose: true });
    if (history.length < 4) return false;

    const secondToLast = history[history.length - 2];
    if (secondToLast && secondToLast.color === lastMove.color && secondToLast.to === lastMove.from) {
        // Simple check: did we just move the piece we moved two turns ago?
        return true;
    }
    return false;
}
