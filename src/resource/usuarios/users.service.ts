import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./entities/user-entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    async create(data: CreateUserDto) {
        const user = await this.usersRepository.create(data)
    }

    async findAll(query: QueryUserDto) {
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

    async update(id: string, dataUser: UpdateUserDto) {
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