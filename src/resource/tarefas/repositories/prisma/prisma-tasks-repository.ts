import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../tasks.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { TaskEntity } from "../../entities/task-entity";
import { QueryTarefaDto } from "../../dto/query-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
    constructor(private prisma: PrismaService) { }

    async create(currentUserId: string, data: CreateTaskDto): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.create({
            data: {
                id_usuario: parseInt(currentUserId),
                id_importancia: data.id_importancia,
                id_categoria: data.id_categoria,
                id_status: data.id_status,
                nome: data.nome,
                descricao: data.descricao,
                anotacao: data.anotacao,
                data_criacao: new Date(),
                data_vencimento: data.data_vencimento,
                criado_em: new Date(),
            }
        })

        return task
    }

    async findAll(currentUserId: string, query: QueryTarefaDto) {
        let { page = 1, limit = 10, search = '', nome, descricao, anotacao, data_criacao, criado_em, data_vencimento } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            id_usuario: parseInt(currentUserId),
            excluido_em: null,
        };

        if (search) {
            whereCondition.OR = [
                { nome: { contains: search } },
                { descricao: { contains: search } },
                { anotacao: { contains: search } },
                { data_criacao: { contains: search } },
                { criado_em: { contains: search } },
                { data_vencimento: { contains: search } },
            ];
        }

        if (nome) {
            whereCondition.nome = { contains: nome };
        }

        if (descricao) {
            whereCondition.descricao = { contains: descricao };
        }

        if (anotacao) {
            whereCondition.anotacao = { contains: anotacao };
        }

        if (data_criacao) {
            whereCondition.data_criacao = { contains: data_criacao };
        }

        if (criado_em) {
            whereCondition.criado_em = { contains: criado_em };
        }

        if (data_vencimento) {
            whereCondition.data_vencimento = { contains: data_vencimento };
        }

        const total = await this.prisma.tarefas.count({
            where: {
                excluido_em: null,
                ...whereCondition
            },
        });

        const users = await this.prisma.tarefas.findMany({
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

    async findUnique(currentUserId: string, id: string): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.findUnique({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
                excluido_em: null,
            }
        })

        return task
    }

    async update(currentUserId: string, id: string, dataTask: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.update({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
                excluido_em: null,
            },
            data: {
                id_importancia: dataTask.id_importancia,
                id_categoria: dataTask.id_categoria,
                id_status: dataTask.id_status,
                nome: dataTask.nome,
                descricao: dataTask.descricao,
                anotacao: dataTask.anotacao,
                data_vencimento: dataTask.data_vencimento,
                editado_em: new Date(),
            }
        })

        return task
    }

    async delete(currentUserId: string, id: string): Promise<void> {
        const task = await this.prisma.tarefas.update({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
                excluido_em: null,
            },
            data: {
                excluido_em: new Date()
            }
        })
    }
}
