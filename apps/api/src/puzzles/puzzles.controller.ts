import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { PuzzlesService } from './puzzles.service';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';

@Controller('puzzles')
@UseGuards(AuthGuard('jwt'))
export class PuzzlesController {
    constructor(private puzzlesService: PuzzlesService) { }

    @Get('next')
    async getNext(
        @Request() req,
        @Query('category') category?: string,
        @Query('difficulty') difficulty?: 'easy' | 'normal' | 'hard' | 'master'
    ) {
        return this.puzzlesService.getNextPuzzle(req.user.userId, category, difficulty);
    }

    @Throttle({ default: { limit: 30, ttl: 60000 } })
    @Post('attempt')
    async attempt(
        @Request() req,
        @Body() body: { puzzleId: string; success: boolean }
    ) {
        return this.puzzlesService.processAttempt(req.user.userId, body.puzzleId, body.success);
    }

    @Get('stats')
    async getStats(@Request() req) {
        return this.puzzlesService.getUserStats(req.user.userId);
    }
}
