import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UsuariosController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { UsersRepository } from "./repositories/users.repository";
import { LoginUserController } from "./login-users.controller";

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