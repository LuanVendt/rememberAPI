/*
  Warnings:

  - Added the required column `criado_em` to the `tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criado_em` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_importancia" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_status" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_vencimento" DATETIME NOT NULL,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME,
    CONSTRAINT "tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "importancia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("anotacao", "data_criacao", "data_vencimento", "descricao", "id", "id_categoria", "id_importancia", "id_status", "id_usuario", "nome") SELECT "anotacao", "data_criacao", "data_vencimento", "descricao", "id", "id_categoria", "id_importancia", "id_status", "id_usuario", "nome" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
CREATE UNIQUE INDEX "tarefas_id_key" ON "tarefas"("id");
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME
);
INSERT INTO "new_usuarios" ("data_nasc", "email", "id", "nome", "senha", "telefone", "xp") SELECT "data_nasc", "email", "id", "nome", "senha", "telefone", "xp" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
