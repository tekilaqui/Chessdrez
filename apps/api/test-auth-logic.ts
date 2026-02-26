import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function test() {
    const prisma = new PrismaClient();
    console.log('Testing Database connection...');
    try {
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);

        console.log('Testing bcrypt...');
        const start = Date.now();
        const hash = await bcrypt.hash('password123', 10);
        const match = await bcrypt.compare('password123', hash);
        console.log(`bcrypt test: ${match} (took ${Date.now() - start}ms)`);

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

test();
