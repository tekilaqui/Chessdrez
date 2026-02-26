import { EngineEvaluation, parseEngineInfo, EngineMove } from '@chess-platform/shared';
export type { EngineEvaluation, EngineMove };

export type EngineCallback = (evalu: EngineEvaluation) => void;

class EngineManager {
    private worker: Worker | null = null;
    private isReady: boolean = false;
    private currentEval: EngineEvaluation = this.getEmptyEval();

    // Callbacks
    private onReadyCb: (() => void) | null = null;
    private onEvalUpdateCbs: Set<EngineCallback> = new Set();
    private onErrorCbs: Set<(err: string) => void> = new Set();

    // Turn tracking for relative score calculation
    private currentTurn: 'w' | 'b' = 'w';

    constructor() {
        this.init();
    }

    public init() {
        if (typeof window === 'undefined') return; // Do not run on SSR/Node
        if (this.worker) return; // Already running

        try {
            this.worker = new Worker('/stockfish.js');
        } catch (err) {
            console.error('EngineManager: Failed to initialize worker.', err);
            this.notifyError('El motor de ajedrez no pudo cargarse.');
            return;
        }

        this.worker.onerror = (e) => {
            console.error('EngineManager worker error:', e);
            this.notifyError('Error interno en el motor de ajedrez.');
            this.isReady = false;
        };

        this.worker.onmessage = this.handleMessage.bind(this);

        // Boilerplate startup protocol
        this.worker.postMessage('uci');
        this.worker.postMessage('setoption name MultiPV value 3');
        this.worker.postMessage('setoption name Skill Level value 20');
        this.worker.postMessage('isready');
    }

    private getEmptyEval(): EngineEvaluation {
        return {
            score: null,
            isMate: false,
            mateMoves: null,
            bestMove: null,
            multipv: []
        };
    }

    private handleMessage(e: MessageEvent) {
        const msg = e.data as string;

        if (msg === 'readyok') {
            this.isReady = true;
            if (this.onReadyCb) {
                this.onReadyCb();
            }
            return;
        }

        // Parse info messages
        if (msg.startsWith('info depth')) {
            const newEval = parseEngineInfo(msg, this.currentTurn, this.currentEval);
            this.currentEval = newEval;
            this.notifyEvalUpdate();
        }

        // Final bestmove msg
        if (msg.startsWith('bestmove')) {
            const parts = msg.split(' ');
            const movePart = parts[1];
            console.log('[EngineManager] Best move received:', movePart, 'for turn:', this.currentTurn);

            // Only update if it's a valid move
            if (movePart && movePart !== '(none)') {
                this.currentEval = {
                    ...this.currentEval,
                    bestMove: movePart
                };
                this.notifyEvalUpdate();
            }
        }
    }


    private notifyEvalUpdate() {
        for (const cb of this.onEvalUpdateCbs) {
            // Include the turn for which this evaluation was produced so consumers
            // can know which side the engine was analyzing for.
            const payload: any = { ...this.currentEval, multipv: [...this.currentEval.multipv], analysisTurn: this.currentTurn };
            try {
                cb(payload as EngineEvaluation);
            } catch (err) {
                // Fallback: call without cast if subscriber expects plain object
                (cb as any)(payload);
            }
        }
    }

    private notifyError(err: string) {
        for (const cb of this.onErrorCbs) {
            cb(err);
        }
    }

    // --- Public API ---

    public onReady(cb: () => void) {
        if (this.isReady) {
            cb();
        } else {
            this.onReadyCb = cb;
        }
    }

    public getIsReady() {
        return this.isReady;
    }

    public subscribe(cb: EngineCallback): () => void {
        this.onEvalUpdateCbs.add(cb);
        // Fire immediately with current state
        cb({ ...this.currentEval, multipv: [...this.currentEval.multipv] });

        return () => {
            this.onEvalUpdateCbs.delete(cb);
        };
    }

    public onError(cb: (err: string) => void): () => void {
        this.onErrorCbs.add(cb);
        return () => {
            this.onErrorCbs.delete(cb);
        };
    }

    public stop() {
        this.worker?.postMessage('stop');
    }

    public analyze(fen: string, goParams: string = "depth 15") {
        if (!this.worker || !this.isReady) return;

        this.stop();
        this.worker.postMessage('isready'); // Wait for stop to complete implicitly

        this.currentEval = this.getEmptyEval();
        this.currentTurn = fen.split(' ')[1] as 'w' | 'b' || 'w';

        this.worker.postMessage(`position fen ${fen}`);
        this.worker.postMessage(`go ${goParams}`);
    }

