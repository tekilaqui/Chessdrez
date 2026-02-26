# Plataforma de Ajedrez: Stack y Estructura Actual

## 🚀 Stack Tecnológico

### Frontend (Aplicación Web - `apps/web`)
*   **Core:** React 19 con TypeScript, empaquetado y servido de forma ultra-rápida usando Vite.
*   **Enrutamiento:** React Router DOM (v7).
*   **Estilos y UI:** Tailwind CSS, complementado con `clsx` y `tailwind-merge` para clases dinámicas, y `lucide-react` para la iconografía.
*   **Ajedrez:** Se utiliza `react-chessboard` para el diseño del tablero visual y la lógica del juego con `chess.js`.
*   **Peticiones HTTP:** Axios para comunicarse con la API.

### Backend (API Rest - `apps/api`)
*   **Framework:** NestJS (v10) con TypeScript. Arquitectura modular, orientada a servicios e inyección de dependencias.
*   **Base de Datos / ORM:** Prisma ORM integrado con `@libsql/client` y `@prisma/adapter-libsql` (usando LibSQL/Turso en lugar de SQLite estándar, ideal para soporte edge/serverless).
*   **Autenticación:** Passport y JWT (`@nestjs/jwt`), con encriptación de contraseñas mediante `bcrypt`.

### Tiempo Real (`apps/realtime`)
*   **WebSockets:** Node.js con `socket.io` puro, utilizando `redis` para sincronizar instancias o gestionar el estado de los clientes en vivo.

---

## 📂 Estructura Actual (Carpetas y Servicios)

El proyecto está configurado como un *monorepo* (usando pnpm workspaces y Turborepo), dividiendo el código lógicamente en `apps/` y `packages/`:

### 1. `apps/web/src` (Frontend)
*   `api/`: Configuraciones de Axios y llamadas a endpoints del backend.
*   `components/`: Componentes genéricos y reutilizables de UI (botones, layouts, y el visualizador `ChessBoard.tsx`).
*   `context/`: Proveedores de estado global para React (sesión de usuario, estado general de la aplicación).
*   `hooks/`: Custom Hooks con la lógica de negocio del cliente (ej. `usePuzzles`).
*   `i18n/`: Archivos para la internacionalización y traducciones.
*   `pages/`: Las vistas y rutas principales generadas (ej. `AnalysisPage.tsx`, `PlayPage.tsx`, `OpeningsPage.tsx`).
*   `tests/`: Pruebas del lado del cliente.
*   `types/`: Definiciones e interfaces TypeScript específicas del frontend.

### 2. `apps/api/src` (Backend con NestJS)
*   `auth/`: Módulo de autenticación (controladores de registro/login, estrategias JWT, hashing de contraseñas).
*   `users/`: Capa lógica (CRUD) enfocada a la gestión de los perfiles de los usuarios.
*   `games/`: Lógica central del sistema de partidas en curso, registro de movimientos, y estado del juego.
*   `prisma/`: Servicios y configuración que instancian la conexión a Prisma.
*   `generated/`: Tipos o código cliente autogenerado asociado al modelo de base de datos.
*   *Archivos principales:* `app.module.ts` (módulo raíz) y `main.ts` (punto de entrada).

### 3. Otros componentes clave en el ecosistema:
*   `apps/realtime/`: Microservicio dedicado a la comunicación de partidas (movimientos en vivo) a través de conexiones de socket y Redis.
*   `apps/worker/`: Tareas asíncronas y evaluación de fondo, como procesamiento de análisis (Stockfish) o motores de emparejamiento.
*   `packages/shared/`: Espacio de código común para compartir constantes e interfaces (ej. tipos de `User`, `Game`) entre el cliente frontend, la API e inclusive Realtime.
*   `infra/`: Posibles configuraciones de despliegue, Docker o infraestructura global de la plataforma.
