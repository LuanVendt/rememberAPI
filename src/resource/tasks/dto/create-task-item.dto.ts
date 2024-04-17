import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskItemDto {
    @IsNotEmpty({ message: 'descricao não pode ser vazio.' })
    @IsString({ message: 'descricao precisa ser uma string.' })
    descricao: string;

    criado_em: Date

    @IsBoolean({ message: 'status precisa ser um boolean.' })
    status: Boolean
}