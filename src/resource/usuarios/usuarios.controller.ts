import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { EditarUsuarioDto } from "./dto/editar-usuario.dto";
import { UsuarioQueryDto } from "./dto/usuario-query.dto";
import { UsuariosService } from "./usuarios.service";

@Controller('usuario')
@UseGuards(JwtAuthGuard)
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Get()
    findAll(@Query() query: UsuarioQueryDto) {
        return this.usuariosService.findAll(query)
    }

    @Get(':id')
    findUnique(@Param('id') id: string) {
        return this.usuariosService.findUnique(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() editarUsuarioDto: EditarUsuarioDto) {
        return this.usuariosService.update(id, editarUsuarioDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usuariosService.delete(id)
    }
}