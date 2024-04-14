import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
    @IsString({ message: "O campo 'nome' deve ser uma string." })
    @IsNotEmpty({ message: "O campo 'nome' não pode estar vazio." })
    nome: string

    @IsEmail({}, { message: "O campo 'email' deve ser um email válido." })
    @IsNotEmpty({ message: "O campo 'email' não pode estar vazio." })
    email: string

    @IsNotEmpty({ message: "O campo 'data_nasc' não pode estar vazio." })
    data_nasc: Date


    telefone: string
    senha: string
}