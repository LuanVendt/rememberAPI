-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "xp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tarefas" (
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
    CONSTRAINT "tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "importancia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "importancia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categoria_usuario" (
    "id_categoria" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "categoria_usuario_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categoria_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "anexos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tarefa" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "data_anexo" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "anexos_id_tarefa_fkey" FOREIGN KEY ("id_tarefa") REFERENCES "tarefas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "temas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cor1" TEXT NOT NULL,
    "cor2" TEXT NOT NULL,
    "cor3" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario_tema" (
    "id_usuario" INTEGER NOT NULL,
    "id_tema" INTEGER NOT NULL,
    CONSTRAINT "usuario_tema_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "temas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_tema_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medalhas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "qtde_xp" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "medalha_usuario" (
    "id_usuario" INTEGER NOT NULL,
    "id_medalha" INTEGER NOT NULL,
    CONSTRAINT "medalha_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medalha_usuario_id_medalha_fkey" FOREIGN KEY ("id_medalha") REFERENCES "medalhas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "nome_medico" TEXT NOT NULL,
    "especializacao" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "consultas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transacoes_financeiras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    CONSTRAINT "transacoes_financeiras_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tarefas_id_key" ON "tarefas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "importancia_id_key" ON "importancia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_id_key" ON "categorias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_usuario_id_categoria_key" ON "categoria_usuario"("id_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_usuario_id_usuario_key" ON "categoria_usuario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "status_id_key" ON "status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "anexos_id_key" ON "anexos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "temas_id_key" ON "temas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_tema_id_usuario_key" ON "usuario_tema"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_tema_id_tema_key" ON "usuario_tema"("id_tema");

-- CreateIndex
CREATE UNIQUE INDEX "medalhas_id_key" ON "medalhas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "medalha_usuario_id_usuario_key" ON "medalha_usuario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "medalha_usuario_id_medalha_key" ON "medalha_usuario"("id_medalha");

-- CreateIndex
CREATE UNIQUE INDEX "consultas_id_key" ON "consultas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transacoes_financeiras_id_key" ON "transacoes_financeiras"("id");
