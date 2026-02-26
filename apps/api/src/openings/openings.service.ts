import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OpeningsService {
    constructor(private prisma: PrismaService) { }

    async findAllBasic() {
        return this.prisma.opening.findMany({
            select: { eco: true, name: true, fenRoot: true }
        });
    }

    async findOne(eco: string) {
        const opening = await this.prisma.opening.findUnique({
            where: { eco }
        });

        if (!opening) {
            throw new NotFoundException(`Opening with ECO ${eco} not found`);
        }

        return opening;
    }
}
