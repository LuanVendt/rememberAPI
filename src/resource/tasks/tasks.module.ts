import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { PrismaService } from "src/database/PrismaService";
import { TasksService } from "./tasks.service";
import { PrismaTasksRepository } from "./repositorios/prisma/prisma-tasks-repository";
import { TasksRepository } from "./repositorios/tasks.repository";
import { UploadFileAdapter } from "src/utils/upload.service";

@Module({
    controllers: [TasksController],
    providers: [
        PrismaService,
        TasksService,
        UploadFileAdapter,
        PrismaTasksRepository,
        { provide: TasksRepository, useClass: PrismaTasksRepository }
    ]
})
export class TasksModule { }