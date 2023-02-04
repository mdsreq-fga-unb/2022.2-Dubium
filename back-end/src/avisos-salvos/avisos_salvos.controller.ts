import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAvisoSalvoDto } from './dto/create-avisos_salvos.dto';
import { AvisoSalvo } from './entities/avisos_salvos.entity';
import { AvisosSalvosService } from './avisos_salvos.service';

@Controller('salvos')
export class AvisosSalvosController {
  constructor(private readonly service: AvisosSalvosService) {} 

  @Post()
  async create(@Body() data: CreateAvisoSalvoDto) {
    return this.service.create(data);
  }

  @Get(':id_usuario')
  async findAllAvisoByUsuario(@Param('id_usuario') id_usuario: number): Promise<AvisoSalvo[]> {
    return this.service.findAllAvisoByUsuario(id_usuario);
  }
}