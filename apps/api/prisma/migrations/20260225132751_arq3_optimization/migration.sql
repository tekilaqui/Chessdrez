-- AlterTable
ALTER TABLE "Game" ADD COLUMN "aiLevel" INTEGER;
ALTER TABLE "Game" ADD COLUMN "source" TEXT;
ALTER TABLE "Game" ADD COLUMN "timeControl" TEXT;

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fen" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "ratingDeviation" INTEGER NOT NULL,
    "themes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Move" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "ply" INTEGER NOT NULL,
    "fen" TEXT NOT NULL,
    "san" TEXT,
    "uci" TEXT,
    "evalBefore" REAL,
    "evalAfter" REAL,
    "delta" REAL,
    "classification" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Move_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Opening" (
    "eco" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fenRoot" TEXT NOT NULL,
    "dataJson" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OpeningProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eco" TEXT NOT NULL,
    "progress" REAL NOT NULL,
    "history" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OpeningProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OpeningProgress_eco_fkey" FOREIGN KEY ("eco") REFERENCES "Opening" ("eco") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRepertoire" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eco" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserRepertoire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserRepertoire_eco_fkey" FOREIGN KEY ("eco") REFERENCES "Opening" ("eco") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PuzzleAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PuzzleAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuzzleAttempt_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PuzzleAttempt" ("createdAt", "delta", "id", "puzzleId", "rating", "success", "userId") SELECT "createdAt", "delta", "id", "puzzleId", "rating", "success", "userId" FROM "PuzzleAttempt";
DROP TABLE "PuzzleAttempt";
ALTER TABLE "new_PuzzleAttempt" RENAME TO "PuzzleAttempt";
CREATE INDEX "PuzzleAttempt_userId_idx" ON "PuzzleAttempt"("userId");
CREATE INDEX "PuzzleAttempt_puzzleId_idx" ON "PuzzleAttempt"("puzzleId");
CREATE INDEX "PuzzleAttempt_userId_createdAt_idx" ON "PuzzleAttempt"("userId", "createdAt");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "elo" INTEGER NOT NULL DEFAULT 500,
    "puzzleRating" INTEGER NOT NULL DEFAULT 500,
    "puzzleStreak" INTEGER NOT NULL DEFAULT 0,
    "puzzleSolved" INTEGER NOT NULL DEFAULT 0,
    "puzzleFailed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "elo", "email", "id", "name", "password", "puzzleRating", "updatedAt") SELECT "createdAt", "elo", "email", "id", "name", "password", "puzzleRating", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Puzzle_rating_idx" ON "Puzzle"("rating");

-- CreateIndex
CREATE INDEX "Move_gameId_idx" ON "Move"("gameId");

-- CreateIndex
CREATE INDEX "Move_gameId_ply_idx" ON "Move"("gameId", "ply");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningProgress_userId_eco_key" ON "OpeningProgress"("userId", "eco");

-- CreateIndex
CREATE UNIQUE INDEX "UserRepertoire_userId_eco_key" ON "UserRepertoire"("userId", "eco");
