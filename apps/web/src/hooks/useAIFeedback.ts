import { useState, useCallback } from 'react';

export interface AIExplanationRequest {
    fen: string;
    lastMove: string;
    evaluation: string;
    context?: string;
    provider?: string;
    apiKey?: string;
}

export function useAIFeedback() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getExplanation = useCallback(async (data: AIExplanationRequest): Promise<string | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/ai/explain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al obtener la explicación de la IA');
            }

            const result = await response.json();
            return result.explanation;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error desconocido';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { getExplanation, loading, error };
}
