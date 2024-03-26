import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    nome?: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    data_nasc?: Date

    @IsNumber()
    @MaxLength(11)
    @IsOptional()
    telefone?: string

    @IsString()
    @IsOptional()
    senha?: string

    @IsNumber()
    @IsOptional()
    xp?: number
}