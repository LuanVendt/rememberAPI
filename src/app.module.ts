import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './resource/usuarios/usuarios.module';
import { TasksModule } from './resource/tasks/tasks.module';


@Module({
    imports: [AuthModule, UsersModule, TasksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
