/**
 * Phase 2.1 - Preparación Base del Cliente
 * 
 * COMPLETADO:
 * ✅ Crear carpeta src/client/
 * ✅ Crear src/client/constants.js (LANGS, COACH_TEMPLATES, PUZZLE_THEMES_ES, QUALITY_MAP, etc)
 * ✅ Crear src/client/state.js (GameState singleton con getters/setters)
 * ✅ Crear src/client/utils.js (funciones puras: formatTime, sanitize, calculateElo, etc)
 * 
 * ARCHIVOS CREADOS:
 * 
 * 1. constants.js (380 líneas)
 *    - LANGS: Español e inglés (30+ strings)
 *    - COACH_TEMPLATES: Feedback aleatorio para el entrenador (7 categorías)
 *    - PUZZLE_THEMES_ES: Traducción de temas (50+ temas)
 *    - QUALITY_MAP: Clasificación de jugadas (brilliant, great, good, etc)
 *    - CHESS_SYMBOLS: Símbolos unicode para piezas
 *    - SOUND_URLS: URLs de sonidos (GitHub hosted)
 *    - DEFAULT_SETTINGS: Configuración inicial
 *    - TIME_CONTROLS: Controles de tiempo
 *    - AI_LEVELS: Niveles de IA (1-8 con ELO)
 *    - ACADEMY_CONFIG: Configuración de Academia
 * 
 * 2. state.js (280 líneas)
 *    - GameState class (Singleton pattern)
 *    - 40+ getters para acceso a estado
 *    - 40+ setters para actualizar estado
 *    - Métodos específicos: addMoveToHistory(), cacheAnalysis(), resetForNewGame()
 *    - Persistencia: toJSON(), fromJSON()
 *    - Exporta instancia: export const state = new GameState()
 * 
 * 3. utils.js (300 líneas)
 *    - formatTime(seconds): MM:SS format
 *    - formatMilliseconds(ms): "2h 30m"
 *    - sanitize(str): XSS protection
 *    - isSafeText(str): Validación de seguridad
 *    - getQualityInfo(quality): Info de calidad de jugada
 *    - formatEvaluation(cp): Conversión de centipeones
 *    - getEvalDifference(prev, new): Diferencia de eval
 *    - getThemeNameES(theme): Traducción de temas
 *    - getLangString(key, lang): Strings localizados
 *    - calculateEloChange(elo1, elo2, result, K): Cálculo ELO
 *    - getAiLevelInfo(level): Info de nivel IA
 *    - eloToAiLevel(elo): Conversión ELO→Nivel
 *    - calculateKFactor(elo): Factor K por ELO
 *    - average(arr), stdDev(arr), clamp(num, min, max)
 *    - shuffle(arr), groupBy(arr, key)
 *    - debugLog(label, data), createError(context, msg, details)
 * 
 * DEPENDENCIAS ENTRE MÓDULOS:
 * 
 *    constants.js (sin dependencias externas)
 *           ↓
 *    utils.js (importa de constants.js)
 *           ↓
 *    state.js (importa de constants.js y utils.js)
 *           ↓
 *    [Módulos complejos futuros: gameEngine, analysis, puzzleSystem, ui, etc]
 * 
 * PRÓXIMOS PASOS (Phase 2.2):
 * 
 * 1. Crear src/client/audioSystem.js (150 líneas)
 *    - Funciones: initializeSounds(), playSnd(soundName)
 *    - Usa SOUND_URLS de constants
 * 
 * 2. Crear src/client/openings.js (400 líneas)
 *    - Datos de aperturas
 *    - Funciones: getCurrentOpening(), showOpeningInfo()
 * 
 * 3. Crear src/client/academy.js (300 líneas)
 *    - Sistema de lecciones
 *    - Funciones: loadAcademyLesson(), completeAcademyLesson()
 * 
 * TESTING:
 * 
 * Los 3 módulos son 100% testeables:
 * - constants.js: No necesita tests (solo datos)
 * - state.js: Tests para getters/setters, reset(), persistence
 * - utils.js: Tests unitarios para cada función
 * 
 * Ejemplo test (utils.js):
 *   expect(formatTime(125)).toBe('02:05');
 *   expect(formatEvaluation(32)).toBe('+0.32');
 *   expect(calculateEloChange(1600, 1400, 1)).toEqual({...});
 * 
 * MIGRACION:
 * 
 * Para usar estos módulos en el cliente actual, actualizar index.html:
 * 
 * Antes:
 *   <script src="client.js"></script>
 * 
 * Después:
 *   <script type="module">
 *     import { state } from './src/client/state.js';
 *     import { formatTime, calculateEloChange } from './src/client/utils.js';
 *     // ... usar los módulos
 *   </script>
 * 
 * O en el nuevo index.js cuando esté listo (Phase 2.4)
 */

console.log('✅ Phase 2.1 Base Modules Ready');
console.log('├─ constants.js: 380 líneas');
console.log('├─ state.js: 280 líneas');
console.log('└─ utils.js: 300 líneas');
console.log('📊 Total: 960 líneas de código modular');
