/**
 * BASE DE CONOCIMIENTO TÁCTICO Y ESTRATÉGICO DEL MAESTRO
 * Incluye: Aperturas (ECO), Planes, Trampas y Mates.
 */

const MAESTRO_KNOWLEDGE = {
    // 1. BASE DE DATOS DE TRAMPAS (Detección por FEN)
    traps: [
        {
            name: "Trampa Noah's Ark (Arca de Noé)",
            fen_part: "r1bqk1nr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
            warning: "⚠️ ¡CUIDADO! Estás entrando en la trampa del Arca de Noé. El alfil de b5 corre peligro de ser encerrado.",
            plan: "Evita jugar d4 demasiado pronto si las negras tienen b5 y c4 preparados."
        },
        {
            name: "Mate de Legal",
            fen_part: "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R",
            warning: "🚨 ¡BOOM! Has caído en el Mate de Legal. El sacrificio de dama era una trampa mortal.",
            plan: "No captures la dama si el caballo de e5 y el alfil de c4 están activos."
        },
        {
            name: "Gambito Blackburne Shilling",
            fen_part: "r1bqkb1r/pppp1ppp/2n5/4N3/2B1n3/8/PPPP1PPP/RNBQK2R",
            warning: "⚠️ ¡ALERTA! El Gambito Blackburne es peligroso. Si tomas en e5, te expones a Qg5.",
            plan: "Juega c3 o O-O en lugar de tomar el peón central con riesgo."
        },
        {
            name: "Trampa del Elefante",
            fen_part: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N2NP1/PP2PP1P/R1BQKB1R",
            warning: "⚠️ ¡OJO! En el Gambito de Dama, tomar en d5 puede llevar a la trampa del elefante si clavas en g5.",
            plan: "Asegura el centro antes de buscar ganar material 'gratis'."
        },
        {
            name: "Mate de Legal (Estructura)",
            severity: 10,
            elo_range: [800, 1400],
            fun_fact: "Sacrificio de dama para dar mate con piezas menores"
        },
        {
            name: "Mate del Pastor",
            fen_part: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR",
            warning: "⚠️ ¡CUIDADO! Amenaza de Mate del Pastor en f7.",
            plan: "Defiende f7 con g6 o Qe7 inmediatamente."
        }
    ],

    // 2. PLANES ESTRATÉGICOS POR APERTURA
    plans: {
        "Apertura Española (Ruy Lopez)": {
            ideas: "Presionar el caballo de c6 para debilitar el control de e5.",
            plans: ["Maniobra de caballo Nb1-d2-f1-g3.", "Ataque en el flanco de rey tras cerrar el centro.", "Ruptura central con d4 después de c3."],
            traps: ["Arca de Noé", "Trampa de la Caña de Pescar"]
        },
        "Defensa Siciliana": {
            ideas: "Lucha asimétrica. Las negras buscan contrajuego en la columna c.",
            plans: ["Ataque York (blancas) con f3, Be3, Qd2.", "Contragolpe central ...d5 (negras).", "Ataque en el flanco de dama con ...a6, ...b5."],
            traps: ["Trampa de Magnus Smith", "Ataque Velimirovic"]
        },
        "Gambito de Dama": {
            ideas: "Control total del centro y desarrollo armónico.",
            plans: ["Presión en la columna c abierta.", "Ataque de minorías en el flanco de dama.", "Ataque directo al rey si las negras se defienden pasivamente."],
            traps: ["Trampa del Elefante", "Celada de Cambridge Springs"]
        },
        "Sistema Londres": {
            ideas: "Esquema sólido 'a prueba de balas'.",
            plans: ["Controlar la casilla e5 con el caballo.", "Ataque en el flanco de rey con h4-h5.", "Estructura de peones en triángulo (c3-d4-e3)."],
            traps: ["Ataque temprano ...Qb6"]
        },
        "Defensa India de Rey": {
            ideas: ["Fianchetto de rey", "Contrajuego central"],
            plans: ["...e5 central", "Ataque en f4-f5", "...c5 Benoni"]
        }
    },

    // 3. ECO CODES (Base de datos expandida para detección profunda)
    eco: {
        // --- JUEGOS ABIERTOS (1.e4 e5) ---
        "e4": "Juego Abierto",
        "e4 e5": "Apertura Doble de Peón de Rey",
        "e4 e5 Nf3": "Apertura de Peón de Rey (Variante del Caballo)",
        "e4 e5 Nf3 Nc6": "Apertura de los Caballos",
        "e4 e5 Nf3 Nc6 Bb5": "Apertura Española (Ruy Lopez)",
        "e4 e5 Nf3 Nc6 Bb5 a6": "Española: Variante Morphy",
        "e4 e5 Nf3 Nc6 Bb5 Nf6": "Española: Defensa Berlín",
        "e4 e5 Nf3 Nc6 Bc4": "Apertura Italiana",
        "e4 e5 Nf3 Nc6 Bc4 Bc5": "Giuoco Piano",
        "e4 e5 Nf3 Nc6 Bc4 Nf6": "Defensa de los Dos Caballos",
        "e4 e5 Nf3 Nc6 d4": "Apertura Escocesa",
        "e4 e5 Nf3 d6": "Defensa Philidor",
        "e4 e5 Nf3 Nf6": "Defensa Petrov",
        "e4 e5 f4": "Gambito de Rey",
        "e4 e5 Nc3": "Apertura Vienesa",
        "e4 e5 d4": "Apertura de Centro",
        "e4 e5 Bc4": "Apertura de Alfil",

        // --- DEFENSAS CONTRA 1.e4 ---
        "e4 c5": "Defensa Siciliana",
        "e4 c5 Nf3": "Siciliana Abierta (Desarrollo)",
        "e4 c5 Nf3 d6": "Siciliana: Variante Paulsen/Najdorf prep",
        "e4 c5 Nf3 Nc6": "Siciliana: Variante Nimzowitsch",
        "e4 c5 c3": "Siciliana: Variante Alapin",
        "e4 c5 d4": "Siciliana: Gambito Smith-Morra",
        "e4 c5 Nc3": "Siciliana Cerrada",
        "e4 e6": "Defensa Francesa",
        "e4 e6 d4 d5": "Francesa: Variante Central",
        "e4 e6 d4 d5 e5": "Francesa: Variante de Avance",
        "e4 e6 d4 d5 Nc3": "Francesa: Variante Winawer/Classical",
        "e4 c6": "Defensa Caro-Kann",
        "e4 c6 d4 d5": "Caro-Kann: Variante Principal",
        "e4 c6 d4 d5 e5": "Caro-Kann: Variante de Avance",
        "e4 d6": "Defensa Pirc",
        "e4 d6 d4 Nf6": "Pirc: Sistema Clásico",
        "e4 g6": "Defensa Robatsch (Moderna)",
        "e4 d5": "Defensa Escandinava",
        "e4 d5 exd5 Qxd5": "Escandinava: Variante de la Dama",
        "e4 Nf6": "Defensa Alekhine",
        "e4 b6": "Defensa Owen",

        // --- JUEGOS CERRADOS Y SEMICERRADOS (1.d4) ---
        "d4": "Juego Cerrado",
        "d4 d5": "Apertura Cerrada de Peón de Dama",
        "d4 d5 c4": "Gambito de Dama",
        "d4 d5 c4 e6": "Gambito de Dama Rehusado",
        "d4 d5 c4 c6": "Defensa Eslava",
        "d4 d5 c4 dxc4": "Gambito de Dama Aceptado",
        "d4 d5 Nf3": "Apertura de Peón de Dama (Desarrollo)",
        "d4 d5 Bf4": "Sistema Londres",
        "d4 d5 Nc3": "Apertura Richter-Veresov",
        "d4 Nf6": "Defensas Indias (Semicerrado)",
        "d4 Nf6 c4": "Defensas Indias (Línea Principal)",
        "d4 Nf6 c4 g6": "Defensa India de Rey / Gruenfeld prep",
        "d4 Nf6 c4 g6 Nc3 d5": "Defensa Gruenfeld",
        "d4 Nf6 c4 e6": "India de Dama / Nimzo-India prep",
        "d4 Nf6 c4 e6 Nc3 Bb4": "Defensa Nimzo-India",
        "d4 Nf6 c4 e6 Nf3 b6": "Defensa India de Dama",
        "d4 Nf6 c4 c5": "Defensa Benoni",
        "d4 Nf6 c4 c5 d5": "Benoni Moderna",
        "d4 f5": "Defensa Holandesa",
        "d4 d6": "Defensa Rat",

        // --- OTRAS APERTURAS ---
        "c4": "Apertura Inglesa",
        "c4 e5": "Inglesa: Variante Siciliana Invertida",
        "c4 c5": "Inglesa: Variante Simétrica",
        "Nf3": "Apertura Reti",
        "Nf3 d5": "Reti: Variante King's Indian Attack prep",
        "f4": "Apertura Bird",
        "b3": "Apertura Larsen",
        "g3": "Apertura Benko (Fianchetto)",
        "b4": "Apertura Sokolsky (Orangután)",
        "g4": "Ataque Grob",
        "Nc3": "Apertura Dunst",

        // --- CONTINUACIONES COMUNES ---
        "e4 e5 Nf3 Nc6 Bc4 Bc5 c3": "Giuoco Piano: Variante Italiana",
        "e4 e5 Nf3 Nc6 Bc4 Bc5 d3": "Giuoco Pianissimo",
        "d4 d5 Bf4 Nf6 e3": "Sistema Londres: Estructura Estándar",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6": "Siciliana Najdorf",
        "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6": "Siciliana Dragón",
        "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4": "Siciliana: Variante de los Cuatro Caballos",
        "d4 d5 c4 e6 Nc3 Nf6 Bg5": "Gambito de Dama: Variante Ortodoxa"
    }
};

window.MAESTRO_KNOWLEDGE = MAESTRO_KNOWLEDGE;
