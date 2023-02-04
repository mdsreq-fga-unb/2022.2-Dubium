import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePerguntaSalvaDto } from './dto/create-perguntas_salvas.dto';
import { PerguntaSalva } from './entities/perguntas_salvas.entity';
import { PerguntasSalvasService } from './perguntas_salvas.service';

@Controller('salvas')
export class PerguntasSalvasController {
  constructor(private readonly service: PerguntasSalvasService) {} 

  @Post()
  async create(@Body() data: CreatePerguntaSalvaDto) {
    return this.service.create(data);
  }

  @Get(':id_usuario')
  async findAllPerguntaByUsuario(@Param('id_usuario') id_usuario: number): Promise<PerguntaSalva[]> {
    return this.service.findAllPerguntaByUsuario(id_usuario);
  }
}