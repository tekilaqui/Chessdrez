import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
@UseGuards(AuthGuard('jwt'))
export class TelemetryController {
    constructor(private readonly telemetryService: TelemetryService) { }

    @Post('error')
    async logError(@Request() req, @Body() body: { error: any }) {
        return this.telemetryService.logClientError(req.user.userId, body.error);
    }
}
