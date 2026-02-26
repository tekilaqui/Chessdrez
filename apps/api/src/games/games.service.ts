import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Game, Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.GameCreateInput): Promise<Game> {
        return this.prisma.game.create({ data });
    }

    async findByUser(userId: string): Promise<Game[]> {
        return this.prisma.game.findMany({
            where: {
                OR: [
                    { whitePlayerId: userId },
                    { blackPlayerId: userId },
                ],
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id: string, data: Prisma.GameUpdateInput): Promise<Game> {
        return this.prisma.game.update({
            where: { id },
            data,
        });
    }

    async findOne(id: string): Promise<Game | null> {
        return this.prisma.game.findUnique({
            where: { id },
            include: {
                moves: {
                    orderBy: { ply: 'asc' }
                }
            }
        });
    }

    async addMove(data: {
        gameId: string;
        ply: number;
        fen: string;
        san?: string;
        uci?: string;
        eval_before?: number;
        eval_after?: number;
        delta?: number;
        classification?: string;
    }) {
        const { gameId, ...moveData } = data;
        return this.prisma.gameMove.create({
            data: {
                ...moveData,
                game: { connect: { id: gameId } }
            }
        });
    }
}
