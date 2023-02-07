import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { Pergunta } from './entities/pergunta.entity';
import { SkipAuth } from '../auth/public-key.decorator';

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

  @SkipAuth()
  @Get()
  async findAll(): Promise<Pergunta[]> {
    return this.service.findAll();
  }

  @Get('/usuario/:id_usuario')
  async findAllByUsuario(@Param('id_usuario') id_usuario: number): Promise<Pergunta[]> {
    return this.service.findAllByUsuario(id_usuario);
  }

  @SkipAuth()
  @Get('/curso/:id_cursoPergunta')
  async findAllByCurso(@Param('id_cursoPergunta') id_cursoPergunta: number): Promise<Pergunta[]> {
    return this.service.findAllByCurso(id_cursoPergunta);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @SkipAuth()
  @Patch(':id')
  updateMaisVotosPergunta(@Param('id') id: string) {
    return this.service.updateMaisVotosPergunta(+id);
  }

  @SkipAuth()
  @Patch('/menos/:id')
  updateMenosVotosPergunta(@Param('id') id: string) {
    return this.service.updateMenosVotosPergunta(+id);
  }
}
