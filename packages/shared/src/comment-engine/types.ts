export type MoveCategory =
    | 'brilliant'
    | 'great'
    | 'best'
    | 'excellent'
    | 'good'
    | 'book'
    | 'inaccuracy'
    | 'mistake'
    | 'blunder'
    | 'forced'
    | 'analysing';

export interface MoveEvaluation {
    evalBefore: number;   // In centipawns or absolute (mate as huge number)
    evalAfter: number;
    delta: number;        // evalAfter - evalBefore (from POV of side moving)
    isMate?: boolean;
    mateBefore?: number | null;
    mateAfter?: number | null;
    bestMove?: string;
}

export interface HeuristicResult {
    id: string;
    severity: 'low' | 'medium' | 'high';
    data?: Record<string, any>;
}

export interface MoveComment {
    category: MoveCategory;
    heuristics: HeuristicResult[];
    san?: string;
    uci?: string;
    opening?: {
        name: string;
        group: string;
        commentary?: string;
    };
}
