import { BadGatewayException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Res, BadRequestException } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
import { UsersService } from "./users.service";
import { MailerService } from "@nestjs-modules/mailer";
import { sendEmail } from "src/utils/send-email";
import { PrismaService } from "src/database/PrismaService";

@Controller('usuario')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
        private readonly prisma: PrismaService
    ) { }

    @Post('/esqueci/senha')
    async sendEmail(@Body() updatePassword) {
        try {
            const { nome } = await this.prisma.usuarios.findUnique({
                where: {
                    email: updatePassword.to
                }
            })
            await sendEmail(this.mailerService, updatePassword.to, "Remember - Recuperação de Senha", `
            Olá, ${nome}

            Parece que você esqueceu sua senha 🤔
            Recebemos o seu pedido de redefinição

            Clique no link abaixo para criar uma nova senha.
            Link de acesso: https://remember.com/redefinir-senha

            Caso não tenha solicitado a alteração, por favor desconsidere o e-mail.
            Se precisar de alguma ajuda, entre em contato conosco através do e-mail: rememberfatec@gmail.com
            Abraços.
            `)
        } catch {
            throw new BadRequestException("Erro ao enviar o email.")
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() query: QueryUserDto) {
        return this.usersService.findAll(query)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findUnique(@Param('id') id: string) {
        return this.usersService.findUnique(id)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }
}