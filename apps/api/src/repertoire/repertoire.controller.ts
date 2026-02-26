import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RepertoireService } from './repertoire.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('repertoire')
@UseGuards(AuthGuard('jwt'))
export class RepertoireController {
    constructor(private readonly repertoireService: RepertoireService) { }

    @Get()
    async getRepertoire(@Request() req) {
        return this.repertoireService.getRepertoire(req.user.id);
    }

    @Post()
    async add(@Request() req, @Body() body: { eco: string; side: string }) {
        return this.repertoireService.addToRepertoire(req.user.id, body.eco, body.side);
    }

    @Delete(':eco')
    async remove(@Request() req, @Param('eco') eco: string) {
        return this.repertoireService.removeFromRepertoire(req.user.id, eco);
    }
}
