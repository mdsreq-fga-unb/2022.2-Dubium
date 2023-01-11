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
    const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
    if(!usuario) {
      throw new BadRequestException('Usuário inválido!');
    }
    

    try{
      const pergunta = new Pergunta();
      
      pergunta.usuario = usuario;
      pergunta.tituloPergunta = data.tituloPergunta;
      pergunta.corpoPergunta = data.corpoPergunta;
      pergunta.id_cursoPergunta = data.id_cursoPergunta;
      pergunta.midia = data.midia;
      pergunta.filtro = data.filtro;
      pergunta.votosTotais = data.votosTotais;
      return this.perguntasRepository.save(pergunta);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao cadastrar a pergunta!');
    }
    
  }

  async findPerguntaById(id: number) {
    return await this.perguntasRepository.findOne({ 
      where: {id},
      relations: {
        usuario: true,
      }
    });
  }

 async findAll() {
    return await this.perguntasRepository.find({
      relations: {
        usuario: true,
      },
      order: {
        votosTotais: 'desc'
      }
    });
  }

  async findAllByUsuario(id_usuario: number){
    const usuario = await this.usuarioService.findUsuarioById(id_usuario)
    return await this.perguntasRepository.find({
      where: {usuario},
      relations: {
        usuario: true
      }
    });
  }

  async findAllByCurso(id_cursoPergunta: number){
    return await this.perguntasRepository.find({
      where: {id_cursoPergunta}, 
      relations: {
        usuario: true,
      },
      order: {
        votosTotais: 'desc'
      }
    })
  }

  async remove(id: number) {
    return await this.perguntasRepository.delete(id);
  }

  async updateMaisVotosPergunta(id: number){

    return await this.perguntasRepository
    .createQueryBuilder()
    .update(Pergunta)
    .set({
      votosTotais: () => "votosTotais + 1"
    })
    .where({id})
    .execute()
  }

  async updateMenosVotosPergunta(id: number){

    return await this.perguntasRepository
    .createQueryBuilder()
    .update(Pergunta)
    .set({
      votosTotais: () => "votosTotais - 1"
    })
    .where({id})
    .execute()
  }
}
