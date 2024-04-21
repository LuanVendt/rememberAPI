import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { QueryTransactionDto } from "../dto/query-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

export abstract class TransactionsRepository {
    abstract create(currentUserId: string, data: CreateTransactionDto): Promise<TransactionEntity>
    abstract findAll(currentUserId: string, query: QueryTransactionDto)
    abstract findUnique(currentUserId: string, id: string): Promise<TransactionEntity>
    abstract update(currentUserId: string, id: string, data: UpdateTransactionDto): Promise<TransactionEntity>
    abstract delete(currentUserId: string, id: string): Promise<void>
}