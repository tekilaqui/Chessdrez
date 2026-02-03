# 🤝 Guía de Contribución

## Setup Desarrollo

### Requisitos
- Node.js 18+
- PostgreSQL 12+
- Git
- VS Code (recomendado)

### Instalación Local

```bash
# 1. Clonar
git clone <repo>
cd chesstricks

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
cp .env.example .env
# Editar .env con tus valores locales

# 4. Base de datos
npx prisma migrate dev

# 5. Iniciar servidor
npm run dev
```

Servidor estará en `http://localhost:3000`

## Estructura de Commits

Usar **Conventional Commits**:

```
feat(auth): agregar 2FA
fix(puzzle): corregir validación de soluciones
docs(readme): actualizar instrucciones de setup
refactor(client): dividir gameEngine en módulos
perf(socket): optimizar rate limiting
test(auth): agregar tests de login
chore(deps): actualizar express a 4.19
```

## Branches

```
main              ← Production (protegido)
├─ develop       ← Staging/QA
│  ├─ feature/xxx ← Nuevas features
│  ├─ fix/xxx    ← Bugfixes
│  └─ refactor/xxx ← Refactorizaciones
```

## Pull Request

1. **Crear branch**: `git checkout -b feature/mi-feature`
2. **Hacer cambios** con commits semánticos
3. **Push**: `git push origin feature/mi-feature`
4. **PR** en GitHub con descripción
5. **Code review** mínimo 1 aprobador
6. **Merge** a `develop` (squash si es necesario)

### Template PR

```markdown
## Descripción
Qué cambio hace este PR y por qué

## Tipo de cambio
- [ ] Feature nueva
- [ ] Bugfix
- [ ] Refactor
- [ ] Documentación

## Testing
- [ ] Tests unitarios pasando
- [ ] Testing manual completado
- [ ] Sin regressions detectadas

## Screenshots (si aplica)
[Agregar imágenes]

## Checklist
- [ ] Código formateado
- [ ] Sin console.log de debug
- [ ] Variables nombradas claramente
- [ ] Documentación actualizada
- [ ] .env.example actualizado (si aplica)
```

## Estilo de Código

### JavaScript
```javascript
// ✅ BIEN
const calculateElo = (current, opponent, result) => {
  const kFactor = current > 2400 ? 16 : 32;
  const expectedScore = 1 / (1 + Math.pow(10, (opponent - current) / 400));
  return Math.round(current + kFactor * (result - expectedScore));
};

// ❌ MAL
var calculateElo = function(c, o, r) {
  var k = c > 2400 ? 16 : 32;
  var e = 1/(1+Math.pow(10,(o-c)/400));
  return Math.round(c + k * (r - e));
};
```

### CSS
```css
/* Usar variables de tema */
.button {
  background-color: var(--accent);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
}

/* Mobile-first */
@media (min-width: 768px) {
  .button {
    padding: var(--spacing-lg);
  }
}
```

### Naming
- Variables: `camelCase` (`currentElo`, `isActive`)
- Constantes: `UPPER_SNAKE_CASE` (`MAX_RETRY_COUNT`)
- Classes: `PascalCase` (`GameState`)
- Files: `kebab-case` (`game-engine.js`)

## Testing

### Setup
```bash
npm install --save-dev jest @testing-library/dom
```

### Estructura
```
src/
├─ client/
│  ├─ gameEngine.js
│  └─ __tests__/
│     └─ gameEngine.test.js
```

### Ejemplo Test
```javascript
describe('GameEngine', () => {
  test('detecta jaque mate correctamente', () => {
    const game = new Chess();
    game.load('r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');
    
    expect(game.in_checkmate()).toBe(false);
  });

  test('calcula movimientos legales', () => {
    const game = new Chess();
    const moves = game.moves();
    
    expect(moves.length).toBe(20); // 20 movimientos en posición inicial
  });
});
```

## Performance

- **Lighthouse score**: Mínimo 80 (desktop)
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 4s
- **Network**: Comprimir assets

Revisar con:
```bash
npm run audit  # Dependencias
npm run build  # Tamaño bundle
```

## Documentación

Agregar JSDoc a funciones públicas:

```javascript
/**
 * Calcula el cambio de ELO después de una partida
 * @param {number} currentElo - ELO actual del jugador
 * @param {number} opponentElo - ELO del oponente
 * @param {number} result - Resultado: 1=victoria, 0.5=tablas, 0=derrota
 * @returns {number} Cambio de ELO (puede ser negativo)
 * @example
 * const delta = calculateEloDelta(1600, 1800, 1);
 * // returns: 32
 */
const calculateEloDelta = (currentElo, opponentElo, result) => {
  // ...
};
```

## Issues

### Reportar Bug
```markdown
## Descripción
Qué salió mal

## Pasos para reproducir
1.
2.
3.

## Comportamiento esperado
Qué debería pasar

## Comportamiento actual
Qué pasó

## Screenshots
[Si aplica]

## Entorno
- Browser: Chrome 120
- OS: Windows 11
- Network: Modo dev
```

### Feature Request
```markdown
## Propuesta
Descripción de la feature

## Motivación
Por qué sería útil

## Solución propuesta
Cómo implementarla

## Alternativas
Otras opciones consideradas
```

## Deployment

### Desarrollo
```bash
npm run dev  # Nodemon + watch CSS
```

### Staging
```bash
# En rama develop, deployas a Render (staging)
npm run build
npm start
```

### Producción
```bash
# Merge a main desde develop (via PR + reviews)
# Auto-deploys a Render (main)
```

## FAQ

**P: ¿Cómo reporto una vulnerabilidad?**
R: NO abras issue pública. Envía correo a security@chesstricks.dev

**P: ¿Puedo hacer refactoring?**
R: Sí, pero abre issue primero para discutir alcance

**P: ¿Qué si tengo una pregunta?**
R: Abre Discussion en GitHub o contacta en Discord

## Recursos

- [Convencional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Prisma Docs](https://www.prisma.io/docs/)
