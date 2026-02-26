import { Lesson } from '../domain-types';

export const lessons: Lesson[] = [
    {
        id: 'rook-move',
        title: 'Movimiento de la Torre',
        category: 'fundamentals',
        difficulty: 'beginner',
        steps: [
            {
                description: 'La torre se mueve en líneas rectas, horizontal o verticalmente.',
                fen: 'k7/8/8/8/4R3/8/8/K7 w - - 0 1',
                expectedMove: 'e4e8',
                commentary: '¡Excelente! Has movido la torre hasta el final de la columna.'
            },
            {
                description: 'Ahora mueve la torre horizontalmente para capturar el peón negro.',
                fen: 'k7/8/8/8/4R2p/8/8/K7 w - - 0 1',
                expectedMove: 'e4h4',
                commentary: '¡Bien hecho! Las torres son muy potentes en filas abiertas.'
            }
        ]
    },
    {
        id: 'scholar-mate',
        title: 'Mate del Pastor',
        category: 'tactics',
        difficulty: 'beginner',
        steps: [
            {
                description: 'El mate del pastor ataca el punto débil f7.',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5Q2/PPPP1PPP/RNB1KBNR w KQkq - 0 1',
                expectedMove: 'f1c4',
                commentary: 'El alfil apunta directamente a f7, coordinando con la dama.'
            },
            {
                description: 'Las negras no se dan cuenta. ¡Da el jaque mate!',
                fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1KBNR w KQkq - 0 1',
                expectedMove: 'f3f7',
                commentary: '¡Jaque mate! La dama está protegida por el alfil y el rey no puede escapar.'
            }
        ]
    },
    {
        id: 'ladder-mate',
        title: 'Mate de la Escalera',
        category: 'endgames',
        difficulty: 'beginner',
        steps: [
            {
                description: 'Usa tus dos torres para empujar al rey al borde del tablero.',
                fen: '4k3/8/8/8/8/8/2R5/3R1K2 w - - 0 1',
                expectedMove: 'd1d7',
                commentary: 'La primera torre corta la retirada del rey.'
            },
            {
                description: 'Ahora da el golpe final con la otra torre.',
                fen: '4k3/3R4/8/8/8/8/2R2K2/8 w - - 0 1',
                expectedMove: 'c2c8',
                commentary: '¡Perfecto! El mate de la escalera es fundamental para ganar finales con ventaja de material.'
            }
        ]
    }
];
