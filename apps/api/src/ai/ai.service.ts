import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
    private readonly logger = new Logger(AIService.name);

    constructor(private configService: ConfigService) { }

    async getMoveExplanation(
        fen: string,
        lastMove: string,
        evaluation: string,
        context: string,
        provider: string = 'openai',
        customApiKey?: string
    ): Promise<string> {
        const apiKey = customApiKey || this.configService.get<string>(`${provider.toUpperCase()}_API_KEY`);

        if (!apiKey) {
            this.logger.warn(`${provider.toUpperCase()}_API_KEY not configured`);
            return 'Configura una API Key para obtener explicaciones detalladas.';
        }

        const prompt = `Actúa como un Gran Maestro de ajedrez de élite explicando una posición a un estudiante. 

DATOS TÉCNICOS:
- FEN: ${fen}
- Última jugada: ${lastMove || 'Posición inicial'}
- Evaluación: ${evaluation}
- Contexto adicional: ${context}

TAREA:
Proporciona una explicación humana, precisa y poco genérica. No digas cosas obvias como "tienes ventaja". Explica EL PORQUÉ.
1. Describe la esencia de la posición (tensiones, estructura, seguridad).
2. Explica el plan estratégico inmediato (maniobras, rupturas).
3. Advierte sobre amenazas ocultas o errores típicos en este tipo de estructura.

ESTILO:
- Profesional pero cercano.
- Usa terminología técnica correcta (puestos avanzados, peones colgantes, iniciativa, etc.).
- Máximo 4-5 frases bien construidas.`;

        try {
            if (provider === 'openai') {
                return await this.callOpenAI(apiKey, prompt);
            } else if (provider === 'claude') {
                return await this.callClaude(apiKey, prompt);
            } else if (provider === 'perplexity') {
                return await this.callPerplexity(apiKey, prompt);
            }
            return 'Proveedor no reconocido.';
        } catch (error) {
            this.logger.error(`Error in AI Service (${provider}):`, error);
            return 'No se puede contactar con el maestro virtual en este momento.';
        }
    }

    private async callOpenAI(apiKey: string, prompt: string): Promise<string> {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Eres un maestro de ajedrez experto y didáctico.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }

    private async callClaude(apiKey: string, prompt: string): Promise<string> {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 200,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) throw new Error(`Claude error: ${response.status}`);
        const data = await response.json();
        return data.content[0].text;
    }

    private async callPerplexity(apiKey: string, prompt: string): Promise<string> {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3-sonar-small-32k-chat',
                messages: [
                    { role: 'system', content: 'Eres un maestro de ajedrez experto.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 200
            })
        });

        if (!response.ok) throw new Error(`Perplexity error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }
}
