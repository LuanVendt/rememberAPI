import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from '../usuarios/entities/user-entity';
import { QueryAvatarDto } from './dto/query-avatar.dto';

@Controller('avatar')
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) { }

    @Get()
    async findAll(@Query() query: QueryAvatarDto) {
        return this.avatarService.findAll(query);
    }

    @Get(':id')
    async findUnique(@Param('id') id: string) {
        return this.avatarService.findUnique(id);
    }
}
