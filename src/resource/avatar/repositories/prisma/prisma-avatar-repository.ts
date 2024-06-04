import { Injectable } from "@nestjs/common";
import { AvatarsRepository } from "../avatar.repository";
import { PrismaService } from "src/database/PrismaService";
import { QueryAvatarDto } from "../../dto/query-avatar.dto";
import { AvatarEntity } from "../../entities/avatar.entity";

@Injectable()
export class PrismaAvatarsRepository implements AvatarsRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(currentUserId: number, query: QueryAvatarDto) {
        const user = await this.prisma.usuarios.findUnique({
            where: {
                id: Number(currentUserId)
            }
        })

        let { page = 1, limit = 1000, search = '', nome, qtde_xp, url_foto } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;


        let whereCondition: any

        if (search) {
            whereCondition.OR = [
                { nome: { contains: search } },
                { qtde_xp: { contains: search } },
                { url_foto: { contains: search } },
            ];
        }

        if (nome) {
            whereCondition.nome = { contains: nome };
        }

        if (qtde_xp) {
            whereCondition.qtde_xp = { contains: qtde_xp };
        }

        if (url_foto) {
            whereCondition.url_foto = { equals: url_foto };
        }


        const total = await this.prisma.avatares.count({
            where: {
                ...whereCondition,
                qtde_xp: {
                    lte: user.xp,
                },
            },
        });

        const avatars = await this.prisma.avatares.findMany({
            where: {
                ...whereCondition,
                qtde_xp: {
                    lte: user.xp,
                },
            },
            skip,
            take: limit,
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: avatars,
        };
    }

    async findAllWithoutXP(query: QueryAvatarDto) {
        let { page = 1, limit = 1000, search = '', nome, qtde_xp, url_foto } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;


        let whereCondition: any

        if (search) {
            whereCondition.OR = [
                { nome: { contains: search } },
                { qtde_xp: { contains: search } },
                { url_foto: { contains: search } },
            ];
        }

        if (nome) {
            whereCondition.nome = { contains: nome };
        }

        if (qtde_xp) {
            whereCondition.qtde_xp = { contains: qtde_xp };
        }

        if (url_foto) {
            whereCondition.url_foto = { equals: url_foto };
        }


        const total = await this.prisma.avatares.count({
            where: {
                ...whereCondition,

            },
        });

        const avatars = await this.prisma.avatares.findMany({
            where: {
                ...whereCondition,
            },
            skip,
            take: limit,
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: avatars,
        };
    }

    async findUnique(avatarId: string): Promise<AvatarEntity> {
        const avatar = await this.prisma.avatares.findUnique({
            where: {
                id: parseInt(avatarId),
            }
        })

        return avatar
    }
}