const OPENINGS_ENHANCED = [
    {
        group: "Aperturas de Peón de Rey (1.e4 e5)", items: [
            {
                name: "Apertura Española (Ruy Lopez)",
                tag: "Ruy_Lopez",
                moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1b5", "a7a6", "b5a4", "g8f6", "e1g1", "f8e7", "f1e1", "b7b5", "a4b3", "d7d6", "c2c3", "e1g1", "h2h3"],
                steps: [
                    { comment: "El blanco toma el centro.", marks: ["e2e4-green"] },
                    { comment: "El negro responde simétricamente." },
                    { comment: "Desarrollo y ataque a e5.", marks: ["f3e5-yellow"] },
                    { comment: "Desarrollo típico defendiendo e5." },
                    { comment: "Define la Española: presiona el caballo defensor.", marks: ["b5c6-green"] },
                    { comment: "Defensa Morphy: pregunta intenciones al alfil." },
                    { comment: "El alfil se retira manteniendo la presión." },
                    { comment: "Contrataque sobre el peón de e4." },
                    { comment: "El blanco pone a su rey a salvo.", marks: ["g1g8-blue"] },
                    { comment: "Desarrollo sólido preparando el enroque." },
                    { comment: "Defensa indirecta de e4." },
                    { comment: "Expulsa al alfil de la clavada molesta." },
                    { comment: "El alfil se mantiene en la gran diagonal." },
                    { comment: "Consolidación central negra." },
                    { comment: "Prepara el gran centro con d4.", marks: ["c3d4-green"] },
                    { comment: "Las negras también se enrocan." },
                    { comment: "Evita clavadas con Ag4 antes de avanzar d4.", marks: ["h3g4-blue"] }
                ]
            },
            {
                name: "Apertura Italiana",
                tag: "Italian_Game",
                moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1c4", "f8c5", "c2c3", "g8f6", "d2d4", "e5d4", "c3d4", "c5b4"],
                steps: [
                    { comment: "Control central." },
                    { comment: "Respuesta clásica." },
                    { comment: "Desarrollo y ataque." },
                    { comment: "Defensa natural." },
                    { comment: "Apunta al punto débil f7.", marks: ["c4f7-red"] },
                    { comment: "Giuoco Piano: desarrollo activo.", marks: ["c5f2-red"] },
                    { comment: "Preparando d4.", marks: ["c3d4-green"] },
                    { comment: "Contrataque sobre e4." },
                    { comment: "¡Choque central!", marks: ["d4e5-green"] },
                    { comment: "Intercambio en d4." },
                    { comment: "El blanco domina el centro.", marks: ["cxd4-green"] },
                    { comment: "Jaque para frenar la iniciativa blanca." }
                ]
            },
            {
                name: "Apertura Escocesa",
                tag: "Scotch_Game",
                moves: ["e2e4", "e7e5", "g1f3", "b8c6", "d2d4", "e5d4", "f3d4"],
                steps: [
                    { comment: "Peón de rey." },
                    { comment: "E5 estándar." },
                    { comment: "Ataque a e5." },
                    { comment: "Defensa de e5." },
                    { comment: "Ataque central inmediato.", marks: ["d2d4-green"] },
                    { comment: "Intercambio forzado para las negras." },
                    { comment: "El blanco recupera con centralización.", marks: ["d4e5-blue"] }
                ]
            },
            {
                name: "Gambito de Rey",
                tag: "Kings_Gambit",
                moves: ["e2e4", "e7e5", "f2f4", "e5f4", "g1f3"],
                steps: [
                    { comment: "Inicio clásico." },
                    { comment: "Respuesta central." },
                    { comment: "¡Gambito! Desvía el peón de e5 para dominar el centro.", marks: ["f2f4-red"] },
                    { comment: "El negro acepta el reto." },
                    { comment: "Evita el jaque de dama en h4 y desarrolla.", marks: ["f3h4-yellow"] }
                ]
            }
        ]
    },
    {
        group: "Defensas contra 1.e4", items: [
            {
                name: "Defensa Siciliana",
                tag: "Sicilian_Defense",
                moves: ["e2e4", "c7c5", "g1f3", "d7d6", "d2d4", "c5d4", "f3d4", "g8f6", "b1c3", "a7a6"],
                steps: [
                    { comment: "1.e4 clásico." },
                    { comment: "Lucha asimétrica por el centro.", marks: ["c5d4-green"] },
                    { comment: "Preparando d4." },
                    { comment: "Controla e5 y abre diagonales." },
                    { comment: "Abertura del centro.", marks: ["d4c5-green"] },
                    { comment: "Intercambio de peones." },
                    { comment: "Caballo centralizado potente.", marks: ["d4c5-blue"] },
                    { comment: "Desarrollo atacando e4." },
                    { comment: "Defensa y desarrollo." },
                    { comment: "Variante Najdorf: una de las más ricas del ajedrez.", marks: ["a6b5-green"] }
                ]
            },
            {
                name: "Defensa Francesa",
                tag: "French_Defense",
                moves: ["e2e4", "e7e6", "d2d4", "d7d5"],
                steps: [
                    { comment: "1.e4." },
                    { comment: "Prepara d5 bloqueando el centro." },
                    { comment: "Ocupación total del centro.", marks: ["d2d4-green"] },
                    { comment: "Golpe central inmediato.", marks: ["d5e4-yellow"] }
                ]
            },
            {
                name: "Defensa Caro-Kann",
                tag: "Caro-Kann_Defense",
                moves: ["e2e4", "c7c6", "d2d4", "d7d5"],
                steps: [
                    { comment: "1.e4." },
                    { comment: "Prepara d5 sin bloquear al alfil de c8." },
                    { comment: "Centro blanco fuerte.", marks: ["d2d4-green"] },
                    { comment: "Lucha por el centro." }
                ]
            },
            {
                name: "Defensa Escandinava",
                tag: "Scandinavian_Defense",
                moves: ["e2e4", "d7d5", "e4d5", "d8d5", "b1c3", "d5a5"],
                steps: [
                    { comment: "1.e4." },
                    { comment: "Ataque directo al peón central.", marks: ["d5e4-green"] },
                    { comment: "Captura forzada." },
                    { comment: "La dama sale pronto al ruedo." },
                    { comment: "Desarrollo ganando tiempo sobre la dama.", marks: ["c3a5-green"] },
                    { comment: "Retirada típica de la dama escandinava." }
                ]
            }
        ]
    },
    {
        group: "Aperturas de Peón de Dama (1.d4)", items: [
            {
                name: "Gambito de Dama",
                tag: "Queens_Gambit",
                moves: ["d2d4", "d7d5", "c2c4"],
                steps: [
                    { comment: "Apertura de peón de dama." },
                    { comment: "Respuesta simétrica." },
                    { comment: "¡Gambito de Dama! Se ofrece un peón lateral por control central.", marks: ["c4d5-green"] }
                ]
            },
            {
                name: "Defensa India de Rey",
                tag: "Kings_Indian_Defense",
                moves: ["d2d4", "g8f6", "c2c4", "g7g6", "b1c3", "f8g7", "e2e4", "d7d6"],
                steps: [
                    { comment: "Peón de dama." },
                    { comment: "Controla e4 y d5." },
                    { comment: "Espacio central blanco." },
                    { comment: "Preparando el fianchetto." },
                    { comment: "Desarrollo estándar." },
                    { comment: "El alfil de rey vigila desde la cueva.", marks: ["g7d4-green"] },
                    { comment: "El blanco ocupa todo el centro.", marks: ["e2e4-green"] },
                    { comment: "Frena la expansión blanca temporalmente." }
                ]
            }
        ]
    },
    {
        group: "Mates, Trampas y Trucos", items: [
            {
                name: "Mate del Pastor",
                tag: "Scholars_Mate",
                moves: ["e2e4", "e7e5", "d1h5", "b8c6", "f1c4", "g8f6", "h5f7"],
                steps: [
                    { comment: "E4 estándar." },
                    { comment: "E5 estándar." },
                    { comment: "Ataque prematuro de dama. Apunta a f7.", marks: ["h5f7-red"] },
                    { comment: "Defensa de e5." },
                    { comment: "Desarrollo coordinado sobre el punto f7.", marks: ["c4f7-red"] },
                    { comment: "¡Error fatal! El negro ignora el mate.", marks: ["f6h5-red"] },
                    { comment: "¡Jaque Mate! Nunca olvides proteger el punto f7.", marks: ["f7f7-green"] }
                ]
            },
            {
                name: "Mate de Legal",
                tag: "Legals_Mate",
                moves: ["e2e4", "e7e5", "g1f3", "d7d6", "b1c3", "c8g4", "h2h3", "g4h5", "f3e5", "h5d1", "c4f7", "e1e7", "c3d5"],
                steps: [
                    { comment: "E4 apertura." },
                    { comment: "E5." },
                    { comment: "Caballo activo." },
                    { comment: "Philidor pasiva." },
                    { comment: "Desarrollo." },
                    { comment: "Clavada molesta.", marks: ["g4f3-yellow"] },
                    { comment: "Pregunta al alfil." },
                    { comment: "Mantiene la clavada." },
                    { comment: "¡Sorpresa! El blanco sacrifica la dama por el mate.", marks: ["e5d1-red"] },
                    { comment: "El negro cae en la trampa aceptando el regalo.", marks: ["d1e1-green"] },
                    { comment: "Jaque y preparación final." },
                    { comment: "Escape forzado." },
                    { comment: "¡Jaque mate con dos caballos y un alfil!", marks: ["d5e7-green"] }
                ]
            },
            {
                name: "Trampa de Noah's Ark (Apertura Española)",
                tag: "Noahs_Ark_Trap",
                moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1b5", "a7a6", "b5a4", "d7d6", "d2d4", "b7b5", "a4b3", "c6d4", "f3d4", "e5d4", "d1d4", "c7c5", "d1d5", "c8e6", "d5c6", "e6d7", "c6d5", "c5c4"],
                steps: [
                    { comment: "Española estándar." },
                    { comment: "Variante Steinitz diferida." },
                    { comment: "Ruptura d4 típica." },
                    { comment: "Expulsa al alfil." },
                    { comment: "Intercambio en d4." },
                    { comment: "La dama retoma centralizada." },
                    { comment: "¡La trampa comienza! C5 ataca la dama.", marks: ["c7d4-yellow"] },
                    { comment: "Ataca r8 y e5." },
                    { comment: "Defensa sólida." },
                    { comment: "Dama bajo fuego." },
                    { comment: "La dama insiste." },
                    { comment: "¡Atrapado! El alfil de b3 no tiene escape.", marks: ["c4b3-green"] }
                ]
            }
        ]
    },
    {
        group: "Aperturas de Flanco (1.c4, 1.Nf3...)", items: [
            {
                name: "Apertura Inglesa",
                tag: "English_Opening",
                moves: ["c2c4"],
                steps: [
                    { comment: "Controla d5 desde el flanco.", marks: ["c2c4-green"] },
                    { comment: "Flexible y transposicional." }
                ]
            },
            {
                name: "Apertura Reti",
                tag: "Reti_Opening",
                moves: ["g1f3", "d7d5", "c2c4"],
                steps: [
                    { comment: "Control flexible del caballo." },
                    { comment: "Ocupación central clásica." },
                    { comment: "¡Golpe de flanco! El sello de la Reti.", marks: ["c2c4-green"] }
                ]
            },
            {
                name: "Apertura Bird",
                tag: "Bird_Opening",
                moves: ["f2f4", "d7d5"],
                steps: [
                    { comment: "Ataque agresivo sobre e5.", marks: ["f2f4-yellow"] },
                    { comment: "Respuesta sólida central." }
                ]
            },
            {
                name: "Apertura Larsen",
                tag: "Larsen_Opening",
                moves: ["b2b3", "e7e5", "c1b2"],
                steps: [
                    { comment: "Preparando el fianchetto de dama." },
                    { comment: "Ocupación central." },
                    { comment: "El alfil presiona desde lejos.", marks: ["c1b2-green"] }
                ]
            }
        ]
    },
    {
        group: "Defensas Cerradas (contra 1.d4)", items: [
            {
                name: "Defensa Holandesa",
                tag: "Dutch_Defense",
                moves: ["d2d4", "f7f5"],
                steps: [
                    { comment: "1.d4." },
                    { comment: "¡Agresiva! Impide e4 y busca ataque en flanco de rey.", marks: ["f7f5-green"] }
                ]
            },
            {
                name: "Defensa Nimzo-India",
                tag: "Nimzo_Indian",
                moves: ["d2d4", "g8f6", "c2c4", "e7e6", "b1c3", "f8b4"],
                steps: [
                    { comment: "1.d4." },
                    { comment: "Flexible." },
                    { comment: "C4 estándar." },
                    { comment: "Prepara d5 o b4." },
                    { comment: "Desarrollo y amenaza e4." },
                    { comment: "¡Clavada! Controla e4 indirectamente.", marks: ["f8b4-green"] }
                ]
            },
            {
                name: "Defensa Eslava",
                tag: "Slav_Defense",
                moves: ["d2d4", "d7d5", "c2c4", "c7c6"],
                steps: [
                    { comment: "1.d4." },
                    { comment: "Respuesta sólida." },
                    { comment: "Gambito de dama." },
                    { comment: "La Eslava: Sólida como una roca.", marks: ["c7c6-green"] }
                ]
            }
        ]
    }
];

// Sistema de evaluación de jugadas
const QUALITY_THRESHOLDS = {
    brilliant: 0.1,    // Mejora más de 1.0
    excellent: 0.25,   // Entre 0.9 y 0.25
    good: 0.5,         // Entre 0.25 y 0.5
    inaccuracy: 0.8,   // Entre 0.5 y 0.8
    mistake: 1.5,      // Entre 0.8 y 1.5
    blunder: 999       // Más de 1.5
};

function evaluateMoveQuality(cpLoss) {
    if (cpLoss < QUALITY_THRESHOLDS.brilliant) return 'brilliant';
    if (cpLoss < QUALITY_THRESHOLDS.excellent) return 'excellent';
    if (cpLoss < QUALITY_THRESHOLDS.good) return 'good';
    if (cpLoss < QUALITY_THRESHOLDS.inaccuracy) return 'inaccuracy';
    if (cpLoss < QUALITY_THRESHOLDS.mistake) return 'mistake';
    return 'blunder';
}
