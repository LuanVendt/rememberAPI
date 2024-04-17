/*
  Warnings:

  - You are about to drop the column `corDeAviso` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeFundo` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeHover` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeInfo` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDePerigo` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeSucesso` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeTexto` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corDeTextoGeral` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corLight` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corPrimaria` on the `temas` table. All the data in the column will be lost.
  - You are about to drop the column `corSecundaria` on the `temas` table. All the data in the column will be lost.
  - Added the required column `borderBottomColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `btnAltaColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `btnBaixaColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `btnMediaColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradient1Color` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradient2Color` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternaryColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shadowColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `svgColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tertiaryColor` to the `temas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userColor` to the `temas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_temas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "tertiaryColor" TEXT NOT NULL,
    "quaternaryColor" TEXT NOT NULL,
    "inputColor" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "shadowColor" TEXT NOT NULL,
    "userColor" TEXT NOT NULL,
    "gradient1Color" TEXT NOT NULL,
    "gradient2Color" TEXT NOT NULL,
    "borderBottomColor" TEXT NOT NULL,
    "svgColor" TEXT NOT NULL,
    "btnAltaColor" TEXT NOT NULL,
    "btnMediaColor" TEXT NOT NULL,
    "btnBaixaColor" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);
INSERT INTO "new_temas" ("ativo", "id", "nome") SELECT "ativo", "id", "nome" FROM "temas";
DROP TABLE "temas";
ALTER TABLE "new_temas" RENAME TO "temas";
CREATE UNIQUE INDEX "temas_id_key" ON "temas"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
