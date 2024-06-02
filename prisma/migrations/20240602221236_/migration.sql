/*
  Warnings:

  - You are about to drop the column `data` on the `transacoes_financeiras` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transacoes_financeiras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencimento_em" DATETIME,
    "tipo" TEXT NOT NULL,
    CONSTRAINT "transacoes_financeiras_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transacoes_financeiras" ("categoria", "descricao", "id", "id_usuario", "preco", "tipo") SELECT "categoria", "descricao", "id", "id_usuario", "preco", "tipo" FROM "transacoes_financeiras";
DROP TABLE "transacoes_financeiras";
ALTER TABLE "new_transacoes_financeiras" RENAME TO "transacoes_financeiras";
CREATE UNIQUE INDEX "transacoes_financeiras_id_key" ON "transacoes_financeiras"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
