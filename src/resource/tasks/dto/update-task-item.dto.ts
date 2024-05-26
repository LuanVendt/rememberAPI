import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskItemDto {
    @IsString({ message: 'descricao precisa ser uma string.' })
    @IsOptional()
    descricao: string;

    @IsBoolean({ message: 'status precisa ser um boolean.' })
    @IsOptional()
    status: boolean;
}