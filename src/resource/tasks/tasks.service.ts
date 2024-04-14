import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TasksRepository } from "./repositorios/tasks.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) { }

    async create(currentUserId: string, data: CreateTaskDto) {
        const task = await this.tasksRepository.create(currentUserId, data)
    }

    async findAll(currentUserId: string, query: QueryTarefaDto) {
        const tasks = await this.tasksRepository.findAll(currentUserId, query)

        return tasks
    }

    async findUnique(currentUserId: string, id: string) {
        const task = await this.tasksRepository.findUnique(currentUserId, id)

        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.')
        }

        if (parseInt(currentUserId) !== task.id_usuario) {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return task
    }

    async findAllCategories() {
        return this.tasksRepository.findAllCategories()
    }

    async update(currentUserId: string, id: string, dataTask: UpdateTaskDto) {
        const task = await this.tasksRepository.findUnique(currentUserId, id)

        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.')
        }

        const updatedTask = await this.tasksRepository.update(currentUserId, id, dataTask)

        return updatedTask
    }

    async delete(currentUserId: string, id: string) {
        const task = await this.tasksRepository.findUnique(currentUserId, id)

        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.')
        }

        await this.tasksRepository.delete(currentUserId, id)
    }
}