import { Injectable } from '@nestjs/common';

import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AnalysisService {
    constructor(@InjectQueue('analysis-queue') private readonly analysisQueue: Queue) { }

    async requestAnalysis(userId: string, fen: string, depth: number = 20) {
        // Idempotencia: evitamos duplicar análisis idénticos en cola
        const jobId = `analysis:${fen}:${depth}`;

        const job = await this.analysisQueue.add('deep_analysis_job', {
            userId,
            fen,
            depth
        }, {
            jobId,
            removeOnComplete: true,
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 2000
            }
        });

        return { jobId: job.id, status: 'queued' };
    }
    async requestBatchAnalysis(userId: string, fens: string[], depth: number = 20) {
        const results = await Promise.all(fens.map(fen => this.requestAnalysis(userId, fen, depth)));
        return {
            count: results.length,
            jobs: results.map(r => r.jobId)
        };
    }
}
