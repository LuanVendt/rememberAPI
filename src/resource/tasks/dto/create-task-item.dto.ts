import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskItemDto {
    @IsNotEmpty({ message: 'task_id não pode ser vazio.' })
    @IsString({ message: 'task_id precisa ser um número inteiro.' })
    task_id: number;

    @IsNotEmpty({ message: 'descricao não pode ser vazio.' })
    @IsString({ message: 'descricao precisa ser uma string.' })
    descricao: string;

    @IsBoolean({ message: 'status precisa ser um boolean.' })
    status: Boolean
}