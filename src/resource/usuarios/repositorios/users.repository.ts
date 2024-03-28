import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { QueryUserDto } from "../dto/query-user.dto";
import { UserEntity } from "../entidades/user-entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<void>
    abstract findAll(query: QueryUserDto)
    abstract findUnique(id: number): Promise<UserEntity>
    abstract update(id: number, dataUsuario: UpdateUserDto): Promise<UserEntity>
    abstract delete(id: number): Promise<void>
}