import { Controller, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Patch('rating')
    async updateRating(@Request() req, @Body() body: {
        ratingType: 'elo' | 'puzzleRating',
        newRating: number,
        puzzleId?: string,
        success?: boolean,
        delta?: number
    }) {
        return this.usersService.updateRating(req.user.userId, body);
    }
}
