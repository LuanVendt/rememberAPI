import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsNumber()
    @IsOptional()
    id_categoria?: number;

    @IsNumber()
    @IsOptional()
    id_prioridade?: number;

    @IsNumber()
    @IsOptional()
    id_status?: number;

    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsString()
    @IsOptional()
    anotacao?: string;

    @IsDate()
    @IsOptional()
    data_criacao?: Date;

    @IsDate()
    @IsOptional()
    data_vencimento?: Date;
}