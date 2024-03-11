import { CriarUsuarioDto } from "../dto/criar-usuario.dto";
import { EditarUsuarioDto } from "../dto/editar-usuario.dto";
import { UsuarioQueryDto } from "../dto/usuario-query.dto";
import { EntidadeUsuario } from "../entidades/entidade-usuario";

export abstract class UsuariosRepository {
    abstract create(data: CriarUsuarioDto): Promise<void>
    abstract findAll(query: UsuarioQueryDto)
    abstract findUnique(id: number): Promise<EntidadeUsuario>
    abstract update(id: number, dataUsuario: EditarUsuarioDto): Promise<EntidadeUsuario>
    abstract delete(id: number): Promise<void>
}