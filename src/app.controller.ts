import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UserEntity } from './resource/usuarios/entities/user-entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('hello')
    getHello(@CurrentUser() currentUser: UserEntity) {
        return {
            message: "OK"
        }
    }
}
