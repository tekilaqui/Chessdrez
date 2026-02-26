import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('games-queue')
export class GamesProcessor extends WorkerHost {
    private readonly logger = new Logger(GamesProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} of type ${job.name}`);

        switch (job.name) {
            case 'comment_enrichment_job':
                return this.handleCommentEnrichment(job.data);
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }

    private async handleCommentEnrichment(data: { gameId: string; userId: string }) {
        this.logger.log(`Enriching comments for game ${data.gameId}...`);

        // Simulation of comment enrichment using some AI or predefined logic
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.logger.log(`Comments enriched for game ${data.gameId}`);
        return {
            gameId: data.gameId,
            status: 'enriched',
        };
    }
}
