import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly service: UsuariosService,
    private authService: AuthService
  ) { }

  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateUsuarioDto) {
    return this.service.updateUsuario(id, data);
  } //precisa de autenticaçao

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  } //precisa de autenticaçao

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findUsuarioById(@Param('id') id: string) {
    return this.service.findUsuarioById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateMaisVotosUsuario(@Param('id') id: string) {
    return this.service.updateMaisVotosUsuario(+id);
  } //precisa de autenticaçao

  @UseGuards(JwtAuthGuard)
  @Patch('/menos/:id')
  updateMenosVotosUsuario(@Param('id') id: string) {
    return this.service.updateMenosVotosUsuario(+id);
  }//precisa de autenticaçao
}
