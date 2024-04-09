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

    telefone: string
    senha: string
}