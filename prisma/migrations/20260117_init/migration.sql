-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "elo" INTEGER NOT NULL DEFAULT 500,
    "puzElo" INTEGER NOT NULL DEFAULT 500,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Game" (
    "id" TEXT PRIMARY KEY,
    "whiteId" INTEGER NOT NULL,
    "blackId" INTEGER NOT NULL,
    "fen" TEXT NOT NULL,
    "moves" TEXT NOT NULL,
    "turn" TEXT NOT NULL DEFAULT 'w',
    "whiteTime" INTEGER NOT NULL,
    "blackTime" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "timeControl" TEXT,
    CONSTRAINT "Game_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Puzzle" (
    "id" TEXT PRIMARY KEY,
    "fen" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "themes" TEXT NOT NULL
);
