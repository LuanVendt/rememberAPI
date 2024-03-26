import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    data_nasc: Date

    @IsNumber()
    @MaxLength(11)
    telefone: string
    senha: string
}