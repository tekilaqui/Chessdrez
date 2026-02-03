# ♟️ Chess Tricks - Maestro IA & Ajedrez Online

Una plataforma web moderna de ajedrez con IA, juego online, análisis avanzado y sistema de puzzles tácticos.

## 🎯 Características Principales

- 🤖 **Maestro IA**: Análisis con Stockfish y recomendaciones inteligentes
- 🎮 **Juego Online**: Desafíos en tiempo real con otros jugadores
- 📚 **Academia de Ajedrez**: Sistema progresivo de lecciones y ejercicios
- 🎯 **Puzzles Tácticos**: Miles de posiciones tácticas clasificadas por dificultad
- 📖 **Base de Aperturas**: Teoría y entrenamiento de aperturas
- 📱 **PWA**: Instalable en dispositivos, funciona offline
- 📊 **Análisis Detallado**: Evaluación de movimientos y gráficos de evaluación

## 🛠️ Tech Stack

### Backend
- **Node.js** + Express (v4.18.2)
- **PostgreSQL** + Prisma ORM (v6.2.1)
- **WebSockets** con Socket.io (v4.7.2)
- **Seguridad**: JWT, Helmet, Rate Limiting, CORS

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- **Chess.js** - Motor de lógica
- **Chessboard.js** - Interfaz del tablero
- **Stockfish** - Análisis IA
- jQuery para utilidades DOM

## 📦 Setup Local

### Requisitos
- Node.js >= 18.0.0
- PostgreSQL >= 12
- npm o yarn

### Instalación

```bash
# 1. Clonar repo
git clone <repo-url>
cd chesstricks

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales DB y JWT_SECRET

# 4. Migraciones de BD
npx prisma migrate deploy

# 5. Iniciar servidor
npm run dev
```

El servidor estará en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
chesstricks/
├── server.js              # Express server + Socket.io
├── index.html             # HTML principal
├── client.js              # Lógica del cliente (en refactorización)
├── auth.js                # Sistema de autenticación
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── utils/             # Funciones utilitarias
│   ├── styles/            # CSS modular
│   └── lib/               # Librerías personalizadas
├── vendor/                # Librerías externas
├── prisma/
│   └── schema.prisma      # Esquema de BD
├── kids/                  # Módulo educativo infantil
└── data/                  # Datos (puzzles, etc)
```

## 🔐 Seguridad

- ✅ Helmet CSP habilitado
- ✅ Rate limiting en auth
- ✅ JWT con expiración
- ✅ Validación de inputs
- ✅ Sanitización de HTML
- ⚠️ Dotfiles protegidos (`.env` nunca expuesto)

Configurado para **Render.com** mediante **Blueprints** (Recomendado):

1. En el panel de Render, pulsa **"+ New"** -> **"Blueprint"**.
2. Conecta tu repositorio.
3. Render configurará la base de datos PostgreSQL, `DATABASE_URL` y `JWT_SECRET` automáticamente.

### Despliegue Manual (Alternativo)
Variables de entorno requeridas en Render si no usas Blueprints:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Clave secreta para JWT (cambiar en producción)
- `NODE_ENV`: "production"

## 🐛 Estado Actual & Mejoras Pendientes

### En Progreso
- [ ] Refactorización de client.js (5K líneas → módulos)
- [ ] Expansión del schema Prisma
- [ ] Tests unitarios

### Completado ✅
- Helmet CSP y protección de dotfiles
- JWT validation mejorada
- Error handling seguro

## 📝 Licencia

Todos los derechos reservados © 2025 Chess Tricks Online
