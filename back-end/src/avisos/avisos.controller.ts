import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Aviso } from './avisos.entity';
import { AvisosService } from './avisos.service';
import { CreateAvisoDto } from './dto/create-aviso.dto';

@Controller('avisos')
export class AvisosController {
  constructor(private readonly service: AvisosService) {}

  @Post()
  async create(@Body() data: CreateAvisoDto) {
    return this.service.create(data);
  }

  @Get(':id')
  async findAvisoById(@Param('id') id: number) {
    return this.service.findAvisoById(id);
  }

  @Get()
  async findAll(): Promise<Aviso[]> {
    return this.service.findAll();
  }

  @Get('/usuario/:id_usuario')
  async findAllByUsuario(@Param('id_usuario') id_usuario: number): Promise<Aviso[]> {
    return this.service.findAllByUsuario(id_usuario);
  }

  @Get('/curso/:id_cursoAviso')
  async findAllByCurso(@Param('id_cursoAviso') id_cursoAviso: number): Promise<Aviso[]> {
    return this.service.findAllByCurso(id_cursoAviso);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Patch(':id')
  updateMaisVotosAviso(@Param('id') id: string) {
    return this.service.updateMaisVotosAviso(+id);
  }

  @Patch('/menos/:id')
  updateMenosVotosAviso(@Param('id') id: string) {
    return this.service.updateMenosVotosAviso(+id);
  }
}
