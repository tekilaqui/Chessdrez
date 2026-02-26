import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async updateRating(userId: string, data: { ratingType: 'elo' | 'puzzleRating', newRating: number, puzzleId?: string, success?: boolean, delta?: number }): Promise<User> {
        const updateData: any = {};
        updateData[data.ratingType] = data.newRating;

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
                where: { id: userId },
                data: updateData
            });

            if (data.ratingType === 'puzzleRating' && data.puzzleId !== undefined) {
                await tx.puzzleAttempt.create({
                    data: {
                        userId,
                        puzzleId: data.puzzleId,
                        success: data.success ?? true,
                        rating: data.newRating,
                        delta: data.delta ?? 0
                    }
                });
            }

            return user;
        });
    }
}
