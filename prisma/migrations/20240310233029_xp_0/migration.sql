-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_usuarios" ("data_nasc", "email", "id", "nome", "senha", "telefone", "xp") SELECT "data_nasc", "email", "id", "nome", "senha", "telefone", "xp" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
