import { Module } from '@nestjs/common';
import { RepertoireService } from './repertoire.service';
import { RepertoireController } from './repertoire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [RepertoireController],
    providers: [RepertoireService],
    exports: [RepertoireService]
})
export class RepertoireModule { }
