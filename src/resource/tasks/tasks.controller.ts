import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "../users/entities/user-entity";


@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@CurrentUser() currentUser: UserEntity, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(String(currentUser.id), createTaskDto)
    }

    @Get()
    async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryTarefaDto) {
        return this.tasksService.findAll(String(currentUser.id), query)
    }

    @Get('categorias')
    async findAllCategories() {
        return this.tasksService.findAllCategories()
    }

    @Get(':id')
    async findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.findUnique(String(currentUser.id), id)
    }


    @Put(':id')
    async update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(String(currentUser.id), id, updateTaskDto)
    }

    @Delete(':id')
    async delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.delete(String(currentUser.id), id)
    }
}