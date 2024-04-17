/*
  Warnings:

  - You are about to drop the `usuario_tema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cor1` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `cor2` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `cor3` on the `temas` table. All the data in the column will be lost.
  - Added the required column `ativo` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeAviso` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeFundo` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeHover` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeInfo` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDePerigo` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeSucesso` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeTexto` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corDeTextoGeral` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corLight` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corPrimaria` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corSecundaria` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `temas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "usuario_tema_id_tema_key";

-- DropIndex
DROP INDEX "usuario_tema_id_usuario_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "usuario_tema";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_temas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "corPrimaria" TEXT NOT NULL,
    "corSecundaria" TEXT NOT NULL,
    "corDeFundo" TEXT NOT NULL,
    "corDeAviso" TEXT NOT NULL,
    "corDeHover" TEXT NOT NULL,
    "corDeTexto" TEXT NOT NULL,
    "corDeTextoGeral" TEXT NOT NULL,
    "corDePerigo" TEXT NOT NULL,
    "corDeSucesso" TEXT NOT NULL,
    "corDeInfo" TEXT NOT NULL,
    "corLight" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);
INSERT INTO "new_temas" ("id") SELECT "id" FROM "temas";
DROP TABLE "temas";
ALTER TABLE "new_temas" RENAME TO "temas";
CREATE UNIQUE INDEX "temas_id_key" ON "temas"("id");
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tema" INTEGER NOT NULL DEFAULT 1,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME,
    CONSTRAINT "usuarios_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "temas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuarios" ("criado_em", "data_nasc", "editado_em", "email", "excluido_em", "id", "nome", "senha", "telefone", "xp") SELECT "criado_em", "data_nasc", "editado_em", "email", "excluido_em", "id", "nome", "senha", "telefone", "xp" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
