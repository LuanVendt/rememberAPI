export interface CreateUserDto {
    id?: number
    nome: string
    email: string
    data_nasc: Date
    telefone: string
    senha: string
}