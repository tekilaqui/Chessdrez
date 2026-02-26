# Sistema de Análisis y Motor (IA) - Documentación Técnica

Esta guía explica el funcionamiento interno del motor de ajedrez Stockfish, la generación de comentarios automáticos y la detección de aperturas en la plataforma.

## 1. Gestión del Motor (Stockfish)

El motor se gestiona mediante la clase `EngineManager` ([engineManager.ts](file:///home/gus/.gemini/antigravity/scratch/chess-platform/apps/web/src/modules/game/engine/engineManager.ts)).

### Características Principales:
- **Web Workers**: Stockfish corre en un hilo separado para no bloquear la UI.
- **Suscripción**: Otros componentes pueden suscribirse a actualizaciones en tiempo real (`subscribe`).
- **Análisis Multi-PV**: En el modo análisis, se muestran hasta 3 líneas alternativas.

## 2. Generación de Comentarios (AI Intelligence)

La lógica para clasificar jugadas reside en el `CommentEngine` del paquete compartido.

### Clasificaciones de Jugadas:
| Categoría | Símbolo | Criterio |
| :--- | :--- | :--- |
| **Brilliant** | `!!` | Sacrificio táctico que mejora la posición significativamente. |
| **Great Move** | `!` | La única jugada que mantiene la ventaja. |
| **Best** | `★` | Jugada recomendada por el motor (Top 1). |
| **Book** | `📖` | Jugada de apertura teórica. |
| **Blunder** | `??` | Error grave que cambia drásticamente la evaluación (> 2.0 cp). |

### Flujo de Datos:
1. El motor envía una evaluación `score`.
2. El hook `usePlayEngine` compara la evaluación actual con la anterior.
3. Se calcula el `delta` y se envía al `CommentEngine`.
4. Se genera un comentario textual y una categoría (Icono).

## 3. Base de Datos de Aperturas

Las aperturas se almacenan en SQLite y se sirven vía API.

- **Detección**: Se usa `detectOpening` que compara la secuencia de jugadas UCI con el catálogo.
- **Seeding**: El script `seed-openings.ts` aplana el JSON jerárquico para que todas las variantes sean consultables directamente por su código ECO o nombre.

## 4. Interfaz Responsive

Se han aplicado principios de **Mobile-First** usando Tailwind CSS:
- **Tablero**: Ajusta su tamaño dinámicamente según el `verticalOffset` para evitar el scroll.
- **Paneles**: En móviles, los paneles de historial y análisis se apilan debajo del tablero.
- **Barra de Eval**: Integrada verticalmente al lado del tablero para ahorrar espacio horizontal.

---
*Documentación generada el 25 de Febrero, 2026*
