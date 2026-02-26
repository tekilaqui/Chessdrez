import { Logger } from '@nestjs/common';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EngineEvaluation } from '@chess-platform/shared';

@Processor('analysis-queue')
export class AnalysisProcessor extends WorkerHost {
    private readonly logger = new Logger(AnalysisProcessor.name);

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} of type ${job.name}`);

        switch (job.name) {
            case 'deep_analysis_job':
                return this.handleDeepAnalysis(job.data);
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }

    private async handleDeepAnalysis(data: { userId: string; fen: string; depth: number }): Promise<Partial<EngineEvaluation> & { fen: string; timestamp: string }> {
        this.logger.log(`Deep analysis for FEN: ${data.fen} at depth: ${data.depth}...`);

        // Simulating deep analysis process
        // In a real scenario, this would call Stockfish or a specialized engine service
        await new Promise(resolve => setTimeout(resolve, 5000));

        this.logger.log(`Analysis completed for FEN: ${data.fen}`);
        return {
            fen: data.fen,
            timestamp: new Date().toISOString(),
            bestMove: 'e2e4', // Mock result
            score: 0.35,
            isMate: false,
            mateMoves: null,
            multipv: []
        };
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job) {
        this.logger.log(`Job ${job.id} completed successfully`);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job, error: Error) {
        this.logger.error(`Job ${job.id} failed: ${error.message}`);
    }
}
