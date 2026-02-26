import { useState, useEffect, useRef, useCallback } from 'react';
import { Color } from '@chess-platform/shared';

interface UseChessClockProps {
    timeWInitial: number | null;
    timeBInitial: number | null;
    turn: Color;
    isGameOver: boolean;
    onTimeOut: (loserColor: Color) => void;
}

// Use requestAnimationFrame for a robust clock loop that doesn't pause
// when tabs lose focus as easily, and uses real elapsed time for accuracy.
export const useChessClock = ({
    timeWInitial,
    timeBInitial,
    turn,
    isGameOver,
    onTimeOut
}: UseChessClockProps) => {
    const [timeW, setTimeW] = useState<number | null>(timeWInitial);
    const [timeB, setTimeB] = useState<number | null>(timeBInitial);
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);
    const runningRef = useRef(false);
    const timeOutReportedRef = useRef(false);

    useEffect(() => {
        setTimeW(timeWInitial);
        setTimeB(timeBInitial);
        timeOutReportedRef.current = false;
    }, [timeWInitial, timeBInitial]);

    useEffect(() => {
        const tick = (ts: number) => {
            if (!lastTsRef.current) lastTsRef.current = ts;
            const deltaMs = ts - lastTsRef.current;
            lastTsRef.current = ts;

            const deltaSec = Math.max(0, deltaMs / 1000);

            if (!runningRef.current) return;

            if (turn === 'w') {
                setTimeW(t => {
                    if (t === null) return null;
                    const next = +(t - deltaSec).toFixed(1);
                    if (next <= 0 && !timeOutReportedRef.current) {
                        timeOutReportedRef.current = true;
                        onTimeOut('w');
                        return 0;
                    }
                    return next > 0 ? next : 0;
                });
            } else {
                setTimeB(t => {
                    if (t === null) return null;
                    const next = +(t - deltaSec).toFixed(1);
                    if (next <= 0 && !timeOutReportedRef.current) {
                        timeOutReportedRef.current = true;
                        onTimeOut('b');
                        return 0;
                    }
                    return next > 0 ? next : 0;
                });
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        if (isGameOver) {
            runningRef.current = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTsRef.current = null;
            return;
        }

        // start loop
        runningRef.current = true;
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            runningRef.current = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTsRef.current = null;
        };
        // Intentionally not listing timeW/timeB so the loop isn't restarted every tick
    }, [turn, isGameOver, onTimeOut]);

    const formatTime = useCallback((seconds: number | null) => {
        if (seconds === null) return '--:--';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }, []);

    return {
        timeW,
        timeB,
        formatTime
    };
};
