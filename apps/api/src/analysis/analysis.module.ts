import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { AnalysisProcessor } from './analysis.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'analysis-queue',
    }),
  ],
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule { }
