import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { PrismaService } from "src/database/PrismaService";
import { TasksService } from "./tasks.service";
import { PrismaTasksRepository } from "./repositorios/prisma/prisma-tasks-repository";
import { TasksRepository } from "./repositorios/tasks.repository";

@Module({
    controllers: [TasksController],
    providers: [
        PrismaService,
        TasksService,
        PrismaTasksRepository,
        { provide: TasksRepository, useClass: PrismaTasksRepository }
    ]
})
export class TasksModule { }