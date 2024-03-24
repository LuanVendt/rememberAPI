import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TasksRepository } from "./repositories/tasks.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) { }

    async create(data: CreateTaskDto) {
        if (!data.id_usuario) {
            throw new BadRequestException('Usuário é obrigatório.')
        }

        if (!data.id_importancia) {
            throw new BadRequestException('Importância é obrigatório.')
        }

        if (!data.id_categoria) {
            throw new BadRequestException('Categoria é obrigatório.')
        }

        if (!data.id_status) {
            throw new BadRequestException('Status é obrigatório.')
        }

        if (!data.nome) {
            throw new BadRequestException('Nome é obrigatório.')
        }

        if (!data.descricao) {
            throw new BadRequestException('Descricao é obrigatório.')
        }

        if (!data.anotacao) {
            throw new BadRequestException('Anotação é obrigatório.')
        }

        if (!data.data_vencimento) {
            throw new BadRequestException('Data de Vencimento é obrigatório.')
        }

        const task = await this.tasksRepository.create(data)
    }

    async findAll(query: QueryTarefaDto) {
        const tasks = await this.tasksRepository.findAll(query)

        return tasks
    }

    async findUnique(id: string) {
        const intInt = parseInt(id)
        const task = await this.tasksRepository.findUnique(intInt)

        if (!task) {
            throw new NotFoundException('Task not found.')
        }

        return task
    }

    async update(id: string, dataTask: UpdateTaskDto) {
        const task = await this.tasksRepository.findUnique(parseInt(id))

        if (!task) {
            throw new NotFoundException('Task not found.')
        }

        const updatedTask = await this.tasksRepository.update(parseInt(id), dataTask)

        return updatedTask
    }

    async delete(id: string) {
        const task = await this.tasksRepository.findUnique(parseInt(id))

        if (!task) {
            throw new NotFoundException('Task not found.')
        }

        await this.tasksRepository.delete(parseInt(id))
    }
}