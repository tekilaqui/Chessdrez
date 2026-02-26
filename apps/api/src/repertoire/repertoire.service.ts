import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RepertoireService {
    constructor(private prisma: PrismaService) { }

    async getRepertoire(userId: string) {
        return this.prisma.userRepertoire.findMany({
            where: { userId },
            include: { opening: true }
        });
    }

    async addToRepertoire(userId: string, eco: string, side: string) {
        return this.prisma.userRepertoire.upsert({
            where: {
                userId_eco: { userId, eco }
            },
            update: { side },
            create: {
                userId,
                eco,
                side
            }
        });
    }

    async removeFromRepertoire(userId: string, eco: string) {
        return this.prisma.userRepertoire.delete({
            where: {
                userId_eco: { userId, eco }
            }
        });
    }
}
