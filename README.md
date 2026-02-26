# ChessDrez - Plataforma de Ajedrez con IA

Una aplicación web moderna para jugar, analizar e investigar aperturas de ajedrez, potenciada por el motor Stockfish 16.1 y un sistema de comentarios inteligentes.

## 🚀 Características Principales

- **Jugar contra la IA**: 20 niveles de dificultad, desde principiante hasta maestro.
- **Análisis Real-Time**: Evaluación continua (centipeones) y visualización de la mejor jugada (flechas).
- **Comentarios de IA**: Clasificación automática de jugadas (¡Brillante!, Gran Movimiento, Error Grave, etc.) con explicaciones textuales.
- **Explorador de Aperturas**: Base de datos expandida con cientos de variantes teóricas y ejercicios prácticos.
- **Rompecabezas (Puzzles)**: Entrena tu táctica con problemas de diferentes niveles.
- **Arquitectura Moderna**: Construido con un monorepo usando Turbo, garantizando velocidad y consistencia.

## 🛠️ Stack Tecnológico

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, react-chessboard.
- **Backend**: NestJS, Prisma ORM, Better-SQLite3, BullMQ.
- **Motor de Ajedrez**: Stockfish 16.1 (corriendo localmente vía Web Workers).
- **Monorepo**: Turborepo, PNPM.

## 📁 Estructura del Proyecto

- `apps/web`: Aplicación frontend SPA.
- `apps/api`: Servidor backend Node.js.
- `packages/shared`: Código compartido entre cliente y servidor (tipos, lógica de ajedrez, base de datos de aperturas).

## 💻 Desarrollo Local

1.  **Instalación**:
    ```bash
    pnpm install
    ```

2.  **Configuración**:
    Crea un archivo `.env` en `apps/api` basado en `.env.example`.

3.  **Base de Datos**:
    ```bash
    cd apps/api
    npx prisma generate
    npx prisma db push
    ```

4.  **Ejecución**:
    Desde la raíz:
    ```bash
    npm run dev
    ```

## 📖 Cómo funciona la IA

El sistema utiliza **Stockfish** en segundo plano. Cuando realizas un movimiento:
1. El motor analiza la posición para encontrar la mejor continuación.
2. Compara la evaluación antes y después de tu jugada.
3. El `CommentEngine` clasifica la jugada basándose en la pérdida de centipeones (o ganancia si es brillante).
4. Se traduce la clasificación técnica a un mensaje amigable para el usuario.

## 🏗️ Despliegue

La aplicación es de 12 factores y puede desplegarse en contenedores Docker:
```bash
docker-compose up --build
```

---
*Desarrollado para la excelencia en el ajedrez digital.*
