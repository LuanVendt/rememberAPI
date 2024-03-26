import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsNumber()
    id?: number;

    @IsNumber()
    id_importancia?: number;

    @IsNumber()
    id_categoria?: number;

    @IsNumber()
    id_status?: number;

    @IsString()
    nome?: string;

    @IsString()
    descricao?: string;

    @IsString()
    anotacao?: string;

    @IsDate()
    data_criacao?: Date;

    @IsDate()
    data_vencimento?: Date;

    @IsDate()
    criado_em?: Date;

    @IsDate()
    editado_em?: Date;

    @IsDate()
    excluido_em?: Date;
}