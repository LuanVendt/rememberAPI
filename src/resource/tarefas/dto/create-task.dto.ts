import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNumber()
    id?: number;

    @IsNumber()
    @IsNotEmpty()
    id_usuario: number;

    @IsNumber()
    @IsNotEmpty()
    id_importancia: number;

    @IsNumber()
    @IsNotEmpty()
    id_categoria: number;

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

    @IsDate()
    data_vencimento?: Date;
}