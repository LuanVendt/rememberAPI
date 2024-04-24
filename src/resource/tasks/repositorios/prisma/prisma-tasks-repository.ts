import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../tasks.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { TaskEntity } from "../../entities/task-entity";
import { QueryTarefaDto } from "../../dto/query-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";
import { CreateTaskItemDto } from "../../dto/create-task-item.dto";
import { date } from "zod";
import { equal } from "assert";

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
                data_vencimento: new Date(data.data_vencimento),
                criado_em: new Date(),
            }
        })
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
        let { page = 1, limit = 10, search = '', id_categoria, id_prioridade, id_status, nome, descricao, anotacao, data_criacao, criado_em, data_vencimento } = query;

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
                { id_status: { contains: search } },
                { id_categoria: { contains: search } },
                { id_prioridade: { contains: search } },
            ];
        }

        if (nome) {
            whereCondition.nome = { contains: nome };
        }

        if (descricao) {
            whereCondition.descricao = { contains: descricao };
        }

        if (id_categoria) {
            whereCondition.id_categoria = { equals: parseInt(id_categoria) };
        }

        if (id_status) {
            whereCondition.id_status = { equals: parseInt(id_status) };
        }

        if (id_prioridade) {
            whereCondition.id_prioridade = { equals: parseInt(id_prioridade) };
        }

        if (data_criacao) {
            const criadoEmString = String(data_criacao);
            const [ano, mes, dia] = criadoEmString.split('-').map(Number);
            const dataCriacao = new Date(Date.UTC(ano, mes - 1, dia));

            const inicioDoDia = new Date(dataCriacao);
            inicioDoDia.setUTCHours(0, 0, 0, 0);

            const finalDoDia = new Date(dataCriacao);
            finalDoDia.setUTCHours(23, 59, 59, 999);

            whereCondition.data_criacao = {
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

        if (data_vencimento) {
            const criadoEmString = String(data_vencimento);
            const [ano, mes, dia] = criadoEmString.split('-').map(Number);
            const dataCriacao = new Date(Date.UTC(ano, mes - 1, dia));

            const inicioDoDia = new Date(dataCriacao);
            inicioDoDia.setUTCHours(0, 0, 0, 0);

            const finalDoDia = new Date(dataCriacao);
            finalDoDia.setUTCHours(23, 59, 59, 999);

            whereCondition.data_vencimento = {
                gte: inicioDoDia,
                lte: finalDoDia
            };
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

    async findUniqueItem(currentUserId: string, taskId: string, id: string) {
        const item = await this.prisma.lista_tarefa.findUnique({
            where: {
                id: parseInt(id),
                id_tarefa: parseInt(taskId)
            }
        })

        return item
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

    async deleteItem(taskId: string, id: string): Promise<void> {
        const taskItem = await this.prisma.lista_tarefa.delete({
            where: {
                id: parseInt(id),
                id_tarefa: parseInt(taskId)
            }
        })
    }
}
