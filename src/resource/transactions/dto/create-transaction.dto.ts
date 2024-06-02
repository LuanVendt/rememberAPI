import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTransactionDto {
    @IsNotEmpty({ message: 'descricao é obrigatório' })
    @IsString({ message: 'descricao precisa ser uma string.' })
    descricao: string

    @IsNotEmpty({ message: 'preco é obrigatório' })
    @IsNumber({}, { message: 'preco precisa ser um número.' })
    preco: number

    @IsNotEmpty({ message: 'categoria é obrigatório.' })
    @IsString({ message: 'categoria precisa ser uma string.' })
    categoria: string

    @IsNotEmpty({ message: 'tipo é obrigatório.' })
    @IsString({ message: 'tipo precisa ser uma string.' })
    tipo: string

    @IsOptional()
    vencimento_em: Date
}
