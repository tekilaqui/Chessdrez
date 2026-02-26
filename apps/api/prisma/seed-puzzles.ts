import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as fs from 'fs';
import * as path from 'path';

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || 'file:./dev.db' } as any);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log('Start seeding puzzles...');
    // Absolute path to the shared puzzles data
    const puzzlesPath = path.join(__dirname, '../../../packages/shared/src/data/puzzles.json');

    if (!fs.existsSync(puzzlesPath)) {
        console.error(`Puzzles file not found at: ${puzzlesPath}`);
        process.exit(1);
    }

    const puzzlesRaw = JSON.parse(fs.readFileSync(puzzlesPath, 'utf-8'));
    console.log(`Loaded ${puzzlesRaw.length} puzzles from JSON.`);

    let count = 0;
    // Using a transaction or batching would be faster, but for 5k records upsert is safe and simple
    for (const p of puzzlesRaw) {
        await prisma.puzzle.upsert({
            where: { id: p.PuzzleId },
            update: {
                fen: p.FEN,
                solution: p.Moves,
                rating: p.Rating,
                ratingDeviation: p.RatingDeviation,
                themes: p.Themes,
            },
            create: {
                id: p.PuzzleId,
                fen: p.FEN,
                solution: p.Moves,
                rating: p.Rating,
                ratingDeviation: p.RatingDeviation,
                themes: p.Themes,
            },
        });
        count++;
        if (count % 500 === 0) {
            console.log(`Seeded ${count} puzzles...`);
        }
    }
    console.log(`Seeding finished. Total: ${count} puzzles.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
