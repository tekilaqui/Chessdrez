import { MoveCategory, MoveEvaluation } from '../types';

/**
 * Layer A: Precise Move Classification
 * Follows generic logic similar to common chess platforms.
 */
export function classifyMove(evals: MoveEvaluation): MoveCategory {
    const { delta, evalBefore, evalAfter, mateAfter, bestMove } = evals;

    // The engine supplies scores in pawn units (e.g. 0.34 equals 34 centipawns).
    // This classifier uses centipawn thresholds; convert to centipawns first.
    const cpDelta = Math.round((delta ?? 0) * 100);
    const cpBefore = Math.round((evalBefore ?? 0) * 100);
    const cpAfter = Math.round((evalAfter ?? 0) * 100);

    // 1. Forced moves (simplified)

    // 2. Blunder detection (Loss of > 300 centipawns)
    if (cpDelta <= -300) return 'blunder';

    // 3. Mistake detection (Loss of 100-300 centipawns)
    if (cpDelta <= -100) return 'mistake';

    // 4. Inaccuracy (Loss of 50-100 centipawns)
    if (cpDelta <= -50) return 'inaccuracy';

    // 5. High Performance moves (positive delta)
    if (cpDelta >= 0) {
        // If it's a "sacrifice" that leads to winning, it's brilliant
        if (cpDelta > 200 && cpBefore < 0 && cpAfter > 50) return 'brilliant';

        // If delta is exactly 0 or small positive, it's likely best/good
        if (cpDelta === 0) return 'best';
        if (cpDelta > 50) return 'great';

        return 'best';
    }

    if (cpDelta > -10) return 'best'; // small margin
    if (cpDelta > -30) return 'excellent';

    return 'good';
}
