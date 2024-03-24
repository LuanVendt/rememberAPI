import { CreateTaskDto } from "../dto/create-task.dto";

import { QueryTarefaDto } from "../dto/query-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskEntity } from "../entities/task-entity";

export abstract class TasksRepository {
    abstract create(data: CreateTaskDto): Promise<TaskEntity>
    abstract findAll(query: QueryTarefaDto)
    abstract findUnique(id: number): Promise<TaskEntity>
    abstract update(id: number, dataTask: UpdateTaskDto): Promise<TaskEntity>
    abstract delete(id: number): Promise<void>
}   