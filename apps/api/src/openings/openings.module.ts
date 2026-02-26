import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsService } from './openings.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OpeningsController],
    providers: [OpeningsService],
    exports: [OpeningsService],
})
export class OpeningsModule { }
