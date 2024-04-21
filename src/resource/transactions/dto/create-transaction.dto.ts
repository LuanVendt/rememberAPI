import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTransactionDto {
    @IsNotEmpty({ message: 'id_usuario é obrigatório.' })
    @IsNumber({}, { message: 'id_usuario precisa ser um número inteiro.' })
    id_usuario: number

    @IsNotEmpty({ message: 'descricao é obrigatório' })
    @IsString({ message: 'descricao precisa ser uma string.' })
    descricao: string

    @IsNotEmpty({ message: 'preco é obrigatório' })
    @IsNumber({}, { message: 'preco precisa ser um número.' })
    preco: number

    @IsNotEmpty({ message: 'categoria é obrigatório.' })
    @IsString({ message: 'categoria precisa ser uma string.' })
    categoria: String

    @IsDate({ message: 'data precisa ser uma data válida.' })
    data?: Date

    @IsNotEmpty({ message: 'tipo é obrigatório.' })
    @IsString({ message: 'tipo precisa ser uma string.' })
    tipo: string
}
