import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsOptional({ message: 'id_usuario é obrigatório.' })
    @IsNumber({}, { message: 'id_usuario precisa ser um número inteiro.' })
    id_usuario?: string

    @IsOptional({ message: 'descricao é obrigatório' })
    @IsString({ message: 'descricao precisa ser uma string.' })
    descricao?: string

    @IsOptional({ message: 'preco é obrigatório' })
    @IsNumber({}, { message: 'preco precisa ser um número.' })
    preco?: number

    @IsOptional({ message: 'categoria é obrigatório.' })
    @IsString({ message: 'categoria precisa ser uma string.' })
    categoria?: string

    @IsOptional({ message: 'tipo é obrigatório.' })
    @IsString({ message: 'tipo precisa ser uma string.' })
    tipo?: string
}
