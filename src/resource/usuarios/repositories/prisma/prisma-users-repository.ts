import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { CreateUserDto } from "../../dto/create-user.dto";
import { QueryUserDto } from "../../dto/query-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UsersRepository } from "../users.repository";

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
            throw new BadRequestException('Email já cadastrado.')
        }

        const user = await this.prisma.usuarios.create({
            data: {
                nome: data.nome,
                email: data.email,
                telefone: String(data.telefone),
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
            const criadoEmString = String(data_nasc);
            const [ano, mes, dia] = criadoEmString.split('-').map(Number);
            const dataCriacao = new Date(Date.UTC(ano, mes - 1, dia));

            const inicioDoDia = new Date(dataCriacao);
            inicioDoDia.setUTCHours(0, 0, 0, 0);

            const finalDoDia = new Date(dataCriacao);
            finalDoDia.setUTCHours(23, 59, 59, 999);

            whereCondition.data_nasc = {
                gte: inicioDoDia,
                lte: finalDoDia
            };
        }

        if (criado_em) {
            const criadoEmString = String(criado_em);
            const [ano, mes, dia] = criadoEmString.split('-').map(Number);
            const dataCriacao = new Date(Date.UTC(ano, mes - 1, dia));

            const inicioDoDia = new Date(dataCriacao);
            inicioDoDia.setUTCHours(0, 0, 0, 0);

            const finalDoDia = new Date(dataCriacao);
            finalDoDia.setUTCHours(23, 59, 59, 999);

            whereCondition.criado_em = {
                gte: inicioDoDia,
                lte: finalDoDia
            };
        }

        if (editado_em) {
            const criadoEmString = String(editado_em);
            const [ano, mes, dia] = criadoEmString.split('-').map(Number);
            const dataCriacao = new Date(Date.UTC(ano, mes - 1, dia));

            const inicioDoDia = new Date(dataCriacao);
            inicioDoDia.setUTCHours(0, 0, 0, 0);

            const finalDoDia = new Date(dataCriacao);
            finalDoDia.setUTCHours(23, 59, 59, 999);

            whereCondition.editado_em = {
                gte: inicioDoDia,
                lte: finalDoDia
            };
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
        let findedUser
        let user

        if (dataUser.data_nasc) {
            dataUser.data_nasc = new Date(dataUser.data_nasc)
        }

        if (dataUser.email) {
            findedUser = await this.prisma.usuarios.findUnique({
                where: {
                    email: dataUser.email
                }
            })
        }

        if (!findedUser) {
            user = await this.prisma.usuarios.update({
                where: {
                    id,
                    excluido_em: null
                },
                data: {
                    nome: dataUser.nome,
                    id_tema: dataUser.id_tema,
                    id_avatar: dataUser.id_avatar,
                    email: dataUser.email,
                    telefone: dataUser.telefone,
                    data_nasc: dataUser.data_nasc,
                    senha: dataUser.senha,
                    xp: dataUser.xp,
                    editado_em: new Date()
                }
            })
        } else {
            throw new BadRequestException('Email já cadastrado.')
        }

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