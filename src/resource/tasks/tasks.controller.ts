import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { QueryTarefaDto } from "./dto/query-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UserEntity } from "../usuarios/entities/user-entity";
import { CreateTaskItemDto } from "./dto/create-task-item.dto";
import { diskStorage } from 'multer'
import { PrismaService } from "src/database/PrismaService";
import { IUploadedFile, UploadFileAdapter } from "src/utils/upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateTaskItemDto } from "./dto/update-task-item.dto";


@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly prisma: PrismaService,
        private readonly uploadFileAdapter: UploadFileAdapter
    ) { }

    @Post()
    async create(@CurrentUser() currentUser: UserEntity, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(String(currentUser.id), createTaskDto)
    }

    @Post(':id/upload/anexos')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './src/uploads'
        })
    }))
    async uploadAttachment(@Param('id') id: string, @UploadedFile() file: IUploadedFile) {
        try {
            const fileURL = await this.uploadFileAdapter.uploadFile(file)

            await this.prisma.anexos.create({
                data: {
                    id_tarefa: parseInt(id),
                    nome: file.filename,
                    url: fileURL
                }
            })
        } catch (error: any) {
            throw new Error(error);
        }
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

    @Get('categorias')
    async findAllCategories() {
        return this.tasksService.findAllCategories()
    }

    @Get('categorias/:id')
    async findCategoryById(@Param('id') id: string) {
        return this.prisma.categorias.findUnique({
            where: {
                id: parseInt(id),
            }
        })
    }

    @Get('status')
    async findAllStatus() {
        return this.prisma.status.findMany()
    }

    @Get('status/:id')
    async findStatusById(@Param('id') id: string) {
        return this.prisma.status.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }

    @Get('prioridade')
    async findAllPriorities() {
        return this.prisma.prioridade.findMany()
    }

    @Get('prioridade/:id')
    async findPrioratyById(@Param('id') id: string) {
        return this.prisma.prioridade.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }

    @Get()
    async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryTarefaDto) {
        return this.tasksService.findAll(String(currentUser.id), query)
    }

    @Get(':id')
    async findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.findUnique(String(currentUser.id), id)
    }

    @Put(':id')
    async update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(String(currentUser.id), id, updateTaskDto)
    }

    @Put('item-tarefa/:id')
    async updateTaskItem(@Param('id') id: string, @Body() data: UpdateTaskItemDto) {
        return this.tasksService.updateTaskItem(parseInt(id), data)
    }

    @Delete(':id')
    async delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.tasksService.delete(String(currentUser.id), id)
    }
}