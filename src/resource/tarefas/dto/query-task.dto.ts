export class QueryTarefaDto {
    page?: number;
    limit?: number;
    search?: string;
    nome?: String;
    descricao?: String;
    anotacao?: String;
    data_criacao?: Date;
    data_vencimento?: Date;
    criado_em?: Date;
}