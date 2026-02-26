import { Controller, Post, Get, Body, UseGuards, Request, Param, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('games')
@UseGuards(AuthGuard('jwt'))
export class GamesController {
    constructor(private gamesService: GamesService) { }

    @Post()
    async create(@Request() req: any, @Body() body: any) {
        const { whitePlayerId, blackPlayerId, ...gameData } = body;
        return this.gamesService.create({
            ...gameData,
            status: 'playing',
            whitePlayer: whitePlayerId ? { connect: { id: whitePlayerId } } : undefined,
            blackPlayer: blackPlayerId ? { connect: { id: blackPlayerId } } : undefined,
        });
    }

    @Get()
    async findAll(@Request() req: any) {
        return this.gamesService.findByUser(req.user.userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.gamesService.findOne(id);
    }

    @Post(':id/moves')
    async addMove(@Param('id') id: string, @Body() body: any) {
        return this.gamesService.addMove({
            gameId: id,
            ply: body.ply ?? body.moveNumber,
            fen: body.fen,
            san: body.san ?? (body.sanUci && body.sanUci.includes(':') ? body.sanUci.split(':')[0] : body.sanUci),
            uci: body.uci ?? (body.sanUci && body.sanUci.includes(':') ? body.sanUci.split(':')[1] : undefined),
            eval_before: body.evalBefore ?? body.eval_before,
            eval_after: body.evalAfter ?? body.eval_after,
            delta: body.delta,
            classification: body.classification
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.gamesService.update(id, body);
    }
}
