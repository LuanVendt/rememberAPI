import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/database/PrismaService';
import { PrismaTransactionsRepository } from './repositories/prisma/prisma-transactions.repository';
import { TransactionsRepository } from './repositories/transactions.repository';

@Module({
    controllers: [TransactionsController],
    providers: [
        PrismaService,
        TransactionsService,
        PrismaTransactionsRepository,
        { provide: TransactionsRepository, useClass: PrismaTransactionsRepository }
    ],
})
export class TransactionsModule { }
