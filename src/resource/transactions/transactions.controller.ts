import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from '../usuarios/entities/user-entity';
import { query } from 'express';
import { QueryTransactionDto } from './dto/query-transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(@CurrentUser() currentUser: UserEntity, @Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(String(currentUser.id), createTransactionDto);
    }

    @Get()
    findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryTransactionDto) {
        return this.transactionsService.findAll(String(currentUser.id), query);
    }

    @Get(':id')
    findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        return this.transactionsService.findUnique(String(currentUser.id), id);
    }

    @Put(':id')
    update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.update(String(currentUser.id), id, updateTransactionDto);
    }

    @Delete(':id')
    delete(@CurrentUser() currentUser, @Param('id') id: string) {
        return this.transactionsService.delete(String(currentUser.id), id);
    }
}
