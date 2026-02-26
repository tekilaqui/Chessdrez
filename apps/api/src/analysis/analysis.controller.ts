import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalysisService } from './analysis.service';
import { Throttle } from '@nestjs/throttler';

@Controller('analysis')
@UseGuards(AuthGuard('jwt'))
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) { }

    @Post('request')
    async request(@Request() req, @Body() body: { fen: string; depth?: number }) {
        return this.analysisService.requestAnalysis(req.user.userId, body.fen, body.depth);
    }
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('batch')
    async requestBatch(@Request() req, @Body() body: { fens: string[]; depth?: number }) {
        return this.analysisService.requestBatchAnalysis(req.user.userId, body.fens, body.depth);
    }
}
