import { IsEmail, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsString({ message: "O campo 'nome' deve ser uma string." })
    @IsOptional()
    nome?: string

    @IsEmail({}, { message: "O campo 'email' deve ser um email válido." })
    @IsOptional()
    email?: string

    @IsOptional()
    data_nasc?: Date

    @IsString({ message: "O campo 'telefone' deve ser uma string." })
    @Length(11, 11, { message: "O campo 'telefone' precisa ter 11 caracteres." })
    @IsOptional()
    telefone?: string

    @IsString({ message: "O campo 'senha' deve ser uma string." })
    @IsOptional()
    senha?: string

    @IsNumber({}, { message: "O campo 'xp' deve ser um número inteiro." })
    @IsOptional()
    xp?: number
}