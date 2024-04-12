/*
  Warnings:

  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `id_status` on the `tarefas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "status_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "status";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "lista_tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tarefa" INTEGER NOT NULL,
    "nome_item" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "lista_tarefa_id_tarefa_fkey" FOREIGN KEY ("id_tarefa") REFERENCES "tarefas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "prioridade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_importancia" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_prioridade" INTEGER NOT NULL DEFAULT 1,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_vencimento" DATETIME NOT NULL,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME,
    CONSTRAINT "tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_prioridade_fkey" FOREIGN KEY ("id_prioridade") REFERENCES "importancia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_prioridade_fkey" FOREIGN KEY ("id_prioridade") REFERENCES "prioridade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("anotacao", "criado_em", "data_criacao", "data_vencimento", "descricao", "editado_em", "excluido_em", "id", "id_categoria", "id_importancia", "id_usuario", "nome") SELECT "anotacao", "criado_em", "data_criacao", "data_vencimento", "descricao", "editado_em", "excluido_em", "id", "id_categoria", "id_importancia", "id_usuario", "nome" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
CREATE UNIQUE INDEX "tarefas_id_key" ON "tarefas"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "lista_tarefa_id_key" ON "lista_tarefa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "prioridade_id_key" ON "prioridade"("id");
