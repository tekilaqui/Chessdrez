import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PuzzlesService {
    constructor(private prisma: PrismaService) { }

    async getNextPuzzle(userId: string, category?: string, difficulty: 'easy' | 'normal' | 'hard' | 'master' = 'normal') {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { puzzleRating: true }
        });

        if (!user) throw new NotFoundException('Usuario no encontrado');

        const rating = user.puzzleRating;
        let minRating: number;
        let maxRating: number;

        switch (difficulty) {
            case 'easy':
                minRating = 0;
                maxRating = Math.max(800, rating - 100);
                break;
            case 'hard':
                minRating = rating + 100;
                maxRating = rating + 600;
                break;
            case 'master':
                minRating = rating + 500;
                maxRating = 4000;
                break;
            case 'normal':
            default:
                minRating = Math.max(0, rating - 200);
                maxRating = rating + 200;
                break;
        }

        const attempts = await this.prisma.puzzleAttempt.findMany({
            where: { userId },
            select: { puzzleId: true }
        });
        const solvedIds = attempts.map(a => a.puzzleId);

        // Map UI category names to database theme tags if necessary
        let themeFilter = category;
        if (category === 'mate') themeFilter = 'mate';
        if (category === 'mateIn1') themeFilter = 'mateIn1';
        if (category === 'mateIn2') themeFilter = 'mateIn2';

        let puzzles = await this.prisma.puzzle.findMany({
            where: {
                rating: { gte: minRating, lte: maxRating },
                id: { notIn: solvedIds },
                ...(themeFilter && themeFilter !== 'all' ? { themes: { contains: themeFilter } } : {})
            },
            take: 50
        });

        // Fallback 1: Ignore difficulty range, just find any unsolved puzzle in the category
        if (puzzles.length === 0 && themeFilter !== 'all') {
            puzzles = await this.prisma.puzzle.findMany({
                where: {
                    id: { notIn: solvedIds },
                    themes: { contains: themeFilter }
                },
                take: 20
            });
        }

        // Fallback 2: Any unsolved puzzle
        if (puzzles.length === 0) {
            puzzles = await this.prisma.puzzle.findMany({
                where: {
                    id: { notIn: solvedIds }
                },
                take: 20
            });
        }

        if (puzzles.length === 0) throw new NotFoundException('No hay más puzzles disponibles en esta categoría');

        // Randomly pick one from the candidates
        return puzzles[Math.floor(Math.random() * puzzles.length)];
    }

    async processAttempt(userId: string, puzzleId: string, success: boolean) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        const puzzle = await this.prisma.puzzle.findUnique({
            where: { id: puzzleId }
        });

        if (!user || !puzzle) throw new NotFoundException('Usuario o Puzzle no encontrado');

        // Elo Calculation (Simplified Glicko-lite)
        const K = 32;
        const expected = 1 / (1 + Math.pow(10, (puzzle.rating - user.puzzleRating) / 400));
        const delta = Math.round(K * ((success ? 1 : 0) - expected));

        const newRating = Math.max(100, user.puzzleRating + delta);

        // Update user stats
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                puzzleRating: newRating,
                puzzleSolved: success ? { increment: 1 } : undefined,
                puzzleFailed: !success ? { increment: 1 } : undefined,
                puzzleStreak: success ? { increment: 1 } : 0,
            }
        });

        // Record attempt
        return this.prisma.puzzleAttempt.create({
            data: {
                userId,
                puzzleId,
                success,
                rating: user.puzzleRating,
                delta,
            }
        });
    }

    async getUserStats(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                puzzleRating: true,
                puzzleStreak: true,
                puzzleSolved: true,
                puzzleFailed: true
            }
        });
    }
}
