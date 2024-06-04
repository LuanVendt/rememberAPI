import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from '../usuarios/entities/user-entity';
import { QueryAvatarDto } from './dto/query-avatar.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('avatar')
@UseGuards(JwtAuthGuard)
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) { }

    @Get()
    async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryAvatarDto) {
        return this.avatarService.findAll(currentUser.id, query);
    }

    @Get(':id')
    async findUnique(@Param('id') id: string) {
        return this.avatarService.findUnique(id);
    }
}
