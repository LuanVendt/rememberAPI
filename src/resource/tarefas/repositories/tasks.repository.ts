import { CriarTarefaDto } from "../dto/criar-tarefa.dto";
import { EditarTarefaDto } from "../dto/editar-tarefa.dto";
import { QueryTarefaDto } from "../dto/query-tarefa.dto";
import { TaskEntity } from "../entities/task-entity";

export abstract class TasksRepository {
    abstract create(data: CriarTarefaDto): Promise<TaskEntity>
    abstract findAll(query: QueryTarefaDto)
    abstract findUnique(id: number): Promise<TaskEntity>
    abstract update(id: number, dataTask: EditarTarefaDto): Promise<TaskEntity>
    abstract delete(id: number): Promise<void>
}   