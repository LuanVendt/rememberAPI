import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../tasks.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { TaskEntity } from "../../entities/task-entity";
import { QueryTarefaDto } from "../../dto/query-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";
import { CreateTaskItemDto } from "../../dto/create-task-item.dto";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
    constructor(private prisma: PrismaService) { }

    async create(currentUserId: string, data: CreateTaskDto): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.create({
            data: {
                id_usuario: parseInt(currentUserId),
                id_categoria: data.id_categoria,
                id_prioridade: data.id_prioridade,
                id_status: data.id_status,
                nome: data.nome,
                descricao: data.descricao,
                anotacao: data.anotacao,
                data_criacao: new Date(),
                data_vencimento: data.data_vencimento,
                criado_em: new Date(),
            }
        })

        if (data.lista_tarefa) {
            await this.createItem(task.id, data.lista_tarefa)
        }

        return task
    }

    async createItem(taskId: number, data: CreateTaskItemDto): Promise<void> {
        const item = await this.prisma.lista_tarefa.create({
            data: {
                id_tarefa: taskId,
                descricao: data.descricao,
                status: Boolean(data.status),
                criado_em: new Date()
            }
        })
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
            whereCondition.data_criacao = { equals: new Date(data_criacao) };
        }

        if (criado_em) {
            whereCondition.criado_em = { equals: new Date(criado_em) };
        }

        if (data_vencimento) {
            whereCondition.data_vencimento = { equals: new Date(data_vencimento) };
        }

        const total = await this.prisma.tarefas.count({
            where: {
                excluido_em: null,
                ...whereCondition
            },
        });

        const tasks = await this.prisma.tarefas.findMany({
            where: {
                excluido_em: null,
                ...whereCondition
            },
            skip,
            take: limit,
            include: {
                lista_tarefa: {}
            }
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: tasks,
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

    async findAllCategories() {
        const categories = await this.prisma.categorias.findMany()

        return categories
    }

    async update(currentUserId: string, id: string, dataTask: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.update({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
                excluido_em: null,
            },
            data: {
                id_categoria: dataTask.id_categoria,
                id_prioridade: dataTask.id_prioridade,
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
