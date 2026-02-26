const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
    try {
        const userCount = await prisma.user.count();
        console.log('Total users in DB:', userCount);

        const latestUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, email: true, createdAt: true }
        });
        console.log('Latest 5 users:', JSON.stringify(latestUsers, null, 2));
    } catch (e) {
        console.error('Error checking DB:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkDb();
