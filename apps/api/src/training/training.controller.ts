import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TrainingService } from './training.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('training')
@UseGuards(AuthGuard('jwt'))
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

    @Get('progress')
    async getAllProgress(@Request() req) {
        return this.trainingService.getProgress(req.user.id);
    }

    @Get('progress/:eco')
    async getProgressForEco(@Request() req, @Param('eco') eco: string) {
        return this.trainingService.getProgress(req.user.id, eco);
    }

    @Post('progress/:eco')
    async saveProgress(
        @Request() req,
        @Param('eco') eco: string,
        @Body() body: { progress: number; history?: string }
    ) {
        return this.trainingService.saveProgress(req.user.id, eco, body.progress, body.history);
    }
}
