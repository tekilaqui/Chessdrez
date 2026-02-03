# 📐 Arquitectura - Chess Tricks

## Visión General

```
┌─────────────────────────────────────┐
│         CLIENT (Browser)            │
├─────────────────────────────────────┤
│ index.html → client/index.js        │
│ (módulos ES6)                       │
└────────────┬────────────────────────┘
             │ (Socket.io + REST)
             │
┌────────────▼────────────────────────┐
│       SERVER (Node.js Express)      │
├─────────────────────────────────────┤
│ server.js                           │
│ ├─ Auth (JWT, Register, Login)     │
│ ├─ Game Logic (Socket.io handlers) │
│ ├─ Puzzle System                   │
│ └─ API Routes                      │
└────────────┬────────────────────────┘
             │ (Prisma ORM)
             │
┌────────────▼────────────────────────┐
│      DATABASE (PostgreSQL)          │
├─────────────────────────────────────┤
│ Users, Games, Puzzles, Ratings      │
└─────────────────────────────────────┘
```

## Componentes Principales

### 1. Frontend (`/client`)

**Estado**: Redux-like singleton
```javascript
// src/client/state.js
const state = {
  game: { gameId, currentMode, myColor, ... },
  ui: { showAnalysis, selectedSquare, ... },
  user: { username, elo, token, ... },
  puzzle: { currentPuzzle, step, ... }
}
```

**Módulos**:
- `gameEngine.js` - Lógica de movimientos
- `puzzleSystem.js` - Sistema de puzzles
- `analysis.js` - Análisis con Stockfish
- `ui.js` - Renderizado
- `audioSystem.js` - Sonidos
- Utilities (constants, utils, openings, academy)

### 2. Backend (`server.js`)

**Estructura**:
```
server.js
├─ Middleware
│  ├─ CORS
│  ├─ Helmet (CSP)
│  ├─ Rate Limiting
│  └─ Auth JWT
├─ Socket.io Handlers
│  ├─ register/login
│  ├─ create_challenge
│  ├─ game_move
│  ├─ update_elo
│  └─ ...
├─ REST Routes (estáticos)
└─ Error Handling
```

**Auth Flow**:
```
┌─ Client: emit('login', {user, pass})
│
└─ Server: 
   ├─ Validar inputs
   ├─ Hash password + salt
   ├─ Comparar con DB
   ├─ Generar JWT (7 días)
   └─ emit('login_success', {token, elo, ...})
```

### 3. Database (`schema.prisma`)

**Modelos principales**:
```prisma
model User {
  id       Int     @id
  username String  @unique
  email    String  @unique
  hash     String  (pbkdf2-sha512)
  salt     String
  elo      Int     @default(500)
  puzElo   Int     @default(500)
  
  games    Game[]
}

model Game {
  id        String  @id
  whiteId   Int
  blackId   Int
  fen       String
  moves     String  // JSON array
  turn      String  // "w" | "b"
  startTime DateTime
  lastUpdate DateTime
}

model Puzzle {
  id      String  @id
  fen     String
  solution String
  rating  Int
  themes  String  // CSV
}
```

### 4. Real-time Communication (Socket.io)

**Eventos principales**:
```
Client → Server:
  register(user, pass, email, phone)
  login(user, pass)
  create_challenge(timeControl)
  join_game(gameId)
  make_move(move)
  update_elo(elo)
  get_analysis(fen)
  solve_puzzle(puzzleId, solution)

Server → Client:
  register_success/error
  login_success/error
  lobby_update(challenges)
  game_started(gameData)
  opponent_move(move)
  game_ended(result)
  puzzle_feedback(correct/incorrect)
```

## Data Flow

### Game Flow
```
1. Usuario inicia sesión
   ├─ Token guardado en localStorage
   ├─ Socket autenticado con token
   └─ Conectado a lobby

2. Crea desafío o se une a uno
   ├─ Server valida usuarios
   ├─ Crea documento Game en DB
   └─ Emite game_started con posición inicial

3. Usuario hace movimiento
   ├─ Frontend valida con Chess.js
   ├─ Envía move al server
   ├─ Server valida y guarda
   ├─ Broadcast a oponente
   └─ Ambos actualizan UI

4. Juego termina
   ├─ Server calcula cambio ELO
   ├─ Actualiza ratings en DB
   └─ Envía resumen a ambos
```

### Puzzle Flow
```
1. Usuario abre puzzles
   ├─ Frontend carga JSON local (puzzles.json)
   ├─ Filtra por tema/dificultad
   └─ Muestra UI interactivo

2. Usuario intenta solución
   ├─ Frontend valida movimientos
   ├─ Compara con solución esperada
   ├─ Feedback inmediato (toast)
   └─ Registra tiempo/intentos

3. Puzzle completado
   ├─ Calcula puntuación
   ├─ Actualiza puzzle ELO
   ├─ Guarda en localStorage
   └─ Sincroniza opcionalmente con server
```

## Security Layers

```
┌──────────────────────────────────┐
│ 1. Helmet CSP                    │ (previene XSS)
├──────────────────────────────────┤
│ 2. CORS + SOP                    │ (previene CSRF)
├──────────────────────────────────┤
│ 3. JWT + Socket Auth             │ (autenticación)
├──────────────────────────────────┤
│ 4. Rate Limiting                 │ (previene bruteforce)
├──────────────────────────────────┤
│ 5. Input Validation              │ (SQL injection, etc)
├──────────────────────────────────┤
│ 6. PBKDF2 Password Hashing       │ (100k iteraciones)
├──────────────────────────────────┤
│ 7. Dotfiles Protection (.env)    │ (no expuesto)
└──────────────────────────────────┘
```

## Performance Optimization

1. **Frontend**:
   - Lazy load Stockfish (solo modo análisis)
   - Cachear posiciones tácticas
   - Debounce de eventos
   - Web Workers para cálculos

2. **Backend**:
   - Prisma connection pooling
   - Cache de puzzles (Redis opcional)
   - Rate limiting por socket
   - Async/await para no bloquear

3. **Network**:
   - Socket.io compression
   - Static asset caching
   - PWA offline support

## Deployment Architecture

```
┌──────────────────────┐
│   Render.com (PaaS)  │
├──────────────────────┤
│ Node.js Server       │
│ (auto-scale)         │
└──────┬───────────────┘
       │
       ├─────────────────────────┐
       │                         │
┌──────▼──────────┐   ┌──────────▼─────┐
│ PostgreSQL DB   │   │ CDN (Static)   │
│ (managed)       │   │ (optional)     │
└─────────────────┘   └────────────────┘
```

**Proceso de Deploy**:
```bash
1. git push
2. Render webhook triggered
3. npm install
4. npx prisma migrate deploy
5. npm start (node server.js)
6. Server listening en PORT 3000
7. Nginx reverse proxy → :3000
```

## Monitoreo & Logging

```
┌──────────────────────────────────┐
│ Application Logs                 │
├──────────────────────────────────┤
│ console.log (dev)                │
│ Structured JSON (prod)           │
│                                  │
│ Eventos: Auth, Errors, Perf      │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Metrics (Optional)               │
├──────────────────────────────────┤
│ Usuarios activos                 │
│ Juegos en progreso               │
│ Rate limiting hits               │
│ DB query time                    │
└──────────────────────────────────┘
```

## Próximas Mejoras

- [ ] Cache layer (Redis)
- [ ] Search/ranking system
- [ ] Social features (friends, messages)
- [ ] Mobile app (React Native)
- [ ] WebGL graphics upgrade
- [ ] AI vs improved (neural networks)
- [ ] Streaming/replay system
