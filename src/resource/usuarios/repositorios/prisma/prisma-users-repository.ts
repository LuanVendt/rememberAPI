import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateUserDto } from "../../dto/create-user.dto";
import { QueryUserDto } from "../../dto/query-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(data: CreateUserDto) {
        const findedUser = await this.prisma.usuarios.findFirst({
            where: {
                email: data.email
            }
        })

        if (findedUser) {
            throw new Error('Email já cadastrado.')
        }

        const user = await this.prisma.usuarios.create({
            data: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                data_nasc: new Date(data.data_nasc),
                senha: data.senha,
                criado_em: new Date()
            }
        })
    }

    async findAll(query: QueryUserDto) {
        let { page = 1, limit = 10, search = '', nome, email, telefone, data_nasc, criado_em, editado_em } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            excluido_em: null,
        };

        if (search) {
            whereCondition.OR = [
                { nome: { contains: search } },
                { email: { contains: search } },
                { telefone: { contains: search } },
                { data_nasc: { contains: search } },
                { criado_em: { contains: search } },
                { editado_em: { contains: search } },
            ];
        }

        if (nome) {
            whereCondition.nome = { contains: nome };
        }

        if (email) {
            whereCondition.email = { contains: email };
        }

        if (telefone) {
            whereCondition.telefone = { contains: telefone };
        }

        if (data_nasc) {
            whereCondition.data_nasc = { contains: data_nasc };
        }

        if (criado_em) {
            whereCondition.criado_em = { contains: criado_em };
        }

        if (editado_em) {
            whereCondition.editado_em = { contains: editado_em };
        }


        const total = await this.prisma.usuarios.count({
            where: {
                excluido_em: null,
                ...whereCondition
            },
        });

        const users = await this.prisma.usuarios.findMany({
            where: {
                excluido_em: null,
                ...whereCondition
            },
            skip,
            take: limit,
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: users,
        };
    }

    async findUnique(id: number) {
        const user = await this.prisma.usuarios.findUnique({
            where: {
                id,
                excluido_em: null,
            }
        })

        return user
    }

    async update(id: number, dataUser: UpdateUserDto) {
        const user = await this.prisma.usuarios.update({
            where: {
                id,
                excluido_em: null
            },
            data: {
                nome: dataUser.nome,
                email: dataUser.email,
                telefone: dataUser.telefone,
                data_nasc: dataUser.data_nasc,
                senha: dataUser.senha,
                xp: dataUser.xp,
                editado_em: new Date()
            }
        })

        return user
    }

    async delete(id: number): Promise<void> {
        const user = await this.prisma.usuarios.update({
            where: {
                id,
                excluido_em: null,
            },
            data: {
                excluido_em: new Date()
            }
        })
    }
}