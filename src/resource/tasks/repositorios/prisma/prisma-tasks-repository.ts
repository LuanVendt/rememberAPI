import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../tasks.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { TaskEntity } from "../../entities/task-entity";
import { QueryTarefaDto } from "../../dto/query-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";
import { CreateTaskItemDto } from "../../dto/create-task-item.dto";
import { Cron, CronExpression } from '@nestjs/schedule';
import { date } from "zod";
import { equal } from "assert";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
    constructor(
        private prisma: PrismaService,
        private mailerService: MailerService,
    ) { }

    private emailsEnviados: Set<number> = new Set<number>()

    async create(currentUserId: string, data: CreateTaskDto): Promise<TaskEntity> {
        const task = await this.prisma.tarefas.create({
            data: {
                id_usuario: parseInt(currentUserId),
                id_categoria: data.id_categoria,
                id_prioridade: data.id_prioridade,
                id_status: data.id_status,
                nome: data.nome,
                descricao: data.descricao ? data.descricao : null,
                anotacao: data.anotacao ? data.anotacao : null,
                data_criacao: new Date(),
                data_vencimento: data.data_vencimento ? new Date(data.data_vencimento) : null,
                criado_em: new Date(),
            }
        })

        if (data.lista_tarefa) {
            await this.prisma.lista_tarefa.create({
                data: {
                    id_tarefa: task.id,
                    descricao: data.lista_tarefa.descricao,
                    status: Boolean(data.lista_tarefa.status),
                    criado_em: new Date(),
                }
            })
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
                data_vencimento: new Date(dataTask.data_vencimento),
                editado_em: new Date(),
            }
        })

        if (dataTask.id_status === 4) {
            const { xp } = await this.prisma.usuarios.findUnique({
                where: {
                    id: parseInt(currentUserId)
                }
            })


            await this.prisma.usuarios.update({
                where: {
                    id: parseInt(currentUserId),
                },
                data: {
                    xp: xp + 10
                }
            })
        }

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

    @Cron(CronExpression.EVERY_MINUTE)
    async checkTasks() {
        console.log("A função de disparar email para tarefas prestes a vencer iniciou!");
        const tasks = await this.prisma.tarefas.findMany({
            where: {
                excluido_em: null,
                data_vencimento: {
                    gte: new Date(),
                    lt: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), 
                }
            },
            include: {
                usuarios: true
            }
        });

        // for (const task of tasks) {
        //     if (!this.emailsEnviados.has(task.id)) {
        //         try {
        //             await this.sendEmail(task, 'Tarefa prestes a vencer em 3 dias', task.data_vencimento, -3 * 24);

        //             await this.sendEmail(task, 'Tarefa prestes a vencer em 1 dia', task.data_vencimento, -1 * 24);

        //             await this.sendEmail(task, 'Tarefa prestes a vencer em 1 hora', task.data_vencimento, -1);

        //             this.emailsEnviados.add(task.id);
        //         } catch (error) {
        //             console.error(`Erro ao enviar email para a tarefa "${task.nome}" (ID: ${task.id}): ${error.message}`);
        //         }
        //     }
        // }
    }

    async sendEmail(task, subject, dataVencimento, horasParaEnvio) {
        await this.mailerService.sendMail({
            to: task.usuarios.email,
            subject: subject,
            text: `Sua tarefa "${task.nome}" está prestes a vencer no dia ${dataVencimento}`,
        });

        console.log(`Email enviado para a tarefa "${task.nome}" (ID: ${task.id})`);
        console.log(`Email enviado para: ${task.usuarios.email}`);
    }
}

