# 🔄 Plan de Refactorización de client.js

## Situación Actual
- **Líneas**: 5,184
- **Funciones**: ~80+
- **Variables globales**: 30+
- **Mantenibilidad**: Muy baja
- **Testabilidad**: Imposible

## Estructura Propuesta

Dividir `client.js` en 5 módulos ES6 + 1 archivo de inicialización:

```
src/
├── client/
│   ├── index.js              # Entry point (inicialización)
│   ├── gameEngine.js         # Lógica de juego + movimientos
│   ├── puzzleSystem.js       # Sistema de puzzles + tácticas
│   ├── analysis.js           # Stockfish + análisis
│   ├── ui.js                 # Renderizado y DOM
│   ├── audioSystem.js        # Sonidos
│   ├── openings.js           # Aperturas + teoría
│   ├── academy.js            # Sistema educativo
│   ├── state.js              # Estado global (singleton)
│   ├── constants.js          # Lenguajes, temas, etc
│   └── utils.js              # Funciones auxiliares
```

## Mapeo de Funciones → Módulos

### `gameEngine.js` (800 líneas)
```
- onDrop()                  // Manejo de movimientos
- onSquareClick()
- recordHistoryState()
- updateHistory()
- checkGameOver()
- resignGame() / abortGame()
- startClock() / stopClock()
- updateTimerVisuals()
- endGameByTime()
- calculateEloChange()      // (renombrado: updateElo)
- saveToHistory()
```

### `puzzleSystem.js` (1200 líneas)
```
- configurePuzzle()
- handlePuzzleMove()
- checkDailyStatus()
- updatePuzzleStats()
- renderPuzzleUI()
- renderTacticalDashboard()
- getPuzzle()               // (nuevo helper)
- validatePuzzleSolution()
- loadPuzzles()             // (del inicio)
```

### `analysis.js` (900 líneas)
```
- handleStockfishAnalysis()
- detectOpeningTheory()
- generateTacticalAdvice()
- updateBestMovesAsync()
- evaluateMove()            // (extraído)
- updateEvalChartAsync()
- Stockfish worker init
```

### `ui.js` (1500 líneas)
```
- updateUI()
- renderHistory()
- highlightActiveHistoryMove()
- navigateHistory()
- updateMaterial()
- updateCoachDashboard()
- drawBestMoveArrow()
- initializeArrowCanvas()
- clearArrowCanvas()
- renderMoveHistory()
- onDragStart()
- onSnapEnd()
```

### `audioSystem.js` (150 líneas)
```
- playSnd()
- initializeSounds()
- toggleSound()
```

### `openings.js` (400 líneas)
```
- OPENINGS_DATA
- getCurrentOpening()
- loadOpeningTheory()
- showOpeningInfo()
```

### `academy.js` (300 líneas)
```
- getCurrentAcademyLevel()
- loadAcademyLesson()
- completeAcademyLesson()
- updateAcademyProgress()
```

### `state.js` (200 líneas - Singleton)
```
// Estado global centralizado
class GameState {
  - gameId, currentMode, selectedSq, hintsActive
  - aiThinking, opponentAutoMode
  - gameStarted, myColor
  - whiteTime, blackTime
  - currentPuzzle, puzzleStep
  - moveQualityHistory, evalHistory
  
  // Getters/Setters
  - getMode()
  - setMode()
  - updateTime()
  // etc...
}

export const state = new GameState();
```

### `constants.js` (400 líneas)
```
- LANGS (ES/EN)
- COACH_TEMPLATES
- PUZZLE_THEMES_ES
- QUALITY_MAP
- CHESS_SYMBOLS
```

### `utils.js` (250 líneas)
```
- formatTime()
- sanitize()
- getQualityMsg()
- setLanguage()
- getThemeNameES()
- calculateKFactor()
- getAiElo()
- scheduleUIUpdate()
- processUIQueue()
```

## Fase 1: Preparación (2 horas)

1. ✅ Crear estructura `/src/client/`
2. ✅ Crear `constants.js` (copiar data estática)
3. ✅ Crear `state.js` (singleton para estado)
4. ✅ Crear `utils.js` (funciones puras)

## Fase 2: Módulos Independientes (4 horas)

5. Crear `audioSystem.js`
6. Crear `openings.js`
7. Crear `academy.js`
8. Crear `utils.js` completo

## Fase 3: Módulos Complejos (6 horas)

9. Crear `gameEngine.js`
10. Crear `analysis.js`
11. Crear `ui.js`
12. Crear `puzzleSystem.js`

## Fase 4: Integración (2 horas)

13. Crear `index.js` (entry point)
14. Actualizar `index.html` para cargar `index.js`
15. Testing y debugging

## Beneficios

✅ **Mantenibilidad**: 5 archivos pequeños vs 1 gigante
✅ **Testing**: Cada módulo testeable independientemente
✅ **Performance**: Lazy loading de módulos opcionales
✅ **Colaboración**: Múltiples devs sin conflictos
✅ **Debugging**: Stack traces claros
✅ **Reutilización**: Funciones exportables

## Notas Importantes

1. **Sin breaking changes**: El cambio es interno, UI igual
2. **Mantener API**: Funciones globales siguen disponibles (si es necesario)
3. **Testing**: Agregar suite de tests en paralelo
4. **Documentación**: Documentar cada módulo con JSDoc

## Timeline Estimado

- **Fase 1**: 2 horas
- **Fase 2**: 4 horas  
- **Fase 3**: 6 horas
- **Fase 4**: 2 horas
- **Testing + Polish**: 4 horas
- **Total**: ~18 horas (2-3 sprints)
