-- CreateTable
CREATE TABLE "refreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "refreshToken_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_id_key" ON "refreshToken"("id");
