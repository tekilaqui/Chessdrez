import { Module } from '@nestjs/common';
import { PuzzlesService } from './puzzles.service';
import { PuzzlesController } from './puzzles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { PuzzlesProcessor } from './puzzles.processor';

@Module({
    imports: [
        PrismaModule,
        BullModule.registerQueue({
            name: 'puzzles-queue',
        }),
    ],
    providers: [PuzzlesService],
    controllers: [PuzzlesController],
    exports: [PuzzlesService],
})
export class PuzzlesModule { }
