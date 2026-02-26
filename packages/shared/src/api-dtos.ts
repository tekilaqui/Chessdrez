import { GameId, UserId, FEN, PGN, GameState } from './domain-types';

export interface CreateGameDto {
    userId: UserId;
    opponentId?: UserId;
}

export interface JoinGameDto {
    gameId: GameId;
    userId: UserId;
}
