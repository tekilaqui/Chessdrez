import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';

import { IsString, IsOptional } from 'class-validator';

class ExplainMoveDto {
    @IsString()
    fen: string;

    @IsString()
    lastMove: string;

    @IsString()
    evaluation: string;

    @IsOptional()
    @IsString()
    context?: string;

    @IsOptional()
    @IsString()
    provider?: string;

    @IsOptional()
    @IsString()
    apiKey?: string;
}

@Controller('ai')
export class AIController {
    constructor(private readonly aiService: AIService) { }

    @Post('explain')
    async explainMove(@Body() body: ExplainMoveDto) {
        return {
            explanation: await this.aiService.getMoveExplanation(
                body.fen,
                body.lastMove,
                body.evaluation,
                body.context || '',
                body.provider || 'openai',
                body.apiKey
            )
        };
    }
}
