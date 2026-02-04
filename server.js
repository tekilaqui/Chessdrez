// Deployment Sync: 2026-02-04 00:50 - DEFINITIVE SYNC
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const { VALIDATORS, SECURITY_CONFIG } = require('./src/lib/validators');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Demasiadas peticiones desde esta IP, intente de nuevo en 15 minutos" }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Demasiados intentos de acceso, intente de nuevo en una hora" }
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:", "http:", "blob:"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      imgSrc: ["'self'", "data:", "https:", "http:", "ui-avatars.com", "cdn-icons-png.flaticon.com"],
      connectSrc: ["'self'", "wss:", "https:", "http:"],
      mediaSrc: ["'self'", "https:", "http:"],
      fontSrc: ["'self'", "https:", "http:", "fonts.gstatic.com", "fonts.googleapis.com"],
      workerSrc: ["'self'", "blob:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: null,
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.static(__dirname, { dotfiles: 'deny' })); // Static files first - SECURE: deny dotfiles

app.use(express.json({ limit: '10kb' }));
// Custom cache headers mainly for API/Dynamic routes, avoid blocking static
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.setHeader('Cache-Control', 'no-cache');
  }
  next();
});
app.use('/login', authLimiter);
app.use('/register', authLimiter);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
});

// Verificar conexión a la base de datos con reintentos
async function connectWithRetry(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log('✅ Prisma conectado correctamente');
      return true;
    } catch (err) {
      console.warn(`⚠️  Intento ${i + 1}/${retries} - Error conectando Prisma:`, err.message);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  console.error('❌ No se pudo conectar a Prisma después de varios intentos');
  console.error('⚠️  El servidor continuará pero las operaciones de BD fallarán');
  return false;
}

// Intentar conectar pero no bloquear el inicio del servidor
connectWithRetry().catch(console.error);

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function generateToken(username) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return jwt.sign(
    { username, timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyToken(token) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

function validateUsername(username) {
  return VALIDATORS.username(username);
}

function validatePassword(password) {
  return VALIDATORS.password(password);
}

function validateEmail(email) {
  return VALIDATORS.email(email);
}

function validatePhone(phone) {
  return VALIDATORS.phone(phone);
}

const activeChallenges = new Map();
const connectedUsers = new Map();

const GAMES_PATH = path.join(__dirname, 'active_games.json');
let activeGames = {};

function loadGames() {
  if (fs.existsSync(GAMES_PATH)) {
    try {
      activeGames = JSON.parse(fs.readFileSync(GAMES_PATH, 'utf8'));
    } catch (e) {
      console.error("Error cargando juegos:", e);
      activeGames = {};
    }
  }
}

function saveGames() {
  try {
    fs.writeFileSync(GAMES_PATH, JSON.stringify(activeGames, null, 2));
  } catch (e) {
    console.error("Error guardando juegos:", e);
  }
}

loadGames();

// ===== RATE LIMITING POR SOCKET =====
const socketRateLimiters = new Map(); // socketId -> { count, resetTime }

function checkSocketRateLimit(socketId) {
  const now = Date.now();
  const limiter = socketRateLimiters.get(socketId) || { count: 0, resetTime: now + 1000 };

  if (now > limiter.resetTime) {
    limiter.count = 0;
    limiter.resetTime = now + 1000;
  }

  limiter.count++;
  socketRateLimiters.set(socketId, limiter);

  return limiter.count <= SECURITY_CONFIG.socketRateLimit.maxEventsPerSecond;
}

// Cleanup de rate limiters antiguos cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [id, limiter] of socketRateLimiters.entries()) {
    if (now > limiter.resetTime + 5 * 60 * 1000) {
      socketRateLimiters.delete(id);
    }
  }
}, 5 * 60 * 1000);

