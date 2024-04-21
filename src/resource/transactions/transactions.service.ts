import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './repositories/transactions.repository';
import { QueryTransactionDto } from './dto/query-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async create(currentUserId: string, data: CreateTransactionDto) {
        const transaction = await this.transactionsRepository.create(currentUserId, data)
    }

    async findAll(currentUserId: string, query: QueryTransactionDto) {
        const transactions = await this.transactionsRepository.findAll(currentUserId, query)

        return transactions
    }

    async findUnique(currentUserId: string, id: string) {
        const transaction = await this.transactionsRepository.findUnique(currentUserId, id)

        if (!transaction) {
            throw new NotFoundException('Transação não encontrada.')
        }

        if (parseInt(currentUserId) !== transaction.id_usuario) {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return transaction
    }

    async update(currentUserId: string, id: string, data: UpdateTransactionDto) {
        const transaction = await this.transactionsRepository.findUnique(currentUserId, id)

        if (!transaction) {
            throw new NotFoundException('Transação não encontrada.')
        }

        const updatedTransaction = await this.transactionsRepository.update(currentUserId, id, data)

        return updatedTransaction
    }

    async delete(currentUserId: string, id: string) {
        const transaction = await this.transactionsRepository.findUnique(currentUserId, id)

        await this.transactionsRepository.delete(currentUserId, id)
    }
}
