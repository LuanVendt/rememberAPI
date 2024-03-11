import { Body, Controller, Post } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";

@Controller('usuario')
export class LoginUserController {
    constructor(private readonly usersService: UsuariosService) { }

    @Post()
    create(@Body() criarUsuarioDto: CriarUsuarioDto) {
        return this.usersService.create(criarUsuarioDto)
    }
}