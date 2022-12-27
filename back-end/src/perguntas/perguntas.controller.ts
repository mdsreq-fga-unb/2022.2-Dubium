import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';

@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post()
  create(@Body() createPerguntaDto: CreatePerguntaDto) {
    return this.perguntasService.create(createPerguntaDto);
  }

  @Get()
  findAll() {
    return this.perguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(+id);
  }
}
