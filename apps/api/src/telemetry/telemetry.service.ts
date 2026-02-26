import { Injectable } from '@nestjs/common';

@Injectable()
export class TelemetryService {
    logClientError(userId: string, error: any) {
        // For now, just log to console or a file
        // In a real app, this would go to Sentry, ELK, etc.
        console.error(`[TELEMETRY] User ${userId} reported error:`, error);
        return { status: 'logged' };
    }
}