    public getBestMoveOnce(fen: string, level: number = 20): Promise<string | null> {
        const callBackend = async (): Promise<string | null> => {
            try {
                const apiBase = (typeof window !== 'undefined' && (window as any).VITE_API_URL) || 'http://localhost:3000';
                const url = `${apiBase}/engine/bestmove`;
                const resp = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fen, depth: Math.max(8, Math.min(20, level)) })
                });
                if (!resp.ok) return null;
                const json = await resp.json();
                return json?.bestMove || null;
            } catch (e) { return null; }
        };

        return new Promise((resolve) => {
            if (!this.worker || !this.isReady) {
                // Try backend native engine as fallback
                callBackend().then(m => resolve(m)).catch(() => resolve(null));
                return;
            }

            // Depth ranges from 1 to 20 (capped at 18 for browser stability)
            const depth = Math.max(1, Math.min(18, level));

            // Built-in Skill Level handles most realism, but we keep some deviation for lower levels
            this.setSkillLevel(level);

            let resolved = false;

            // Soft timeout scales with level. Lower levels move almost instantly.
            // Increased base and multiplier to reduce premature stops on slower environments.
            const softTimeoutMs = 600 + (level * 200);

            console.log('[EngineManager] getBestMoveOnce START', { fen: fen.substring(0, 40), level, softTimeoutMs });

            const softTimeout = setTimeout(() => {
                console.warn('[EngineManager] softTimeout fired (no stop)', { fen: fen.substring(0, 40), level, softTimeoutMs });
                // Do NOT call this.stop() here — stopping the worker while it finishes
                // can cause races where the engine's eventual 'bestmove' arrives after
                // we resolved null. We rely on the hard timeout to resolve null if
                // nothing arrives.
            }, softTimeoutMs);

            // Hard timeout ensures the promise resolves eventually if engine never returns
            const hardTimeout = setTimeout(async () => {
                console.error('[EngineManager] hardTimeout fired — attempting backend fallback', { fen: fen.substring(0, 40), level });
                if (!resolved) {
                    resolved = true;
                    if (unsub) unsub();
                    // Attempt backend native engine
                    const backendMove = await callBackend();
                    resolve(backendMove);
                }
            }, softTimeoutMs + 3000);

            let unsub: (() => void) | null = null;
            const startTime = Date.now();
            let analysisStarted = false;

            const onEval = (ev: EngineEvaluation) => {
                // Ignore the very first update if it's just the previous state
                if (!analysisStarted) {
                    analysisStarted = true;
                    return;
                }

                if (ev.bestMove && !resolved) {
                    // Check if this bestmove actually belongs to the current FEN
                    // We can't strictly verify FEN in UCI easily, but we can check if it's a new result
                    console.log('[EngineManager] Found move for', fen.substring(0, 20), ':', ev.bestMove);

                    resolved = true;
                    // ... rest of the logic
                    clearTimeout(softTimeout);
                    clearTimeout(hardTimeout);
                    if (unsub) unsub();

                    let chosenMove = ev.bestMove;

                    console.log('[EngineManager] resolving best move', { fen: fen.substring(0, 40), evBest: ev.bestMove, chosenBeforeDeviation: chosenMove });

                    const deviationChance = level >= 18 ? 0 : (20 - level) * 0.02;

                    // Deviation logic: randomly pick 2nd or 3rd best line to simulate human error
                    if (level < 18 && ev.multipv && ev.multipv.length > 1) {
                        if (Math.random() < deviationChance) {
                            const alternatives = ev.multipv.slice(1, 4).filter(m => m && m.move);
                            if (alternatives.length > 0) {
                                const randomAlt = alternatives[Math.floor(Math.random() * alternatives.length)];
                                chosenMove = randomAlt.move;
                            }
                        }
                    }

                    // Simulated thinking time: Base delay + variance + scaling with level
                    const baseDelay = 300 + Math.random() * 400;
                    const levelDelay = level * 40; // Up to 800ms extra for level 20
                    const targetTotalDelay = baseDelay + levelDelay;

                    const engineTimeTaken = Date.now() - startTime;
                    const remainingDelay = Math.max(0, targetTotalDelay - engineTimeTaken);

                    if (remainingDelay > 0) {
                        setTimeout(() => {
                            console.log('[EngineManager] resolve after delay', { chosenMove, remainingDelay });
                            resolve(chosenMove);
                        }, remainingDelay);
                    } else {
                        console.log('[EngineManager] resolve immediate', { chosenMove });
                        resolve(chosenMove);
                    }
                }
            };

            // Log subscription events to help debug engine stalls
            const debugOnEval = (ev: EngineEvaluation) => {
                console.log('[EngineManager DEBUG] eval update', { score: ev.score, bestMove: ev.bestMove, multipv: ev.multipv?.slice(0, 3) });
            };

            this.analyze(fen, `depth ${depth} movetime ${softTimeoutMs}`);
            unsub = this.subscribe(onEval);
        });
    }

    public setMultiPv(lines: number) {
        this.worker?.postMessage(`setoption name MultiPV value ${lines}`);
    }

    public setSkillLevel(level: number) {
        // level 0-20
        const clamped = Math.max(0, Math.min(20, level));
        this.worker?.postMessage(`setoption name Skill Level value ${clamped}`);
    }

    public async getMovesForSquare(fen: string, square: string, depth: number = 15): Promise<EngineEvaluation> {
        return new Promise((resolve) => {
            if (!this.worker || !this.isReady) {
                resolve(this.getEmptyEval());
                return;
            }

            // We use higher MultiPV to find moves for specific square
            this.setMultiPv(20);
            this.analyze(fen, `depth ${depth}`);

            let unsub: (() => void) | null = null;
            const timeout = setTimeout(() => {
                this.stop();
                if (unsub) unsub();
                // Filter current results even if incomplete
                const filtered = {
                    ...this.currentEval,
                    multipv: this.currentEval.multipv.filter(m => m.move?.startsWith(square))
                };
                resolve(filtered);
            }, 3000);

            unsub = this.subscribe((ev) => {
                // If we found enough moves or depth reached
                // For simplicity, we just wait for the timeout or a manual stop if we want to be faster
            });
        });
    }

    public destroy() {
        this.worker?.terminate();
        this.worker = null;
        this.onEvalUpdateCbs.clear();
        this.onErrorCbs.clear();
        this.isReady = false;
    }
}

// Create a singleton instance so we only load ONE worker globally
export const engineManager = new EngineManager();
