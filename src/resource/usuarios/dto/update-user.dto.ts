import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsString({ message: "O campo 'nome' deve ser uma string." })
    @IsOptional()
    nome?: string

    @IsEmail({}, { message: "O campo 'email' deve ser um email válido." })
    @IsOptional()
    email?: string

    @IsOptional()
    data_nasc?: Date

    @IsNumber({}, { message: "O campo 'telefone' deve ser um número inteiro." })
    @MaxLength(11, { message: "O campo 'telefone' deve 11 dígitos" })
    @MinLength(11, { message: "O campo 'telefone' deve 11 dígitos" })
    @IsOptional()
    telefone?: string

    @IsString({ message: "O campo 'senha' deve ser uma string." })
    @IsOptional()
    senha?: string

    @IsNumber({}, { message: "O campo 'xp' deve ser um número inteiro." })
    @IsOptional()
    xp?: number
}