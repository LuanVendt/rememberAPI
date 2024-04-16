/*
  Warnings:

  - You are about to drop the column `nome_item` on the `lista_tarefa` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `lista_tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lista_tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tarefa" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "lista_tarefa_id_tarefa_fkey" FOREIGN KEY ("id_tarefa") REFERENCES "tarefas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lista_tarefa" ("criado_em", "id", "id_tarefa", "status") SELECT "criado_em", "id", "id_tarefa", "status" FROM "lista_tarefa";
DROP TABLE "lista_tarefa";
ALTER TABLE "new_lista_tarefa" RENAME TO "lista_tarefa";
CREATE UNIQUE INDEX "lista_tarefa_id_key" ON "lista_tarefa"("id");
CREATE UNIQUE INDEX "lista_tarefa_id_id_tarefa_key" ON "lista_tarefa"("id", "id_tarefa");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
