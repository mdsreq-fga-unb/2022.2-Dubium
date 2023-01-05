import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PerguntasService } from 'src/perguntas/perguntas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { Resposta } from './entities/resposta.entity';

@Injectable()
export class RespostasService {
  constructor(
    @Inject('RESPOSTA_REPOSITORY')
    private respostaRepository: Repository<Resposta>,
    private readonly usuarioService: UsuariosService,
    private readonly perguntaService: PerguntasService
  ){}
  async create(data: CreateRespostaDto) {
    const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
    const pergunta = await this.perguntaService.findPerguntaById(data.id_pergunta);

    if(!usuario) {
      throw new BadRequestException('Usuário inválido!');
    }
    else if(!pergunta) {
      throw new BadRequestException('Pergunta inválida!');
    }
    // else if(pergunta.usuario.id == usuario.id) {
    //   throw new BadRequestException('Pergunta inválida!');
    // }

    try{
      const resposta = new Resposta();

      resposta.pergunta = pergunta;
      resposta.usuario = usuario;
      resposta.corpoResposta = data.corpoResposta;
      return this.respostaRepository.save(resposta);
    }
    catch(error) {
      throw new UnprocessableEntityException('Erro ao cadastrar a resposta!');
    }
  }

  async findRespostaById(id: number) {
    return await this.respostaRepository.findOne({
      where: {id},
      relations: {
        pergunta: true,
        usuario: true,
      }
    });
  }

  async findAll() {
    return this.respostaRepository.find({
      relations: {
        pergunta: true,
        usuario: true,
      }
    });
  }

  async findAllByPergunta(id_pergunta: number){
    const pergunta = await this.perguntaService.findPerguntaById(id_pergunta);
    return await this.respostaRepository.find({
      where: {pergunta},
      relations: {
        pergunta: true,
        usuario: true
      }
    })
  }

  async remove(id: number) {
    return await this.respostaRepository.delete(id);
  }
}
