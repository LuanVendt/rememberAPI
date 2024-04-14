import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNumber({}, { message: "O campo 'id_categoria' deve ser um número inteiro." })
    @IsNotEmpty({ message: "O campo 'id_categoria' não pode estar vazio." })
    id_categoria: number;

    @IsNumber({}, { message: "O campo 'id_prioridade' deve ser um número inteiro." })
    @IsNotEmpty({ message: "O campo 'id_prioridade' não pode estar vazio." })
    id_prioridade: number;

    @IsNumber({}, { message: "O campo 'id_status' deve ser um número inteiro." })
    @IsNotEmpty({ message: "O campo 'id_status' não pode estar vazio." })
    id_status: number;

    @IsString({ message: "O campo 'nome' deve ser uma string." })
    @IsNotEmpty({ message: "O campo 'nome' não pode estar vazio." })
    nome: string;

    @IsString({ message: "O campo 'descricao' deve ser uma string." })
    @IsNotEmpty({ message: "O campo 'descricao' não pode estar vazio." })
    descricao: string;

    @IsString({ message: "O campo 'anotacao' deve ser uma string." })
    @IsNotEmpty({ message: "O campo 'anotacao' não pode estar vazio." })
    anotacao: string;

    @IsOptional()
    data_vencimento?: Date;
}