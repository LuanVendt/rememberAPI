import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './resource/usuarios/users.module';
import { TasksModule } from './resource/tasks/tasks.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './resource/usuarios/email-controller';
import { TransactionsModule } from './resource/transactions/transactions.module';


@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>'
            }
        }),
        AuthModule,
        UsersModule,
        TasksModule,
        TransactionsModule,
    ],
    controllers: [AppController, EmailController], // EmailController
    providers: [AppService],
})
export class AppModule { }
