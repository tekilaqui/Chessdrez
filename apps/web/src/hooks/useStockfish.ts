import { useEffect, useRef, useCallback, useState } from 'react';

interface Evaluation {
    bestMove: string | null;
    score: number | null;
    isMate: boolean;
    mateMoves: number | null;
}

interface StockfishHook {
    getEvaluation: (fen: string, depth?: number) => Promise<Evaluation>;
    getBestMove: (fen: string, level?: number) => Promise<string | null>;
    isReady: boolean;
    engineError: string | null;
}

export function useStockfish(): StockfishHook {
    const workerRef = useRef<Worker | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [engineError, setEngineError] = useState<string | null>(null);
    const pendingResolveRef = useRef<((evalu: Evaluation) => void) | null>(null);
    const syncCallbackRef = useRef<(() => void) | null>(null);
    const turnRef = useRef('w');
    const isReadyRef = useRef(false);

    useEffect(() => {
        let worker: Worker | null = null;

        try {
            console.log('Stockfish: Iniciando trabajador desde /stockfish.js...');
            worker = new Worker('/stockfish.js');
        } catch (err) {
            console.error('Stockfish: No se pudo crear el Worker:', err);
            setEngineError('Tu navegador no permite iniciar el motor de ajedrez. Prueba en otro navegador.');
            return;
        }

        workerRef.current = worker;

        // Handle worker errors (network 404, security policy, etc.)
        worker.onerror = (e) => {
            console.error('Stockfish worker error:', e);
            setEngineError('El motor de ajedrez no pudo cargarse. Comprueba la conexión o usa otro navegador.');
            setIsReady(false);
        };

        worker.postMessage('uci');
        worker.postMessage('isready');

        let lastInfo: Evaluation = { bestMove: null, score: 0, isMate: false, mateMoves: null };

        worker.onmessage = (e) => {
            try {
                const msg = e.data as string;

                if (msg === 'readyok') {
                    console.log('Stockfish: Motor listo.');
                    if (!isReadyRef.current) {
                        isReadyRef.current = true;
                        setIsReady(true);
                    }
                    if (syncCallbackRef.current) {
                        syncCallbackRef.current();
                        syncCallbackRef.current = null;
                    }
                }

                if (msg.startsWith('info depth')) {
                    const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
                    if (scoreMatch) {
                        const type = scoreMatch[1];
                        const val = parseInt(scoreMatch[2]);
                        let finalScore = val;
                        if (turnRef.current === 'b') finalScore = -val;

                        if (type === 'cp') {
                            lastInfo.score = finalScore / 100;
                            lastInfo.isMate = false;
                        } else {
                            lastInfo.isMate = true;
                            lastInfo.mateMoves = Math.abs(val);
                            lastInfo.score = val > 0 ? 999 : -999;
                        }
                    }
                }

                if (msg.startsWith('bestmove')) {
                    const movePart = msg.split(' ')[1];
                    lastInfo.bestMove = movePart === '(none)' ? null : movePart;

                    if (pendingResolveRef.current && !syncCallbackRef.current) {
                        pendingResolveRef.current({ ...lastInfo });
                        pendingResolveRef.current = null;
                    }
                    lastInfo = { bestMove: null, score: 0, isMate: false, mateMoves: null };
                }
            } catch (err) {
                console.error('Stockfish: Error procesando mensaje:', err);
            }
        };

        return () => {
            try { worker?.terminate(); } catch { /* ignore */ }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only on mount

    const getEvaluation = useCallback(async (fen: string, depth: number = 12): Promise<Evaluation> => {
        if (!workerRef.current || !isReadyRef.current) {
            return { bestMove: null, score: 0, isMate: false, mateMoves: null };
        }

        return new Promise((resolve) => {
            let isResolved = false;

            // Timeout de seguridad para evitar que la interfaz se congele o bloquee
            const timeout = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    resolve({ bestMove: null, score: null, isMate: false, mateMoves: null });
                }
            }, 5000);

            try {
                // Detener cualquier cálculo previo antes de una nueva petición
                workerRef.current?.postMessage('stop');
                workerRef.current?.postMessage('isready');

                pendingResolveRef.current = (evalu: Evaluation) => {
                    if (!isResolved) {
                        isResolved = true;
                        clearTimeout(timeout);
                        resolve(evalu);
                    }
                };

                syncCallbackRef.current = () => {
                    if (isResolved) return;
                    turnRef.current = fen.split(' ')[1] || 'w';
                    workerRef.current?.postMessage(`position fen ${fen}`);
                    workerRef.current?.postMessage(`go depth ${depth}`);
                };
            } catch (err) {
                console.error('Stockfish: Error al consultar posición:', err);
                if (!isResolved) {
                    isResolved = true;
                    clearTimeout(timeout);
                    resolve({ bestMove: null, score: null, isMate: false, mateMoves: null });
                }
            }
        });
    }, []);

    const getBestMove = useCallback(async (fen: string, level: number = 3): Promise<string | null> => {
        try {
            // Limitar profundidad en móviles para evitar bloqueos
            const isMobile = window.innerWidth < 768;
            const maxDepth = isMobile ? 8 : 16;
            const depth = Math.min(maxDepth, level <= 2 ? 4 : level <= 4 ? 8 : level <= 6 ? 12 : 16);

            const evalResult = await getEvaluation(fen, depth);
            return evalResult?.bestMove || null;
        } catch (err) {
            console.error('Stockfish: Error calculando mejor movimiento:', err);
            return null;
        }
    }, [getEvaluation]);

    return { getEvaluation, getBestMove, isReady, engineError };
}
