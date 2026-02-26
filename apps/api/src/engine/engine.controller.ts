import { Controller, Post, Body } from '@nestjs/common';
import { EngineService } from './engine.service';

import { IsString, IsOptional, IsNumber } from 'class-validator';

class BestMoveDto {
    @IsString()
    fen: string;

    @IsOptional()
    @IsNumber()
    depth?: number;
}

@Controller('engine')
export class EngineController {
    constructor(private readonly engineService: EngineService) { }

    @Post('bestmove')
    async bestMove(@Body() body: BestMoveDto) {
        const fen = body.fen;
        const depth = body.depth || 15;
        const res = await this.engineService.getBestMove(fen, depth, 7000);
        return res;
    }
}
