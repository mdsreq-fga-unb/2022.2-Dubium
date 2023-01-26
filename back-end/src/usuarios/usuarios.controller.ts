import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    return this.service.create(data);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() email: string) {
    return this.service.forgotPassword(email);
  }

  @Post('resetPassword')
  async resetPassword(@Body() email: string, token: string, password: string) {
    return this.service.resetPassword(email, token, password);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateUsuarioDto) {
    return this.service.updateUsuario(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findUsuarioById(@Param('id') id: string) {
    return this.service.findUsuarioById(+id);
  }

  @Patch(':id')
  updateMaisVotosUsuario(@Param('id') id: string) {
    return this.service.updateMaisVotosUsuario(+id);
  }
  @Patch('/menos/:id')
  updateMenosVotosUsuario(@Param('id') id: string) {
    return this.service.updateMenosVotosUsuario(+id);
  }
}
