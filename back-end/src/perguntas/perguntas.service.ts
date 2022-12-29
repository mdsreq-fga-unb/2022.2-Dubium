import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PerguntasUsuario } from 'src/perguntas_usuario/perguntas_usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import {Pergunta} from './entities/pergunta.entity'
@Injectable()
export class PerguntasService {
  constructor(
    @Inject('PERGUNTAS_REPOSITORY')
    private perguntasRepository: Repository<Pergunta>,
    private readonly usuarioService: UsuariosService
    // @Inject('PERGUNTAS_USUARIO_REPOSITORY')
    // private perguntaUsuarioRepository: Repository<PerguntasUsuario>,
  ) {}

  async create(data: CreatePerguntaDto) {
    const usuario = await this.usuarioService.findOne(data.id_usuario);
    if(!usuario) {
      throw new BadRequestException('Usuário inválido!');
    }
    

    try{
      const pergunta = new Pergunta();

      pergunta.id_usuario = data.id_usuario;
      pergunta.tituloPergunta = data.tituloPergunta;
      pergunta.corpoPergunta = data.corpoPergunta;
      pergunta.cursoPergunta = data.cursoPergunta;
      return this.perguntasRepository.save(pergunta);
    }
    catch(error) {
      throw new UnprocessableEntityException('Erro ao cadastrar a pergunta!');
    }
    
  }

  async findPerguntaById(id: number) {
    return await this.perguntasRepository.findOneBy({ id });
  }

 async findAll() {
    return this.perguntasRepository.find();
  }

  async findAllByUsuario(id_usuario: number){
    return await this.perguntasRepository.find({where: {id_usuario}})
  }

  async remove(id: number) {
    return await this.perguntasRepository.delete(id);
  }
}
