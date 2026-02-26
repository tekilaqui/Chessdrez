/*
  Warnings:

  - You are about to drop the `Move` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Move";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "game_moves" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "ply" INTEGER NOT NULL,
    "fen" TEXT NOT NULL,
    "san" TEXT,
    "uci" TEXT,
    "eval_before" REAL,
    "eval_after" REAL,
    "delta" REAL,
    "classification" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "game_moves_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "game_moves_gameId_idx" ON "game_moves"("gameId");

-- CreateIndex
CREATE INDEX "game_moves_gameId_ply_idx" ON "game_moves"("gameId", "ply");
