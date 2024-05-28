/*
  Warnings:

  - You are about to drop the `medalhas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario_medalha` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "medalhas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "usuario_medalha";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "avatares" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "qtde_xp" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario_avatar" (
    "id_usuario" INTEGER NOT NULL,
    "id_medalha" INTEGER NOT NULL,

    PRIMARY KEY ("id_medalha", "id_usuario"),
    CONSTRAINT "usuario_avatar_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_avatar_id_medalha_fkey" FOREIGN KEY ("id_medalha") REFERENCES "avatares" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "avatares_id_key" ON "avatares"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_avatar_id_usuario_key" ON "usuario_avatar"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_avatar_id_medalha_key" ON "usuario_avatar"("id_medalha");
