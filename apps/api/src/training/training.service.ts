import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainingService {
    constructor(private prisma: PrismaService) { }

    async getProgress(userId: string, eco?: string) {
        if (eco) {
            return this.prisma.openingProgress.findUnique({
                where: { userId_eco: { userId, eco } }
            });
        }
        return this.prisma.openingProgress.findMany({
            where: { userId }
        });
    }

    async saveProgress(userId: string, eco: string, progress: number, history?: string) {
        return this.prisma.openingProgress.upsert({
            where: { userId_eco: { userId, eco } },
            update: { progress, history },
            create: { userId, eco, progress, history }
        });
    }
}
