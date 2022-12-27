import { Injectable } from '@nestjs/common';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
@Injectable()
export class PerguntasService {
  create(createPerguntaDto: CreatePerguntaDto) {
    return 'This action adds a new pergunta';
    //as validações 
    //if texto != 0
    //se passar nas validações -> acessa a coleçao .collection -> acessa o documento .document -> pegas as informaçoes
    //.save -> vai salvar no banco de dados
  }

  findAll() {
    return `This action returns all perguntas`;
    //.find
  }

  findOne(id: number) {
    return `This action returns a #${id} pergunta`;
  }

  remove(id: number) {
    return `This action removes a #${id} pergunta`;
  }
}
