import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRespostaFavoritaDto } from './dto/create-respostas_favoritas.dto';
import { RespostaFavorita } from './entities/respostas_favoritas.entity';
import { RespostasFavoritasService } from './respostas_favoritas.service';

@Controller('respostas-favoritas')
export class RespostasFavoritasController {
  constructor(private readonly service: RespostasFavoritasService) {} 

  @Post()
  async create(@Body() data: CreateRespostaFavoritaDto) {
    return this.service.create(data);
  }
}