-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tema" INTEGER NOT NULL DEFAULT 1,
    "id_avatar" INTEGER NOT NULL DEFAULT 1,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME,
    CONSTRAINT "usuarios_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "temas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuarios_id_avatar_fkey" FOREIGN KEY ("id_avatar") REFERENCES "avatares" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuarios" ("criado_em", "data_nasc", "editado_em", "email", "excluido_em", "id", "id_tema", "nome", "senha", "telefone", "xp") SELECT "criado_em", "data_nasc", "editado_em", "email", "excluido_em", "id", "id_tema", "nome", "senha", "telefone", "xp" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
