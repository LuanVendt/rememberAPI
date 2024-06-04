import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryAvatarDto } from './dto/query-avatar.dto';
import { AvatarsRepository } from './repositories/avatar.repository';

@Injectable()
export class AvatarService {
    constructor(private avatarsRepository: AvatarsRepository) { }

    async findAll(currentUserId: number, query: QueryAvatarDto) {
        return await this.avatarsRepository.findAll(currentUserId, query)
    }

    async findUnique(id: string) {
        const avatar = await this.avatarsRepository.findUnique(id)

        if (!avatar) {
            throw new NotFoundException('Avatar não encontrado.')
        }
    }
}
