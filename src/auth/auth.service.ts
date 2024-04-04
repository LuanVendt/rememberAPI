import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../database/PrismaService";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    private async comparePasswords(
        senha: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(senha, hashedPassword);
    }

    async login(dataLogin: LoginDto) {
        const usuario = await this.prisma.usuarios.findFirst({
            where: {
                email: dataLogin.email,
                senha: dataLogin.password,
            },
        })

        if (!usuario) {
            throw new BadRequestException('Invalid Credentials.')
        }
        // if (!this.comparePasswords(dataLogin.password, usuario.senha[0])) {
        //     throw new BadRequestException('Invalid Credentials.')
        // }

        const payload = { id: usuario.id }
        const token = this.jwtService.sign(payload)
        const decodedToken = this.jwtService.verify(token) as { exp: number }

        const refreshToken = this.jwtService.sign({
            id: null
        })
        await this.prisma.refresh_token.create({
            data: {
                refreshToken: refreshToken,
                id_usuario: usuario.id,
            }
        })

        const data = {
            accesToken: token,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000),
            usuario
        }

        return data
    }

    async refresh(dataRefresh: RefreshDto) {
        const token = await this.prisma.refresh_token.findFirst({
            where: {
                refreshToken: dataRefresh.refreshToken,
                usado: false,
            }
        })

        if (!token) {
            throw new BadRequestException('Invalid Token.')
        }

        if (!(await this.verifyRefreshToken(token.refreshToken))) {
            throw new BadRequestException('Invalid Token.')
        }

        await this.prisma.refresh_token.update({
            where: {
                id: token.id,
            },
            data: {
                usado: true,
            },
        })

        const payload = { id: token.id_usuario };
        const newToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign({
            id: null,
        })

        await this.prisma.refresh_token.create({
            data: {
                refreshToken: refreshToken,
                id_usuario: token.id_usuario,
            }
        })

        const decodedToken = this.jwtService.verify(newToken) as {
            exp: number;
        }

        const data = {
            accesToken: newToken,
            refreshToken: refreshToken,
            expiresIn: new Date(decodedToken.exp * 1000)
        }

        return data
    }

    async verifyRefreshToken(token: string) {
        try {
            this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as {
                id: number;
            };
            return decodedToken.id;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async validateUsuario(payload: { id: string }) {
        const usuario = await this.prisma.usuarios.findUnique({
            where: { id: Number(payload.id) },
        });
        if (!usuario) {
            throw new UnauthorizedException();
        }
        return usuario;
    }
}