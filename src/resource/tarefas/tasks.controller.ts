import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto)
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
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.delete(id)
    }
}