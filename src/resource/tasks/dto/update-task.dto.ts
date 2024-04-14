import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsNumber({}, { message: "O campo 'id_categoria' deve ser um número inteiro." })
    @IsOptional()
    id_categoria?: number;

    @IsNumber({}, { message: "O campo 'id_prioridade' deve ser um número inteiro." })
    @IsOptional()
    id_prioridade?: number;

    @IsNumber({}, { message: "O campo 'id_status' deve ser um número inteiro." })
    @IsOptional()
    id_status?: number;

    @IsString({ message: "O campo 'nome' deve ser uma string." })
    @IsOptional()
    nome?: string;

    @IsString({ message: "O campo 'descricao' deve ser uma string." })
    @IsOptional()
    descricao?: string;

    @IsString({ message: "O campo 'string' deve ser uma string." })
    @IsOptional()
    anotacao?: string;

    @IsDate({ message: "O campo 'data_criacao' deve ser uma data." })
    @IsOptional()
    data_criacao?: Date;

    @IsDate({ message: "O campo 'data_criacao' deve ser uma data." })
    @IsOptional()
    data_vencimento?: Date;
}