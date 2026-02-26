import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('puzzles-queue')
export class PuzzlesProcessor extends WorkerHost {
    private readonly logger = new Logger(PuzzlesProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} of type ${job.name}`);

        switch (job.name) {
            case 'puzzle_generation_job':
                return this.handlePuzzleGeneration(job.data);
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }

    private async handlePuzzleGeneration(data: { userId: string; category?: string; difficulty?: string }) {
        this.logger.log(`Generating puzzle for user ${data.userId} with category ${data.category}...`);

        // Simulation of puzzle generation (could involve querying external APIs or complex DB logic)
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.logger.log(`Puzzle generated for user ${data.userId}`);
        return {
            puzzleId: `gen-${Math.random().toString(36).substr(2, 9)}`,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            difficulty: data.difficulty || 'normal',
        };
    }
}
