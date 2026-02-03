/**
 * constants.js - Constantes globales del cliente de ajedrez
 * Contiene lenguajes, temas, plantillas de entrenador y configuraciones estáticas
 */

// MULTI-LANGUAGE SUPPORT
export const LANGS = {
    es: {
        mate: "JAQUE MATE", 
        win: "¡HAS GANADO!", 
        lose: "HAS PERDIDO", 
        draw: "TABLAS",
        resign: "¿Estás seguro de que quieres rendirte?", 
        abort: "¿Abortar partida? No perderás ELO.",
        guest: "Invitado", 
        login: "INICIAR SESIÓN", 
        logout: "CERRAR SESIÓN",
        puz_done: "¡EXCELENTE!", 
        puz_hint: "Analiza bien la posición...",
        best_move: "Mejor jugada", 
        level: "Nivel", 
        diff: "Dificultad", 
        theme: "Temas",
        brilliant: "¡LA MEJOR!", 
        great: "¡Muy buena!", 
        best: "La mejor",
        good: "Buena", 
        inaccuracy: "Error insustancial", 
        mistake: "Error", 
        blunder: "ERROR GRAVE",
        book: "De libro",
        privacy: "🔒 Tus datos se gestionan de forma segura.",
        logout_auth: "CERRAR SESIÓN"
    },
    en: {
        mate: "CHECKMATE", 
        win: "YOU WON!", 
        lose: "YOU LOST", 
        draw: "DRAW",
        resign: "Are you sure you want to resign?", 
        abort: "Abort game? You won't lose ELO.",
        guest: "Guest", 
        login: "LOGIN", 
        logout: "LOGOUT",
        puz_done: "EXCELLENT!", 
        puz_hint: "Analyze the position carefully...",
        best_move: "Best move", 
        level: "Level", 
        diff: "Difficulty", 
        theme: "Themes",
        brilliant: "BRILLIANT!", 
        great: "Great find!", 
        best: "Best move",
        good: "Good", 
        inaccuracy: "Inaccuracy", 
        mistake: "Mistake", 
        blunder: "BLUNDER",
        privacy: "🔒 Your data is managed securely.",
        logout_auth: "SIGN OUT"
    }
};

// COACH FEEDBACK TEMPLATES
export const COACH_TEMPLATES = {
    'brilliant': [
        '💎 ¡Movimiento de genio!',
        '✨ Eso fue brillante',
        '🚀 Jugada maestra',
        '🧠 Visión excepcional'
    ],
    'excellent': [
        '✅ Excelente movimiento',
        '👏 Muy bien pensado',
        '🎯 Perfecto',
        '🌟 Sólido y fuerte'
    ],
    'good': [
        '👍 Buena jugada',
        '👌 Mantienes la posición',
        '♟️ Movimiento correcto'
    ],
    'inaccuracy': [
        '😕 Una imprecisión',
        '🧐 Había algo mejor',
        '📉 Pierdes un poco de fuelle'
    ],
    'mistake': [
        '⚠️ Cuidado con ese movimiento',
        '💭 Podría haber algo mejor',
        '🤔 Repiensa tu estrategia'
    ],
    'blunder': [
        '🚨 ¡ERROR GRAVE!',
        '❌ Has pasado por alto algo importante',
        '😨 Esto cambia las cosas'
    ],
    'book': [
        '📚 Teoría pura',
        '📖 Tal como dicen los libros',
        '🎓 Conocimiento sólido'
    ]
};

