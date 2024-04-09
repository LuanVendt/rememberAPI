export class QueryUserDto {
    page?: number;
    limit?: number;
    search?: string;
    nome?: string
    email?: string
    telefone?: string
    data_nasc?: Date
    criado_em?: Date
    editado_em?: Date
    excluido_em: Date
}