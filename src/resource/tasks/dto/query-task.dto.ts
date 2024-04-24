export class QueryTarefaDto {
    page?: number;
    limit?: number;
    search?: string;
    id_categoria?: string;
    id_status?: string;
    id_prioridade?: string;
    nome?: String;
    descricao?: String;
    anotacao?: String;
    data_criacao?: Date;
    data_vencimento?: Date;
    criado_em?: Date;
}