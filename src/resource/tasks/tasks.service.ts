import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TasksRepository } from "./repositorios/tasks.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CreateTaskItemDto } from "./dto/create-task-item.dto";

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) { }

    async create(currentUserId: string, data: CreateTaskDto) {
        const task = await this.tasksRepository.create(currentUserId, data)

        return task
    }

    async createItem(currentUserId: string, data: CreateTaskItemDto) {
        const findedTask = await this.findUnique(currentUserId, String(data.task_id))

        const task = await this.tasksRepository.createItem(findedTask.id, data)
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

    async findUniqueItem(currentUserId: string, taskId: string, id: string) {
        const task = await this.findUnique(currentUserId, taskId)

        const item = await this.tasksRepository.findUniqueItem(currentUserId, taskId, id)

        if (!item) {
            throw new NotFoundException('Item não encontrado.')
        }

        return item
    }

    async findAllCategories() {
        return this.tasksRepository.findAllCategories()
    }

    async update(currentUserId: string, id: string, dataTask: UpdateTaskDto) {
        const task = await this.findUnique(currentUserId, id)

        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.')
        }

        const updatedTask = await this.tasksRepository.update(currentUserId, id, dataTask)

        return updatedTask
    }

    async delete(currentUserId: string, id: string) {
        const task = await this.findUnique(currentUserId, id)

        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.')
        }

        await this.tasksRepository.delete(currentUserId, id)
    }

    async deleteItem(currentUserId: string, taskId: string, id: string) {
        const task = await this.findUniqueItem(currentUserId, taskId, id)

        await this.tasksRepository.deleteItem(taskId, id)
    }
}