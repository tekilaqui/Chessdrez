import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { OpeningsModule } from './openings/openings.module';
import { TrainingModule } from './training/training.module';
import { RepertoireModule } from './repertoire/repertoire.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AnalysisModule } from './analysis/analysis.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { AIModule } from './ai/ai.module';
import { ThrottlerModule } from '@nestjs/throttler';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 20,
        }]),
        BullModule.forRootAsync({
            useFactory: async () => {
                const REDIS_URL = process.env.REDIS_URL;
                if (!REDIS_URL && !process.env.REDIS_HOST && process.env.NODE_ENV !== 'production') {
                    // Import inside factor to avoid issues if not installed in production
                    const RedisMock = require('ioredis-mock');
                    return {
                        connection: new RedisMock()
                    };
                }
                return {
                    connection: REDIS_URL ? { url: REDIS_URL } : {
                        host: process.env.REDIS_HOST || 'localhost',
                        port: parseInt(process.env.REDIS_PORT || '6379'),
                    },
                };
            }
        }),
        PrismaModule,
        AuthModule,
        UsersModule,
        GamesModule,
        OpeningsModule,
        TrainingModule,
        RepertoireModule,
        PuzzlesModule,
        AnalysisModule,
        TelemetryModule,
        AIModule,
        // Engine module exposes a lightweight native engine API backed by system stockfish
        require('./engine/engine.module').EngineModule
    ],
    controllers: [],
    providers: [
        /*
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        */
    ],
})
export class AppModule { }
