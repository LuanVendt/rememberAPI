import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UsuariosController } from "./usuarios.controller";
import { UsersService } from "./usuarios.service";
import { PrismaUsersRepository } from "./repositorios/prisma/prisma-users-repository";
import { UsersRepository } from "./repositorios/users.repository";
import { LoginUserController } from "./login-usuario.controller";

@Module({
    controllers: [UsuariosController, LoginUserController],
    providers: [
        PrismaService,
        UsersService,
        PrismaUsersRepository,
        { provide: UsersRepository, useClass: PrismaUsersRepository }
    ]
})
export class UsersModule { }