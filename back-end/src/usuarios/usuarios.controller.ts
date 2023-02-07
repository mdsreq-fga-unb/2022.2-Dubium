import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SkipAuth } from '../auth/public-key.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly service: UsuariosService,
    private authService: AuthService
  ) { }

  @SkipAuth()
  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    return this.service.create(data);
  }

  @SkipAuth()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @Post('forgotPassword')
  async forgotPassword(@Body() email: string) {
    return this.service.forgotPassword(email);
  }

  @SkipAuth()
  @Post('resetPassword')
  async resetPassword(@Body() email: string) {
    return this.service.resetPassword(email);
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

  @SkipAuth()
  @Patch(':id')
  updateMaisVotosUsuario(@Param('id') id: string) {
    return this.service.updateMaisVotosUsuario(+id);
  } 

  @SkipAuth()
  @Patch('/menos/:id')
  updateMenosVotosUsuario(@Param('id') id: string) {
    return this.service.updateMenosVotosUsuario(+id);
  }
}
