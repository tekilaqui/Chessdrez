import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
        const adapter = new PrismaBetterSqlite3({ url: dbUrl });

        super({
            adapter
        } as any);
    }

    async onModuleInit() {
        await this.$connect();
    }
}

