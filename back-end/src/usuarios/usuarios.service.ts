import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  async findUsuarioById(id: number) {
    return await this.usuarioRepository.findOneBy({id});
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async updateVotosUsuario(){
    //findUsuarioById pra achar o id do usuario que ta atualizando
    //update - votosTotais
  }

  async rankingUsuarios(){
    const usuarios = await this.usuarioRepository.find();
    //percorrer todos os usuarios
    //ordenar do maior numero de votos pro maior
    //exibir a lista do ranking
    
    return usuarios;
  }
}
