import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "../transactions.repository";
import { PrismaService } from "src/database/PrismaService";
import { CreateTransactionDto } from "../../dto/create-transaction.dto";
import { TransactionEntity } from "../../entities/transaction.entity";
import { QueryTransactionDto } from "../../dto/query-transaction.dto";
import { UpdateTransactionDto } from "../../dto/update-transaction.dto";

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
    constructor(private prisma: PrismaService) { }

    async create(currentUserId: string, data: CreateTransactionDto): Promise<TransactionEntity> {
        const transaction = await this.prisma.transacoes_financeiras.create({
            data: {
                id_usuario: parseInt(data.id_usuario),
                descricao: data.descricao,
                preco: Number(data.preco),
                categoria: data.categoria,
                data: new Date(),
                tipo: data.tipo
            }
        })

        return transaction
    }

    async findAll(currentUserId: string, query: QueryTransactionDto) {
        let { page = 1, limit = 10, search = '', descricao, preco, categoria, data, tipo } = query;

        page = Number(page);
        limit = Number(limit);
        search = String(search);

        const skip = (page - 1) * limit;

        let whereCondition: any = {
            id_usuario: parseInt(currentUserId),
            excluido_em: null,
        };

        if (search) {
            whereCondition.OR = [
                { descricao: { contains: search } },
                { preco: { contains: search } },
                { categoria: { contains: search } },
                { data: { contains: search } },
                { tipo: { contains: search } },
            ];
        }

        if (descricao) {
            whereCondition.descricao = { contains: descricao };
        }

        if (preco) {
            whereCondition.preco = { contains: preco };
        }

        if (categoria) {
            whereCondition.categoria = { contains: categoria };
        }

        if (data) {
            whereCondition.data = { contains: data };
        }

        if (tipo) {
            whereCondition.tipo = { contains: tipo };
        }

        const total = await this.prisma.transacoes_financeiras.count({
            where: {
                excluido_em: null,
                ...whereCondition
            },
        });

        const transactions = await this.prisma.transacoes_financeiras.findMany({
            where: {
                ...whereCondition
            },
        });

        return {
            total,
            page,
            search,
            limit,
            pages: Math.ceil(total / limit),
            data: transactions,
        };
    }

    async findUnique(currentUserId: string, id: string): Promise<TransactionEntity> {
        const transaction = await this.prisma.transacoes_financeiras.findUnique({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId)
            }
        })

        return transaction
    }

    async update(currentUserId: string, id: string, data: UpdateTransactionDto): Promise<TransactionEntity> {
        const transaction = await this.prisma.transacoes_financeiras.update({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
            },
            data: {
                descricao: data.descricao,
                preco: data.preco,
                categoria: data.categoria,
                tipo: data.tipo
            }
        })

        return transaction
    }

    async delete(currentUserId: string, id: string): Promise<void> {
        const transaction = await this.prisma.transacoes_financeiras.delete({
            where: {
                id: parseInt(id),
                id_usuario: parseInt(currentUserId),
            }
        })
    }
}