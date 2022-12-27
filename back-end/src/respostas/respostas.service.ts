import { Injectable } from '@nestjs/common';
import { CreateRespostaDto } from './dto/create-resposta.dto';

@Injectable()
export class RespostasService {
  create(createRespostaDto: CreateRespostaDto) {
    return 'This action adds a new resposta';
  }

  findAll() {
    return `This action returns all respostas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} resposta`;
  }
}
