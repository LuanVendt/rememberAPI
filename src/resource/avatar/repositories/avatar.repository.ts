import { QueryAvatarDto } from "../dto/query-avatar.dto";
import { AvatarEntity } from "../entities/avatar.entity";

export abstract class AvatarsRepository {
    abstract findAll(currentUserId: number, query: QueryAvatarDto)
    abstract findUnique(avatarId: string): Promise<AvatarEntity>
}