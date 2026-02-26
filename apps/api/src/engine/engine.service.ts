import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

export interface BestMoveResult {
    bestMove: string | null;
    score?: number | null;
    raw?: string[];
}

@Injectable()
export class EngineService {
    private readonly logger = new Logger(EngineService.name);

    async getBestMove(fen: string, depth = 15, timeoutMs = 5000): Promise<BestMoveResult> {
        return new Promise((resolve) => {
            let resolved = false;
            const out: string[] = [];

            // Spawn the system stockfish binary (assumes 'stockfish' is in PATH)
            const proc = spawn('stockfish', [], { stdio: ['pipe', 'pipe', 'pipe'] });

            const kill = () => {
                try { proc.kill(); } catch (e) { /* ignore */ }
            };

            const timer = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    kill();
                    this.logger.warn('EngineService: timeout waiting for bestmove');
                    resolve({ bestMove: null, raw: out });
                }
            }, timeoutMs);

            proc.stdout.on('data', (chunk: Buffer) => {
                const s = chunk.toString();
                s.split(/\r?\n/).forEach(line => {
                    if (!line) return;
                    out.push(line);
                    // Final response
                    if (line.startsWith('bestmove')) {
                        const parts = line.split(' ');
                        const move = parts[1] || null;
                        if (!resolved) {
                            resolved = true;
                            clearTimeout(timer);
                            kill();
                            resolve({ bestMove: move, raw: out });
                        }
                    }
                });
            });

            proc.stderr.on('data', (chunk: Buffer) => {
                this.logger.debug('Engine stderr: ' + chunk.toString());
            });

            proc.on('error', (err) => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    resolve({ bestMove: null, raw: out });
                }
            });

            // Send UCI commands
            try {
                proc.stdin.write('uci\n');
                proc.stdin.write('isready\n');
                proc.stdin.write(`position fen ${fen}\n`);
                proc.stdin.write(`go depth ${depth}\n`);
            } catch (e) {
                // ignore write failures
            }
        });
    }
}
