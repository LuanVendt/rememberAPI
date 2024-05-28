import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { AvatarsRepository } from './repositories/avatar.repository';
import { PrismaAvatarsRepository } from './repositories/prisma/prisma-avatar-repository';
import { PrismaService } from 'src/database/PrismaService';

@Module({
    controllers: [AvatarController],
    providers: [
        AvatarService,
        PrismaService,
        { provide: AvatarsRepository, useClass: PrismaAvatarsRepository }
    ],
})
export class AvatarModule { }