// ===== MIDDLEWARE DE SOCKET.IO =====
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      socket.username = decoded.username;
      socket.authenticated = true;
    }
  }
  next();
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Auto-login if token was valid
  if (socket.authenticated) {
    prisma.user.findUnique({ where: { username: socket.username } })
      .then(u => {
        if (u) {
          socket.emit('login_success', {
            username: socket.username,
            elo: u.elo,
            puzzleElo: u.puzElo,
            token: socket.handshake.auth.token
          });
          connectedUsers.set(socket.id, socket.username);
        }
      });
  }

  socket.emit('lobby_update', Array.from(activeChallenges.values()));

  socket.on('register', async (data) => {
    if (!checkSocketRateLimit(socket.id)) {
      return socket.emit('register_error', { message: 'Demasiadas solicitudes. Intenta de nuevo.' });
    }
    try {
      if (!validateUsername(data.user)) return socket.emit('register_error', { message: 'Usuario inválido' });
      if (!validatePassword(data.pass)) return socket.emit('register_error', { message: 'Contraseña inválida' });
      if (!validateEmail(data.email)) return socket.emit('register_error', { message: 'Email inválido' });
      if (!validatePhone(data.phone)) return socket.emit('register_error', { message: 'Teléfono inválido' });

      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username: data.user }, { email: data.email }] }
      });

      if (existingUser) {
        return socket.emit('register_error', { message: 'El usuario o email ya existe' });
      }

      const salt = crypto.randomBytes(32).toString('hex');
      const hash = hashPassword(data.pass, salt);

      await prisma.user.create({
        data: {
          username: data.user,
          email: data.email,
          hash,
          salt,
          elo: 500,
          puzElo: 500
        }
      });

      const token = generateToken(data.user);
      socket.username = data.user;
      socket.authenticated = true;
      connectedUsers.set(socket.id, data.user);

      socket.emit('register_success', { username: data.user, elo: 500, puzzleElo: 500, token });
    } catch (error) {
      console.error('❌ ERROR EN REGISTRO:', error.message);
      if (process.env.NODE_ENV !== 'production') {
        console.error('Prisma Error Code:', error.code);
        console.error('Stack Trace:', error.stack);
      }

      let clientMessage = 'Error en el servidor';
      if (error.message.includes('Unique constraint failed')) {
        clientMessage = 'El usuario o email ya existe';
      } else if (error.message.includes('User')) {
        clientMessage = 'Error de base de datos';
      }

      socket.emit('register_error', {
        message: clientMessage
      });
    }
  });

  socket.on('login', async (data) => {
    if (!checkSocketRateLimit(socket.id)) {
      return socket.emit('login_error', { message: 'Demasiadas solicitudes. Intenta de nuevo.' });
    }
    try {
      if (!data.user || !validatePassword(data.pass)) return socket.emit('login_error', { message: 'Credenciales inválidas' });

      const userEntry = await prisma.user.findFirst({
        where: { OR: [{ username: data.user }, { email: data.user }] }
      });

      if (!userEntry) return socket.emit('login_error', { message: 'Usuario no encontrado' });

      const inputHash = hashPassword(data.pass, userEntry.salt);
      if (inputHash === userEntry.hash) {
        const token = generateToken(userEntry.username);
        socket.username = userEntry.username;
        socket.authenticated = true;
        connectedUsers.set(socket.id, userEntry.username);
        socket.emit('login_success', {
          username: userEntry.username,
          elo: userEntry.elo,
          puzzleElo: userEntry.puzElo,
          token,
          stats: { wins: userEntry.wins, losses: userEntry.losses, draws: userEntry.draws }
        });
      } else {
        socket.emit('login_error', { message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      if (process.env.NODE_ENV !== 'production') {
        console.error('Stack:', error.stack);
      }
      socket.emit('login_error', {
        message: 'Error en el servidor'
      });
    }
  });

  socket.on('update_elo', async (data) => {
    if (!socket.authenticated || socket.username !== data.user) return;
    try {
      await prisma.user.update({
        where: { username: data.user },
        data: {
          elo: Math.max(0, Math.min(3000, data.elo)),
          puzElo: Math.max(0, Math.min(3000, data.puzElo))
        }
      });
    } catch (e) {
      console.error("Error updating ELO:", e);
    }
  });

  socket.on('create_challenge', (data) => {
    if (!socket.authenticated) return socket.emit('error', 'Debes iniciar sesión');
    // Use the ID provided by the client to ensure sync
    const challengeId = data.id || crypto.randomBytes(16).toString('hex');
    const challenge = {
      id: challengeId,
      user: socket.username, // Changed from creator to user to match client expectation
      creatorElo: users[socket.username]?.elo || 1200, // Keep this for backend logic if needed
      elo: users[socket.username]?.elo || 1200, // Add this for client display consistency
      timeControl: data.timeControl || '10+0',
      time: data.time || 10, // Ensure 'time' property exists as client expects
      createdAt: Date.now()
    };
    activeChallenges.set(challengeId, challenge);
    socket.join(`game_${challengeId}`);
    socket.broadcast.emit('new_challenge', challenge);
  });

  socket.on('get_lobby', () => {
    socket.emit('lobby_update', Array.from(activeChallenges.values()));
    if (socket.username) {
      const userGames = Object.values(activeGames).filter(g => g.white === socket.username || g.black === socket.username);
      socket.emit('active_games_update', userGames);
    }
  });

  socket.on('join_game', (data) => {
    const game = activeGames[data.gameId];
    if (game && (game.white === socket.username || game.black === socket.username)) {
      socket.join(`game_${data.gameId}`);
      socket.emit('game_resume', {
        id: game.id,
        fen: game.fen,
        white: game.white,
        black: game.black,
        whiteTime: game.whiteTime,
        blackTime: game.blackTime,
        turn: game.turn,
        moves: game.moves
      });
    }
  });

  socket.on('join_challenge', (data) => {
    if (!socket.authenticated) return socket.emit('error', 'Debes iniciar sesión');
    const challenge = activeChallenges.get(data.id);
    if (!challenge) return socket.emit('error', 'Reto no encontrado');
    if (challenge.user === socket.username) return socket.emit('error', 'No puedes unirte a tu propio reto');

    activeChallenges.delete(data.id);
    socket.join(`game_${data.id}`);

    const isWhite = Math.random() > 0.5;
    const gameTime = (challenge.time || 10) * 60;

    activeGames[data.id] = {
      id: data.id,
      white: isWhite ? challenge.user : socket.username,
      black: isWhite ? socket.username : challenge.user,
      startTime: Date.now(),
      moves: [],
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      turn: 'w',
      whiteTime: gameTime,
      blackTime: gameTime,
      lastUpdate: Date.now()
    };

    saveGames();
    io.emit('lobby_update', Array.from(activeChallenges.values()));

    // Notificar a ambos jugadores el inicio y sus colores
    io.to(`game_${data.id}`).emit('game_start', {
      gameId: data.id,
      white: activeGames[data.id].white,
      black: activeGames[data.id].black,
      time: challenge.time || 10
    });
  });

  socket.on('get_my_games', () => {
    if (!socket.authenticated) return;
    const myGames = Object.values(activeGames).filter(g =>
      g.white === socket.username || g.black === socket.username
    );
    socket.emit('my_games_list', myGames);
  });

  socket.on('move', (data) => {
    if (!socket.authenticated) return;
    const game = activeGames[data.gameId];
    if (game) {
      const now = Date.now();
      const elapsed = Math.floor((now - game.lastUpdate) / 1000);

      // Update time of the player who just moved
      if (game.turn === 'w') {
        game.whiteTime = Math.max(0, game.whiteTime - elapsed);
      } else {
        game.blackTime = Math.max(0, game.blackTime - elapsed);
      }

      game.moves.push(data.move);
      game.fen = data.fen || game.fen;
      game.turn = game.turn === 'w' ? 'b' : 'w';
      game.lastUpdate = now;
      saveGames();

      // Emit with updated server times to keep clients in sync
      const moveData = {
        ...data,
        whiteTime: game.whiteTime,
        blackTime: game.blackTime,
        turn: game.turn
      };
      socket.to(`game_${data.gameId}`).emit('move', moveData);
      socket.emit('move_ack', moveData); // Confirm to the sender too
    }
  });

  socket.on('chat_message', (data) => {
    if (!socket.authenticated) return;
    const sanitizedMessage = {
      user: socket.username,
      message: sanitize(data.message).substring(0, 500),
      gameId: data.gameId,
      timestamp: Date.now()
    };
    if (data.gameId) {
      io.to(`game_${data.gameId}`).emit('chat_message', sanitizedMessage);
    } else {
      io.emit('chat_message', sanitizedMessage);
    }
  });

  socket.on('resign_game', async (data) => {
    if (!socket.authenticated) return;
    const game = activeGames[data.gameId];
    if (game) {
      try {
        await prisma.user.update({ where: { username: game.white }, data: { wins: { increment: 1 } } });
        await prisma.user.update({ where: { username: game.black }, data: { losses: { increment: 1 } } });
      } catch (e) { console.error("Error updating stats:", e); }
      delete activeGames[data.gameId];
      saveGames();
    }
    socket.to(`game_${data.gameId}`).emit('player_resigned', { user: socket.username });
  });

  socket.on('abort_online_game', (data) => {
    if (!socket.authenticated) return;

    let wasChallenge = false;
    if (activeChallenges.has(data.gameId)) {
      activeChallenges.delete(data.gameId);
      io.emit('lobby_update', Array.from(activeChallenges.values()));
      wasChallenge = true;
    }

    if (activeGames[data.gameId]) {
      delete activeGames[data.gameId];
      saveGames();
      socket.to(`game_${data.gameId}`).emit('game_aborted', { user: socket.username });
    }
  });

  socket.on('get_leaderboard', async () => {
    try {
      const topUsers = await prisma.user.findMany({
        orderBy: { elo: 'desc' },
        take: 10,
        select: { username: true, elo: true, wins: true, losses: true, draws: true }
      });
      const top10 = topUsers.map(u => ({
        user: u.username,
        elo: u.elo,
        stats: { wins: u.wins, losses: u.losses, draws: u.draws }
      }));
      socket.emit('leaderboard_data', top10);
    } catch (e) {
      console.error("Error getting leaderboard:", e);
    }
  });

  // AI GATEWAY VIA SOCKETS (CORS-FREE)
  socket.on('ai_request', async (data) => {
    const { provider, apiKey, prompt } = data;
    if (!provider || !apiKey || !prompt) {
      return socket.emit('ai_response', { error: 'Missing data' });
    }

    console.log(`🤖 AI Request received from ${socket.username || 'Guest'} via Socket`);
    const result = await processAIRequest(provider, apiKey, prompt);
    socket.emit('ai_response', result);
  });

  // ===== DAILY PUZZLE & REWARDS SYSTEM =====
  const PUZZLE_DB = require('./puzzles_data.js');

  socket.on('get_daily_puzzle', async () => {
    if (!socket.authenticated) return socket.emit('error', 'Debes iniciar sesión');

    try {
      const user = await prisma.user.findUnique({
        where: { username: socket.username },
        include: { solvedPuzzles: { select: { puzzleId: true } } }
      });

      // 1. Check if already solved today (UTC based for consistency)
      const now = new Date();
      const lastDate = user.lastDailyDate ? new Date(user.lastDailyDate) : null;

      const isSameDay = lastDate &&
        lastDate.getUTCFullYear() === now.getUTCFullYear() &&
        lastDate.getUTCMonth() === now.getUTCMonth() &&
        lastDate.getUTCDate() === now.getUTCDate();

      if (isSameDay) {
        return socket.emit('daily_puzzle_response', {
          status: 'completed',
          streak: user.streak,
          message: 'Ya has completado el puzzle de hoy. ¡Vuelve mañana!'
        });
      }

      // 2. Select a random puzzle NOT in history
      const solvedIds = new Set(user.solvedPuzzles.map(p => p.puzzleId));
      const availablePuzzles = PUZZLE_DB.filter(p => !solvedIds.has(p.PuzzleId));

      if (availablePuzzles.length === 0) {
        return socket.emit('daily_puzzle_response', {
          status: 'completed',
          message: '¡Has completado TODOS los puzzles disponibles! ¡Increíble!'
        });
      }

      // Simple random selection
      const randomPuzzle = availablePuzzles[Math.floor(Math.random() * availablePuzzles.length)];

      socket.emit('daily_puzzle_response', {
        status: 'available',
        puzzle: {
          id: randomPuzzle.PuzzleId,
          fen: randomPuzzle.FEN,
          rating: randomPuzzle.Rating,
          themes: randomPuzzle.Themes,
          // Don't send Moves/Solution to cheat-proof (mostly)
          // We will verify on submit. Client just needs FEN to start.
          // Actually client needs moves to play AGAINST user if it's a sequence?
          // For simplicity, we send the first move if necessary, or let client engine handle?
          // Standard: Send PGN/Moves but trust verify. Or send only FEN and let client make move?
          // Let's send basic info.
          moves: randomPuzzle.Moves // Needed for client to validate locally or animate
        },
        streak: user.streak
      });

    } catch (e) {
      console.error("Error getting daily puzzle:", e);
      socket.emit('error', 'Error al obtener puzzle diario');
    }
  });

  socket.on('submit_daily_puzzle', async (data) => {
    if (!socket.authenticated) return;
    const { puzzleId, solved, difficulty } = data; // difficulty not really needed if we use DB rating

    if (!solved) return; // If failed, maybe just do nothing or reset streak? Let's just track successes for now.

    try {
      const user = await prisma.user.findUnique({ where: { username: socket.username } });
      const now = new Date();

      // Calculate Streak
      let newStreak = user.streak;
      const lastDate = user.lastDailyDate ? new Date(user.lastDailyDate) : null;

      if (lastDate) {
        const yesterday = new Date(now);
        yesterday.setUTCDate(now.getUTCDate() - 1);

        const isYesterday =
          lastDate.getUTCFullYear() === yesterday.getUTCFullYear() &&
          lastDate.getUTCMonth() === yesterday.getUTCMonth() &&
          lastDate.getUTCDate() === yesterday.getUTCDate();

        const isToday =
          lastDate.getUTCFullYear() === now.getUTCFullYear() &&
          lastDate.getUTCMonth() === now.getUTCMonth() &&
          lastDate.getUTCDate() === now.getUTCDate();

        if (isToday) return; // Ignore doubletaps

        if (isYesterday) {
          newStreak++;
        } else {
          newStreak = 1; // Reset if missed a day
        }
      } else {
        newStreak = 1; // First time
      }

      // Rewards
      const points = 10 + (newStreak * 2); // Base 10 + 2 per streak day
      const newElo = user.puzElo + points; // Add to puzzle ELO

      // Transaction: Update User & Add History
      await prisma.$transaction([
        prisma.user.update({
          where: { username: socket.username },
          data: {
            streak: newStreak,
            lastDailyDate: now,
            puzElo: newElo
          }
        }),
        prisma.userPuzzleHistory.create({
          data: {
            userId: user.id,
            puzzleId: puzzleId
          }
        })
      ]);

      socket.emit('daily_puzzle_result', {
        success: true,
        points: points,
        streak: newStreak,
        newElo: newElo
      });

    } catch (e) {
      console.error("Error submitting daily puzzle:", e);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const https = require('https');

app.get('/puzzles', (req, res) => {
  const { themes, min_rating, max_rating, limit } = req.query;
  const url = `https://chess-puzzles-api.vercel.app/puzzles?themes=${themes || 'mate'}&min_rating=${min_rating || 1000}&max_rating=${max_rating || 1500}&limit=${limit || 50}&_t=${Date.now()}`;

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => { data += chunk; });
    apiRes.on('end', () => {
      try {
        res.json(JSON.parse(data));
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse puzzles' });
      }
    });
  }).on('error', (err) => {
    console.error('Error proxying puzzles:', err);
    res.status(500).json({ error: 'Failed to fetch puzzles' });
  });
});

// AI PROXY ENDPOINT - Resolve CORS issues
app.post('/api/ai-proxy', express.json(), async (req, res) => {
  try {
    const { provider, apiKey, prompt } = req.body;

    if (!provider || !apiKey || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let response;
    const aiData = await processAIRequest(provider, apiKey, prompt);

    if (aiData.error) {
      return res.status(aiData.status || 500).json({ error: aiData.error });
    }

    return res.json({ text: aiData.text });

  } catch (error) {
    console.error('AI Proxy Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Función centralizada para procesar IA (compartida por HTTP y Sockets)
async function processAIRequest(provider, apiKey, prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 segundos máximo

  try {
    console.log(`📡 Llamando a ${provider}...`);
    let response;

    switch (provider) {
      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'Eres un maestro de ajedrez experto y didáctico. Explica la posición de forma muy breve (2 frases).' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 150,
            temperature: 0.7
          })
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ OpenAI Error: ${response.status}`, errorText);
          return { error: `OpenAI: ${response.status} - Verifica tu clave y saldo.` };
        }

        const openaiData = await response.json();
        return { text: openaiData.choices[0].message.content };

      case 'claude':
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 150,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Claude Error: ${response.status}`, errorText);
          return { error: `Claude: ${response.status} - Verifica tu configuración.` };
        }

        const claudeData = await response.json();
        return { text: claudeData.content[0].text };

      case 'perplexity':
        response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'sonar', // Modelo más estable y actual
            messages: [
              { role: 'system', content: 'Eres un maestro de ajedrez experto.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 150
          })
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
          const errorMsg = await response.text();
          let parsedError;
          try { parsedError = JSON.parse(errorMsg); } catch (e) { parsedError = { error: { message: errorMsg } }; }

          const detail = parsedError.error?.message || errorMsg;
          console.error(`❌ Perplexity Error Detail:`, detail);
          return { error: `Perplexity: ${detail}` };
        }

        const perplexityData = await response.json();
        return { text: perplexityData.choices[0].message.content };

      default:
        clearTimeout(timeoutId);
        return { error: 'Proveedor no reconocido' };
    }
  } catch (e) {
    clearTimeout(timeoutId);
    console.error(`❌ Error en el proceso de IA:`, e.message);
    if (e.name === 'AbortError') return { error: 'La IA tardó demasiado en responder (Timeout).' };
    return { error: `Error de conexión: ${e.message}` };
  }
}



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
  console.log(`🔒 Modo: ${process.env.NODE_ENV || 'development'}`);
});
