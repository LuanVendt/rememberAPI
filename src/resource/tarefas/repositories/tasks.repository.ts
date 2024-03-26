import { CreateTaskDto } from "../dto/create-task.dto";

import { QueryTarefaDto } from "../dto/query-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskEntity } from "../entities/task-entity";

export abstract class TasksRepository {
    abstract create(currentUserId: string, data: CreateTaskDto): Promise<TaskEntity>
    abstract findAll(currentUserId: string, query: QueryTarefaDto)
    abstract findUnique(currentUserId: string, id: string): Promise<TaskEntity>
    abstract update(currentUserId: string, id: string, dataTask: UpdateTaskDto): Promise<TaskEntity>
    abstract delete(currentUserId: string, id: string): Promise<void>
}   