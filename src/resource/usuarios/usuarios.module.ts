import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { PrismaUsersRepository } from "./repositorios/prisma/prisma-users-repository";
import { UsuariosRepository } from "./repositorios/usuarios.repository";
import { LoginUserController } from "./login-usuario.controller";

@Module({
    controllers: [UsuariosController, LoginUserController],
    providers: [
        PrismaService,
        UsuariosService,
        PrismaUsersRepository,
        { provide: UsuariosRepository, useClass: PrismaUsersRepository }
    ]
})
export class UsersModule { }