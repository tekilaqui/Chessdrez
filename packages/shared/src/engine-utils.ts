import { EngineEvaluation } from './domain-types';

/**
 * Parses a UCI 'info' message from Stockfish and updates an EngineEvaluation object.
 * @param msg The raw UCI message string
 * @param currentTurn Current side to move ('w' or 'b')
 * @param previousEval The existing evaluation to update (optional)
 * @returns A new EngineEvaluation object
 */
export function parseEngineInfo(
    msg: string,
    currentTurn: 'w' | 'b' = 'w',
    previousEval?: EngineEvaluation
): EngineEvaluation {
    const evaluation: EngineEvaluation = previousEval
        ? JSON.parse(JSON.stringify(previousEval))
        : { score: null, isMate: false, mateMoves: null, bestMove: null, multipv: [] };

    // MultiPV index
    const pvMatch = msg.match(/multipv (\d+)/);
    const multipvIndex = pvMatch ? parseInt(pvMatch[1]) : 1;

    // Score
    const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);

    // PV line
    const pvLineMatch = msg.match(/ pv (\S+)/);
    const pvMove = pvLineMatch ? pvLineMatch[1] : null;

    if (scoreMatch && pvMove) {
        const type = scoreMatch[1];
        const rawVal = parseInt(scoreMatch[2]);

        // Adjust score based on turn (Stockfish score is always from the side to move's perspective)
        // Note: Evaluation score in our interface is conventionally positive for white advantage.
        let val = rawVal;
        if (currentTurn === 'b') {
            val = -val;
        }

        let score = null;
        let isMate = false;
        let mateMoves = null;

        if (type === 'cp') {
            score = val / 100; // Convert centipawns to unit evaluation
        } else {
            isMate = true;
            mateMoves = val;
            score = val > 0 ? 999 : -999;
        }

        // Update multipv array directly
        while (evaluation.multipv.length < multipvIndex) {
            evaluation.multipv.push({ move: '', score: null, isMate: false, mateMoves: null });
        }

        evaluation.multipv[multipvIndex - 1] = {
            move: pvMove,
            score,
            isMate,
            mateMoves
        };

        // If it's the primary line (multipv 1), update the main evaluation
        if (multipvIndex === 1) {
            evaluation.score = score;
            evaluation.isMate = isMate;
            evaluation.mateMoves = mateMoves;
        }
    }

    return evaluation;
}
