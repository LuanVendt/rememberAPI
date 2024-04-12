export interface TaskEntity {
    id?: number;
    id_usuario: number;
    id_importancia: number;
    id_categoria: number;
    id_prioridade: number;
    nome: string;
    descricao: string;
    anotacao: string;
    data_criacao: Date;
    data_vencimento?: Date;
    criado_em: Date;
    editado_em?: Date;
    deletado_em?: Date;
}