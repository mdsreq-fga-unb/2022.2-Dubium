import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePerguntaFavoritaDto } from './dto/create-perguntas_favoritas.dto';
import { PerguntaFavorita } from './entities/perguntas_favoritas.entity';
import { PerguntasFavoritasService } from './perguntas_favoritas.service';

@Controller('perguntas-favoritas')
export class PerguntasFavoritasController {
  constructor(private readonly service: PerguntasFavoritasService) {} 

  @Post()
  async create(@Body() data: CreatePerguntaFavoritaDto) {
    return this.service.create(data);
  }
}