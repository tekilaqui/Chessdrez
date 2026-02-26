import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

// Read openings data directly from filesystem to avoid ESM/CJS build issues
const OPENINGS_DATA_PATH = path.join(__dirname, '../../../packages/shared/src/data/openings.json');
const OPENINGS_DATA = JSON.parse(fs.readFileSync(OPENINGS_DATA_PATH, 'utf-8'));

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log('Start seeding expanded openings...');

    // Flatten the nested openings data structure
    const allOpenings: any[] = [];

    (OPENINGS_DATA as any).forEach((group: any) => {
        group.items.forEach((item: any) => {
            // Add the main opening
            allOpenings.push({
                eco: item.tag || item.name.replace(/\s+/g, '_'),
                name: item.name,
                fenRoot: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                dataJson: JSON.stringify({
                    mainLine: item.moves || [],
                    explanations: item.steps?.map((s: any) => s.comment) || [],
                    groupName: group.group
                })
            });

            // Add variants if any
            if (item.variants) {
                item.variants.forEach((v: any) => {
                    allOpenings.push({
                        eco: v.tag || (item.tag + '_' + v.name.replace(/\s+/g, '_')),
                        name: `${item.name} (${v.name})`,
                        fenRoot: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                        dataJson: JSON.stringify({
                            mainLine: v.moves || [],
                            explanations: v.steps?.map((s: any) => s.comment) || [],
                            groupName: group.group
                        })
                    });
                });
            }
        });
    });

    console.log(`Prepared ${allOpenings.length} openings for seeding.`);

    for (const o of allOpenings) {
        await prisma.opening.upsert({
            where: { eco: o.eco },
            update: o,
            create: o,
        });
    }

    console.log('Seeding finished successfully.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Seed error:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