// PUZZLE THEMES TRANSLATION
export const PUZZLE_THEMES_ES = {
    'fork': 'Ataque doble', 
    'pin': 'Clavada', 
    'skewer': 'Enfilada', 
    'sacrifice': 'Sacrificio',
    'mate': 'Mate', 
    'matein2': 'Mate en 2', 
    'matein1': 'Mate en 1', 
    'advantage': 'Ventaja',
    'crushing': 'Aplastante', 
    'opening': 'Apertura', 
    'middlegame': 'Medio juego', 
    'endgame': 'Final',
    'long': 'Largo', 
    'short': 'Corto', 
    'interference': 'Interferencia', 
    'attraction': 'Atracción',
    'defensivemove': 'Defensa', 
    'doublecheck': 'Jaque doble', 
    'enpassant': 'Al paso',
    'discoveredattack': 'Ataque descubierta', 
    'quietmove': 'Jugada tranquila', 
    'zugzwang': 'Zugzwang',
    'underpromotion': 'Sub-promoción', 
    'vulnerableking': 'Rey expuesto', 
    'xrayattack': 'Rayos X',
    'advancedpawn': 'Peón avanzado', 
    'backrankmate': 'Mate pasillo', 
    'capturingdefender': 'Eliminar defensor',
    'clearance': 'Despeje', 
    'hangingpiece': 'Pieza colgada', 
    'hookmate': 'Mate gancho',
    'kingsideattack': 'Flanco de rey', 
    'queensideattack': 'Flanco de dama', 
    'overload': 'Sobrecarga',
    'promotion': 'Coronación', 
    'smotheredmate': 'Mate de la coz', 
    'trappedpiece': 'Pieza atrapada',
    'onemove': 'Una jugada', 
    'verylong': 'Muy largo', 
    'equality': 'Igualdad', 
    'master': 'Maestro',
    'mastervsmaster': 'Duelo de maestros', 
    'supergm': 'Súper GM'
};

// MOVE QUALITY CLASSIFICATION
export const QUALITY_MAP = {
    'brilliant': { level: 5, label: 'Excelente', color: '#00d084' },
    'great': { level: 4, label: 'Muy bien', color: '#0da4d0' },
    'best': { level: 3, label: 'Buena', color: '#1e6f4f' },
    'good': { level: 2, label: 'Correcta', color: '#8ba8ab' },
    'inaccuracy': { level: 1, label: 'Imprecisión', color: '#ffb800' },
    'mistake': { level: 0, label: 'Error', color: '#ff6b6b' },
    'blunder': { level: -1, label: 'Grave', color: '#d62828' },
    'book': { level: 3, label: 'Teoría', color: '#6a4c93' }
};

// CHESS SYMBOLS & NOTATION
export const CHESS_SYMBOLS = {
    'K': '♔', 'k': '♚',
    'Q': '♕', 'q': '♛',
    'R': '♖', 'r': '♜',
    'B': '♗', 'b': '♝',
    'N': '♘', 'n': '♞',
    'P': '♙', 'p': '♟'
};

// SOUND URLS (GitHub hosted)
export const SOUND_URLS = {
    move: 'https://github.com/lichess-org/lila/raw/master/public/sound/standard/Move.mp3',
    capture: 'https://github.com/lichess-org/lila/raw/master/public/sound/standard/Capture.mp3',
    check: 'https://github.com/lichess-org/lila/raw/master/public/sound/standard/Check.mp3',
    end: 'https://github.com/lichess-org/lila/raw/master/public/sound/standard/GenericNotify.mp3',
    error: 'https://github.com/lichess-org/lila/raw/master/public/sound/standard/Error.mp3'
};

// DEFAULT GAME SETTINGS
export const DEFAULT_SETTINGS = {
    lang: 'es',
    sound: true,
    theme: 'light',
    boardSide: 'auto',
    academyLevel: 0
};

// TIME CONTROLS (in seconds)
export const TIME_CONTROLS = {
    'bullet': 60,
    'blitz': 300,
    'rapid': 600,
    'classic': 900
};

// AI LEVELS & RATINGS
export const AI_LEVELS = {
    1: { name: 'Principiante', elo: 800 },
    2: { name: 'Nivel 2', elo: 1000 },
    3: { name: 'Nivel 3', elo: 1200 },
    4: { name: 'Nivel 4', elo: 1400 },
    5: { name: 'Nivel 5', elo: 1600 },
    6: { name: 'Nivel 6', elo: 1800 },
    7: { name: 'Nivel 7', elo: 2000 },
    8: { name: 'Maestro', elo: 2400 }
};

// ACADEMY LEVELS CONFIG
export const ACADEMY_CONFIG = {
    0: { name: 'Fundamentos', lessons: 5 },
    1: { name: 'Tácticas Básicas', lessons: 8 },
    2: { name: 'Aperturas', lessons: 6 },
    3: { name: 'Finales', lessons: 7 },
    4: { name: 'Estrategia', lessons: 10 }
};
