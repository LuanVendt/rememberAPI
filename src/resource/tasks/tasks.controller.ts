import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "../usuarios/entidades/user-entity";


@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@CurrentUser() currentUser: UserEntity, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(String(currentUser.id), createTaskDto)
    }

    @Get()
    findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryTarefaDto) {
        return this.tasksService.findAll(String(currentUser.id), query)
    }

    @Get(':id')
    findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.findUnique(String(currentUser.id), id)
    }

    @Put(':id')
    update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(String(currentUser.id), id, updateTaskDto)
    }

    @Delete(':id')
    delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.delete(String(currentUser.id), id)
    }
}