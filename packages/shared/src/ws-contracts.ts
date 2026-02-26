import { GameId, UserId, Move, GameState, Color } from './domain-types';

export interface ServerToClientEvents {
    gameCreated: (gameId: GameId, color: Color) => void;
    gameStateUpdate: (state: GameState) => void;
    moveMade: (move: Move) => void;
}

export interface ClientToServerEvents {
    joinGame: (gameId: GameId) => void;
    makeMove: (gameId: GameId, move: Move) => void;
}
