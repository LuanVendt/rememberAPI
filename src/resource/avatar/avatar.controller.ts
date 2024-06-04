import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from '../usuarios/entities/user-entity';
import { QueryAvatarDto } from './dto/query-avatar.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('avatar')
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryAvatarDto) {
        return this.avatarService.findAll(currentUser.id, query);
    }

    @Get('/todos')
    async findAllWithoutXP(@Query() query: QueryAvatarDto) {
        return this.avatarService.findAllWithoutXP(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findUnique(@Param('id') id: string) {
        return this.avatarService.findUnique(id);
    }
}
