export class TransactionEntity {
    id: number;
    id_usuario: number;
    descricao: string;
    preco: number;
    categoria: string;
    criado_em: Date;
    vencimento_em: Date;
    tipo: string;
}
