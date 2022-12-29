import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { Pergunta } from './entities/pergunta.entity';

@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly service: PerguntasService) {}

  @Post()
  async create(@Body() data: CreatePerguntaDto) {
    return this.service.create(data);
  }

  @Get(':id')
  async findPerguntaById(@Param('id') id: number) {
    return this.service.findPerguntaById(id);
  }

  @Get()
  async findAll(): Promise<Pergunta[]> {
    return this.service.findAll();
  }

  @Get(':id_usuario')
  async findAllByUsuario(@Param('id_usuario') id_usuario: number): Promise<Pergunta[]> {
    return this.service.findAllByUsuario(id_usuario);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
