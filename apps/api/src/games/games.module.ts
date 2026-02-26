import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { GamesProcessor } from './games.processor';

@Module({
    imports: [
        PrismaModule,
        BullModule.registerQueue({
            name: 'games-queue',
        }),
    ],
    providers: [GamesService],
    controllers: [GamesController],
    exports: [GamesService],
})
export class GamesModule { }
