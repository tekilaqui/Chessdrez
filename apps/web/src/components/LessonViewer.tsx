import React, { useState, useCallback, useEffect } from 'react';
import { ChessLogic, Lesson, LessonStep } from '@chess-platform/shared';
import ChessBoard from './ChessBoard';
import { ChevronRight, ChevronLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface LessonViewerProps {
    lesson: Lesson;
    onClose: () => void;
    onComplete?: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onClose, onComplete }) => {
    const { t } = useTranslation();
    if (!lesson || !lesson.steps || lesson.steps.length === 0) {
        return <div style={{ color: 'var(--text-muted)', padding: '2rem', textAlign: 'center' }}>{t.common.loading}</div>;
    }

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [game, setGame] = useState(() => new ChessLogic(lesson.steps[0].fen));
    const [status, setStatus] = useState<'learning' | 'success' | 'complete'>('learning');
    const [history, setHistory] = useState<string[]>([]);

    const currentStep = lesson.steps[currentStepIndex];

    useEffect(() => {
        setGame(new ChessLogic(currentStep.fen));
        setHistory([]);
        setStatus('learning');
    }, [currentStepIndex, currentStep.fen]);

    const onMove = useCallback((move: { from: string; to: string }) => {
        if (status === 'success' || status === 'complete') return;

        const moveStr = `${move.from}${move.to}`;
        const newGame = new ChessLogic(game.fen);
        const success = newGame.makeMove(move);

        if (success) {
            setGame(newGame);
            setHistory(prev => [...prev, moveStr]);

            if (currentStep.expectedMove) {
                if (moveStr === currentStep.expectedMove) {
                    setStatus('success');
                } else {
                    // Wrong move in lesson
                    setTimeout(() => {
                        setGame(new ChessLogic(currentStep.fen));
                        setHistory([]);
                    }, 1000);
                }
            } else {
                // Free move step (anything goes)
                setStatus('success');
            }
        }
    }, [game.fen, currentStep, status]);

    const nextStep = () => {
        if (currentStepIndex < lesson.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            setStatus('complete');
            if (onComplete) onComplete();
        }
    };

    const resetStep = () => {
        setGame(new ChessLogic(currentStep.fen));
        setHistory([]);
        setStatus('learning');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <div className="glass-card" style={{ padding: '0.75rem' }}>
                <ChessBoard
                    fen={game.fen}
                    onMove={onMove}
                    draggable={status === 'learning'}
                />
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.learn.step} {currentStepIndex + 1} {t.learn.of} {lesson.steps.length}
                    </span>
                    <button onClick={resetStep} className="btn-secondary" style={{ padding: '4px 8px' }} title={t.learn.resetStep}>
                        <RotateCcw size={16} />
                    </button>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{currentStep.description}</h3>

                <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                    {status === 'success' ? (
                        <div style={{ color: '#4ade80' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                <CheckCircle2 size={20} />
                                <strong style={{ fontSize: '0.9rem' }}>{t.puzzles.correct}</strong>
                            </div>
                            <p style={{ fontSize: '0.85rem' }}>{currentStep.commentary}</p>
                        </div>
                    ) : (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            {t.puzzles.yourTurn}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                        {t.common.close}
                    </button>
                    {(status === 'success' || status === 'complete') && (
                        <button onClick={status === 'complete' ? onClose : nextStep} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            {status === 'complete' ? t.common.close : (currentStepIndex < lesson.steps.length - 1 ? t.puzzles.next : t.learn.title)}
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonViewer;
