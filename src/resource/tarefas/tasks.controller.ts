import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-tarefa.dto";
import { CriarTarefaDto } from "./dto/criar-tarefa.dto";
import { EditarTarefaDto } from "./dto/editar-tarefa.dto";

@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() criarTarefaDto: CriarTarefaDto) {
        return this.tasksService.create(criarTarefaDto)
    }

    @Get()
    findAll(@Query() query: QueryTarefaDto) {
        return this.tasksService.findAll(query)
    }

    @Get(':id')
    findUnique(@Param('id') id: string) {
        return this.tasksService.findUnique(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() editarTarefaDto: EditarTarefaDto) {
        return this.tasksService.update(id, editarTarefaDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.delete(id)
    }
}