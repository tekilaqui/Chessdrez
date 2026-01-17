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

    // 3. ECO CODES (Simplificado para detección básica)
    eco: {
        "e4": "Juego Abierto",
        "e4 e5": "Inicio de Aperturas de Rey",
        "e4 c5": "Defensa Siciliana",
        "e4 e6": "Defensa Francesa",
        "e4 c6": "Defensa Caro-Kann",
        "d4": "Juego Cerrado",
        "d4 d5": "Gambito de Dama / Otros",
        "d4 Nf6": "Defensas Indias",
        "c4": "Apertura Inglesa",
        "Nf3": "Apertura Real"
    }
};

window.MAESTRO_KNOWLEDGE = MAESTRO_KNOWLEDGE;
