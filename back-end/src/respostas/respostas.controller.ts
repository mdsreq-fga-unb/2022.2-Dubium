import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';

@Controller('respostas')
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @Post()
  create(@Body() createRespostaDto: CreateRespostaDto) {
    return this.respostasService.create(createRespostaDto);
  }

  @Get()
  findAll() {
    return this.respostasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respostasService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respostasService.remove(+id);
  }
}
