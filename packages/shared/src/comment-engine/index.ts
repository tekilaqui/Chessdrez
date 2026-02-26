import { MoveComment, MoveEvaluation } from './types';
import { classifyMove } from './classifiers/moveClassifier';
import { checkMaterialLoss } from './heuristics/materialHeuristic';
import { checkHangingPiece } from './heuristics/hangingPieceHeuristic';
import { checkKingSafety } from './heuristics/kingSafetyHeuristic';
import { checkDevelopment } from './heuristics/developmentHeuristic';
import { detectOpening } from '../data/openings-detector';

export class CommentEngine {
    static generateComment(
        fenBefore: string,
        fenAfter: string,
        evals: MoveEvaluation,
        history: string[] = []
    ): MoveComment {
        const opening = detectOpening(history);
        let category = classifyMove(evals);

        // If it's a known opening move and the evaluation change isn't a blunder, mark as book
        if (opening && category !== 'blunder' && category !== 'mistake') {
            category = 'book';
        }
        const heuristics = [];

        // Run Heuristics
        const material = checkMaterialLoss(fenBefore, fenAfter);
        if (material) heuristics.push(material);

        const hanging = checkHangingPiece(fenBefore, fenAfter);
        if (hanging) heuristics.push(hanging);

        const king = checkKingSafety(fenBefore, fenAfter);
        if (king) heuristics.push(king);

        const dev = checkDevelopment(fenBefore, fenAfter);
        if (dev) heuristics.push(dev);

        return {
            category,
            heuristics,
            opening: opening ? {
                name: opening.name,
                group: opening.groupName,
                commentary: opening.commentary
            } : undefined
        };
    }
}
