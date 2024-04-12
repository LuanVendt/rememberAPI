import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNumber()
    @IsNotEmpty()
    id_categoria: number;

    @IsNumber()
    @IsNotEmpty()
    id_prioridade: number;

    @IsNumber()
    @IsNotEmpty()
    id_status: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    anotacao: string;

    @IsOptional()
    data_vencimento?: Date;
}