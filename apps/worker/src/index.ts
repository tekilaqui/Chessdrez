import { Worker } from 'bullmq';

let connection: any;

if (!process.env.REDIS_URL && !process.env.REDIS_HOST) {
    console.log('[WORKER] Redis not found, using ioredis-mock');
    const RedisMock = require('ioredis-mock');
    connection = new RedisMock();
} else {
    connection = process.env.REDIS_URL ? {
        url: process.env.REDIS_URL
    } : {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    };
}

const chessWorker = new Worker('chess-queue', async job => {
    console.log(`[CHESS] Processing ${job.name}:`, job.id);
    if (job.name === 'puzzle_generation_job') {
        console.log('Generating puzzles...');
        // Simulation
    }
}, { connection });

const analysisWorker = new Worker('analysis-queue', async job => {
    console.log(`[ANALYSIS] Processing ${job.name}:`, job.id);

    if (job.name === 'deep_analysis_job') {
        console.log(`[DEEP ANALYSIS] FEN: ${job.data.fen}, Depth: ${job.data.depth}`);
        await new Promise(r => setTimeout(r, 3000));
    }

    if (job.name === 'comment_enrichment_job') {
        console.log(`[ENRICHMENT] Enriching move comment...`);
        // Use CommentEngine here soon
    }
}, { connection });

console.log('Workers started: chess-queue, analysis-queue');
