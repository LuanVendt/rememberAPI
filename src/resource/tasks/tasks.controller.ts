import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "../usuarios/entities/user-entity";
import { CreateTaskItemDto } from "./dto/create-task-item.dto";
import { PrismaService } from "src/database/PrismaService";


@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly prisma: PrismaService
    ) { }

    @Post()
    async create(@CurrentUser() currentUser: UserEntity, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(String(currentUser.id), createTaskDto)
    }

    @Post('lista')
    async createItem(@CurrentUser() CurrentUser: UserEntity, @Body() createTaskItem: CreateTaskItemDto) {
        return this.tasksService.createItem(String(CurrentUser.id), createTaskItem)
    }

    @Delete('/lista/:taskId/:itemId')
    async deleteItem(
        @CurrentUser() CurrentUser: UserEntity,
        @Param('taskId') taskId: string,
        @Param('itemId') itemId: string
    ) {
        return this.tasksService.deleteItem(String(CurrentUser.id), taskId, itemId)
    }

    @Get()
    async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryTarefaDto) {
        return this.tasksService.findAll(String(currentUser.id), query)
    }

    @Get('categorias')
    async findAllCategories() {
        return this.tasksService.findAllCategories()
    }

    @Get('status')
    async findAllStatus() {
        return this.prisma.status.findMany()
    }

    @Get('prioridade')
    async findAllPriorities() {
        return this.prisma.prioridade.findMany()
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