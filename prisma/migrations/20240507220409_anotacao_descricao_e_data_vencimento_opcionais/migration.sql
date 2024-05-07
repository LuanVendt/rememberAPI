-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_status" INTEGER NOT NULL,
    "id_prioridade" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "anotacao" TEXT,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_vencimento" DATETIME,
    "criado_em" DATETIME NOT NULL,
    "editado_em" DATETIME,
    "excluido_em" DATETIME,
    CONSTRAINT "tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_prioridade_fkey" FOREIGN KEY ("id_prioridade") REFERENCES "prioridade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("anotacao", "criado_em", "data_criacao", "data_vencimento", "descricao", "editado_em", "excluido_em", "id", "id_categoria", "id_prioridade", "id_status", "id_usuario", "nome") SELECT "anotacao", "criado_em", "data_criacao", "data_vencimento", "descricao", "editado_em", "excluido_em", "id", "id_categoria", "id_prioridade", "id_status", "id_usuario", "nome" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
CREATE UNIQUE INDEX "tarefas_id_key" ON "tarefas"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
