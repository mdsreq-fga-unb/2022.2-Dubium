import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { Aviso } from './avisos.entity';
import { CreateAvisoDto } from './dto/create-aviso.dto';

@Injectable()
export class AvisosService {
  constructor(
    @Inject('AVISOS_REPOSITORY')
    private avisosRepository: Repository<Aviso>,
    private readonly usuarioService: UsuariosService
  ) {}

  async create(data: CreateAvisoDto) {
    const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
    if(!usuario) {
      throw new BadRequestException('Usuário inválido!');
    }
    

    try{
      const aviso = new Aviso();
      
      aviso.usuario = usuario;
      aviso.tituloAviso = data.tituloAviso;
      aviso.corpoAviso = data.corpoAviso;
      aviso.id_cursoAviso = data.id_cursoAviso;
      aviso.midia = data.midia;
      aviso.filtro = data.filtro;
      aviso.votosTotais = data.votosTotais;
      return this.avisosRepository.save(aviso);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao cadastrar o aviso!');
    }
    
  }

  async findAvisoById(id: number) {
    return await this.avisosRepository.findOne({ 
      where: {id},
      relations: {
        usuario: true,
      }
    });
  }

 async findAll() {
    return await this.avisosRepository.find({
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
    return await this.avisosRepository.find({
      where: {usuario},
      relations: {
        usuario: true
      }
    });
  }

  async findAllByCurso(id_cursoAviso: number){
    return await this.avisosRepository.find({
      where: {id_cursoAviso}, 
      relations: {
        usuario: true,
      },
      order: {
        votosTotais: 'desc'
      }
    })
  }

  async remove(id: number) {
    return await this.avisosRepository.delete(id);
  }

  async updateMaisVotosAviso(id: number){

    return await this.avisosRepository
    .createQueryBuilder()
    .update(Aviso)
    .set({
      votosTotais: () => "votosTotais + 1"
    })
    .where({id})
    .execute()
  }

  async updateMenosVotosAviso(id: number){

    return await this.avisosRepository
    .createQueryBuilder()
    .update(Aviso)
    .set({
      votosTotais: () => "votosTotais - 1"
    })
    .where({id})
    .execute()
  }
}
