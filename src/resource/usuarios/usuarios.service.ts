import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EntidadeUsuario } from "./entidades/entidade-usuario";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { UsuariosRepository } from "./repositorios/usuarios.repository";
import { UsuarioQueryDto } from "./dto/usuario-query.dto";
import { EditarUsuarioDto } from "./dto/editar-usuario.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class UsuariosService {
    constructor(private usersRepository: UsuariosRepository) { }

    async create(data: CriarUsuarioDto) {
        if (!data.nome) {
            throw new BadRequestException('Nome é obrigatório.')
        }

        if (!data.email) {
            throw new BadRequestException('Email é obrigatório.')
        }

        if (!data.data_nasc) {
            throw new BadRequestException('Data de nascimento é obrigatório.')
        }

        if (!data.telefone) {
            throw new BadRequestException('Telefone é obrigatório.')
        }

        if (!data.senha) {
            throw new BadRequestException('Senha é obrigatório.')
        }

        const user = await this.usersRepository.create(data)
    }

    async findAll(query: UsuarioQueryDto) {
        const users = await this.usersRepository.findAll(query)

        return users
    }

    async findUnique(id: string) {
        const user = await this.usersRepository.findUnique(parseInt(id))

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        return user
    }

    async update(id: string, dataUser: EditarUsuarioDto) {
        const user = await this.usersRepository.findUnique(parseInt(id))

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        const updatedUser = await this.usersRepository.update(parseInt(id), dataUser)

        return updatedUser
    }

    async delete(id: string) {
        const user = await this.usersRepository.findUnique(parseInt(id))

        if (!user) {
            throw new NotFoundException('User not found.')
        }

        await this.usersRepository.delete(parseInt(id))
    }
}