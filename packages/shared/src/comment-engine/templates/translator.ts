import { MoveComment } from '../types';
import { es } from './es';
import { en } from './en';

const languages: Record<string, any> = { es, en };

export class CommentTranslator {
    static translate(comment: MoveComment, lang: 'es' | 'en' = 'es'): string {
        const t = languages[lang];
        let text = t.categories[comment.category];

        if (comment.heuristics.length > 0) {
            const hText = comment.heuristics
                .map(h => t.heuristics[h.id] || h.id)
                .join(' ');
            text += ` ${hText}`;
        }

        if (comment.opening) {
            text += ` (${comment.opening.name})`;
        }

        return text;
    }
}
