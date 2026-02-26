
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const openings = await prisma.opening.findMany({
        take: 5
    });
    console.log(JSON.stringify(openings, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
