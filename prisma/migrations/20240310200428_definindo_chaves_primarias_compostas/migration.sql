/*
  Warnings:

  - You are about to drop the `medalha_usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "medalha_usuario_id_medalha_key";

-- DropIndex
DROP INDEX "medalha_usuario_id_usuario_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "medalha_usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuario_medalha" (
    "id_usuario" INTEGER NOT NULL,
    "id_medalha" INTEGER NOT NULL,

    PRIMARY KEY ("id_medalha", "id_usuario"),
    CONSTRAINT "usuario_medalha_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_medalha_id_medalha_fkey" FOREIGN KEY ("id_medalha") REFERENCES "medalhas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categoria_usuario" (
    "id_categoria" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    PRIMARY KEY ("id_categoria", "id_usuario"),
    CONSTRAINT "categoria_usuario_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categoria_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_categoria_usuario" ("id_categoria", "id_usuario") SELECT "id_categoria", "id_usuario" FROM "categoria_usuario";
DROP TABLE "categoria_usuario";
ALTER TABLE "new_categoria_usuario" RENAME TO "categoria_usuario";
CREATE UNIQUE INDEX "categoria_usuario_id_categoria_key" ON "categoria_usuario"("id_categoria");
CREATE UNIQUE INDEX "categoria_usuario_id_usuario_key" ON "categoria_usuario"("id_usuario");
CREATE TABLE "new_usuario_tema" (
    "id_usuario" INTEGER NOT NULL,
    "id_tema" INTEGER NOT NULL,

    PRIMARY KEY ("id_tema", "id_usuario"),
    CONSTRAINT "usuario_tema_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "temas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_tema_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuario_tema" ("id_tema", "id_usuario") SELECT "id_tema", "id_usuario" FROM "usuario_tema";
DROP TABLE "usuario_tema";
ALTER TABLE "new_usuario_tema" RENAME TO "usuario_tema";
CREATE UNIQUE INDEX "usuario_tema_id_usuario_key" ON "usuario_tema"("id_usuario");
CREATE UNIQUE INDEX "usuario_tema_id_tema_key" ON "usuario_tema"("id_tema");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_medalha_id_usuario_key" ON "usuario_medalha"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_medalha_id_medalha_key" ON "usuario_medalha"("id_medalha");
