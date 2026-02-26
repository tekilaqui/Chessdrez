import { Controller, Get, Param } from '@nestjs/common';
import { OpeningsService } from './openings.service';

@Controller('openings')
export class OpeningsController {
    constructor(private readonly openingsService: OpeningsService) { }

    @Get()
    async getAll() {
        return this.openingsService.findAllBasic();
    }

    @Get(':eco')
    async getOne(@Param('eco') eco: string) {
        return this.openingsService.findOne(eco);
    }
}
