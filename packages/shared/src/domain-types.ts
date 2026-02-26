export type FEN = string;
export type PGN = string;
export type GameId = string;
export type UserId = string;

export type Color = 'w' | 'b';

export interface Move {
    from: string;
    to: string;
    promotion?: string;
}

export interface Puzzle {
    PuzzleId: string;
    FEN: string;
    Moves: string;
    Rating: number;
    RatingDeviation: number;
    Popularity: number;
    NbPlays: number;
    Themes: string;
    GameUrl: string;
    OpeningTags?: string | null;
}

export interface OpeningExercise {
    id: string;
    openingTag: string;
    openingName: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    fen: string;
    solution: string[];
    hint: string;
    comment: string;
}

export interface Opening {
    group: string;
    items: {
        name: string;
        tag: string;
        moves: string[];
        difficulty?: 'beginner' | 'intermediate' | 'advanced';
        steps: {
            comment: string;
            marks?: string[];
        }[];
        variants?: {
            name: string;
            moves: string[];
            steps: {
                comment: string;
                marks?: string[];
            }[];
        }[];
    }[];
}

export interface GameState {
    fen: FEN;
    turn: Color;
    isCheck: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
    winner?: Color;
}

export interface LessonStep {
    description: string;
    fen: string;
    expectedMove?: string;
    commentary?: string;
}

export interface Lesson {
    id: string;
    title: string;
    category: 'fundamentals' | 'tactics' | 'endgames' | 'classics';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    steps: LessonStep[];
}

export interface EngineEvaluation {
    score: number | null; // Centipawns (positive = white advantage)
    isMate: boolean;
    mateMoves: number | null; // Moves until mate (can be negative for black)
    bestMove: string | null;
    multipv: Array<EngineMove>;
}

export interface EngineMove {
    move: string;
    score: number | null;
    isMate: boolean;
    mateMoves: number | null;
}
