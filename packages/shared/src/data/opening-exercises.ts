// Opening-specific exercises for the Exercises tab in the Openings module.
// Each exercise focuses on a typical tactical motif that arises from a specific opening.

export interface OpeningExercise {
    id: string;
    openingTag: string;       // matches Opening.tag in openings.json
    openingName: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    fen: string;              // starting position for the exercise
    solution: string[];       // UCI moves, e.g. ['e2e4', 'e7e5']
    hint: string;             // hint for the first move (source square)
    comment: string;          // explanation of the idea
}

export const OPENING_EXERCISES: OpeningExercise[] = [
    // ── Apertura Española ─────────────────────────────────────────────────
    {
        id: 'ruy_fork_1',
        openingTag: 'Ruy_Lopez',
        openingName: 'Apertura Española',
        title: 'Bifurcación típica con el caballo',
        difficulty: 'beginner',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        solution: ['b5c6', 'd7c6', 'f3e5'],
        hint: 'b5',
        comment: 'La jugada b5xc6 cambia el alfil por el caballo, doblando los peones negros, para luego ganar el peón de e5 con Ne5.'
    },
    {
        id: 'ruy_backrank_1',
        openingTag: 'Ruy_Lopez',
        openingName: 'Apertura Española',
        title: 'Ataque a la octava fila',
        difficulty: 'intermediate',
        fen: 'r1bq1rk1/4bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPQ1PPP/R1B1R1K1 w - - 0 12',
        solution: ['e1e5', 'f6e4', 'd2e3'],
        hint: 'e1',
        comment: 'La torre en e1 presiona el peón de e5 y prepara la ruptura central. Si el negro captura con Nxe4, la dama en e3 recupera material.'
    },

    // ── Apertura Italiana ──────────────────────────────────────────────────
    {
        id: 'italian_fried_liver_1',
        openingTag: 'Italian_Game',
        openingName: 'Apertura Italiana',
        title: 'Ataque al hígado frito',
        difficulty: 'intermediate',
        fen: 'r1bqkb1r/ppp2ppp/2n2n2/3pp3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
        solution: ['f3g5', 'd8f6', 'g5f7'],
        hint: 'f3',
        comment: 'El famoso sacrificio Ng5! atacando f7. Si Ne6 o Qxf6, Nxf7 gana el material o la torre. Es uno de los ataques más agresivos de la Italiana.'
    },
    {
        id: 'italian_center_1',
        openingTag: 'Italian_Game',
        openingName: 'Apertura Italiana',
        title: 'Control del centro con d4',
        difficulty: 'beginner',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 2 5',
        solution: ['c2c3', 'e8g8', 'd3d4'],
        hint: 'c2',
        comment: 'c3 prepara d4. Este es el núcleo del juego centro-italiano (Giuoco Pianissimo). Con d4, las blancas consiguen una gran ventaja espacial.'
    },

    // ── Apertura Escocesa ──────────────────────────────────────────────────
    {
        id: 'scotch_winning_pawn_1',
        openingTag: 'Scotch_Game',
        openingName: 'Apertura Escocesa',
        title: 'Ganar el peón de e5',
        difficulty: 'beginner',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq e6 0 3',
        solution: ['d4e5', 'c6e5'],
        hint: 'd4',
        comment: 'La apertura Escocesa 3.d4 crea tensión inmediata. Si las negras capturan exd4, el blanco recupera con Nxd4 con el caballo centralizado; si no capturan, pierde el peón de e5.'
    },

    // ── Gambito de Rey ────────────────────────────────────────────────────
    {
        id: 'kings_gambit_1',
        openingTag: 'Kings_Gambit',
        openingName: 'Gambito de Rey',
        title: 'Recuperar el peón de gambito',
        difficulty: 'intermediate',
        fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq e3 0 3',
        solution: ['d8h4', 'e1e2', 'h4e4'],
        hint: 'd8',
        comment: 'Qh4+ fuerza al rey blanco a e2, luego Qxe4 recupera el peón. Pero cuidado: el negro también pierde el enroque al mover la dama tan pronto.'
    },

    // ── Defensa Siciliana ──────────────────────────────────────────────────
    {
        id: 'sicilian_najdorf_1',
        openingTag: 'Sicilian_Defense',
        openingName: 'Defensa Siciliana',
        title: 'Contraataque con d5',
        difficulty: 'intermediate',
        fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 0 6',
        solution: ['e7e5', 'd4b5', 'd6d5'],
        hint: 'e7',
        comment: 'En la variante Najdorf, e5 ocupa espacio central. Si el caballo blanco retrocede tras Nb5, el avance d5 libera el juego negro y da igualdad.'
    },
    {
        id: 'sicilian_dragon_1',
        openingTag: 'Sicilian_Defense',
        openingName: 'Defensa Siciliana',
        title: 'El ataque del dragón',
        difficulty: 'advanced',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R b KQ - 0 8',
        solution: ['d8b6', 'd1d2', 'b6b2'],
        hint: 'd8',
        comment: 'Qb6! ataca el peón de b2 y presiona a d4. En el siciliano dragón las negras arriesgan con ataques en el flanco de dama mientras el blanco ataca en el flanco de rey. ¡La velocidad es clave!'
    },

    // ── Defensa Francesa ──────────────────────────────────────────────────
    {
        id: 'french_d5_center_1',
        openingTag: 'French_Defense',
        openingName: 'Defensa Francesa',
        title: 'Ruptura central con c5',
        difficulty: 'beginner',
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 4',
        solution: ['e4e5', 'f6d7', 'f2f4'],
        hint: 'e4',
        comment: 'Las blancas avanzan e5 ganando espacio y empujando el caballo. El negro debe preparar la ruptura c5 para atacar el centro. f4 refuerza el avance blanco y prepara el ataque al rey.'
    },

    // ── Gambito de Dama ────────────────────────────────────────────────────
    {
        id: 'qg_pin_1',
        openingTag: 'Queens_Gambit',
        openingName: 'Gambito de Dama',
        title: 'La clavada del alfil',
        difficulty: 'beginner',
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4',
        solution: ['c1g5', 'f8e7', 'e2e3'],
        hint: 'c1',
        comment: 'Bg5 clava al caballo con la dama. Si el negro no desclava, pierde el caballo. Esta es la idea central del Gambito de Dama: presión inmediata sobre el centro negro.'
    },

    // ── Defensa India de Rey ───────────────────────────────────────────────
    {
        id: 'kid_saemisch_1',
        openingTag: 'Kings_Indian_Defense',
        openingName: 'Defensa India de Rey',
        title: 'El avance de peón negro',
        difficulty: 'advanced',
        fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/3PP3/2N1B3/PPP2PPP/R2QKBNR b KQ - 0 6',
        solution: ['e7e5', 'd4e5', 'd6e5', 'f1c4'],
        hint: 'e7',
        comment: 'e5! es el golpe central de la India de Rey. Las negras sacrifican la estructura de peones por actividad de piezas y contrajuego. Si d4xe5, d6xe5 da a las negras un fuerte centro.'
    },

    // ── Mate del Pastor ────────────────────────────────────────────────────
    {
        id: 'scholars_defense_1',
        openingTag: 'Scholars_Mate',
        openingName: 'Mate del Pastor',
        title: 'Cómo defenderse del mate del pastor',
        difficulty: 'beginner',
        fen: 'rnbqkbnr/pppp1ppp/8/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 2 3',
        solution: ['g7g6', 'h5f3', 'g8f6'],
        hint: 'g7',
        comment: 'g6! aleja la dama blanca de f7. Luego Nf6 bloquea el camino y también ataca la clavada. Esta es la defensa más sólida contra el amenazante Mate del Pastor.'
    },

    // ── Mate de Legal ─────────────────────────────────────────────────────
    {
        id: 'legal_trap_1',
        openingTag: 'Legals_Mate',
        openingName: 'Mate de Legal',
        title: 'La trampa de Legal',
        difficulty: 'intermediate',
        fen: 'rn1qkbnr/ppp1pppp/8/3p4/2PPp1b1/5N2/PP1NPPPP/R1BQKB1R w KQkq - 0 5',
        solution: ['f3e5', 'g4d1', 'f1b5', 'c7c6', 'd2f3'],
        hint: 'f3',
        comment: 'Nxe5! sacrifica la dama. Si las negras la aceptan Bxd1, Bb5+ c6, Nef7+ fuerza mate rápido con el caballo y el alfil. El negro ha caído en la trampa de Legal.'
    },
];

// Group exercises by opening tag for easy lookup
export function getExercisesByTag(tag: string): OpeningExercise[] {
    return OPENING_EXERCISES.filter(e => e.openingTag === tag);
}

// Group all exercises by openingTag for the selection grid
export function getExercisesByOpening(): Record<string, OpeningExercise[]> {
    return OPENING_EXERCISES.reduce((acc, ex) => {
        if (!acc[ex.openingTag]) acc[ex.openingTag] = [];
        acc[ex.openingTag].push(ex);
        return acc;
    }, {} as Record<string, OpeningExercise[]>);
}
