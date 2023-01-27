import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    findOneBy(arg0: { email: string; }): Usuario | PromiseLike<Usuario> {
        throw new Error('Method not implemented.');
    }

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ){}

  async create(data: CreateUsuarioDto) {
  
    if((await this.findByEmail(data.email))) {
      throw new BadRequestException('Email já cadastrado! Verifique os dados e tente novamente.');
    }

    if((await this.findByMatricula(data.matricula))) {
      throw new BadRequestException('Matricula já cadastrada! Verifique os dados e tente novamente.');
    }

    try{
      const usuario = new Usuario();

      usuario.nome_completo = data.nome_completo;
      usuario.curso = data.curso;
      usuario.matricula = data.matricula;
      usuario.celular = data.celular;
      usuario.email = data.email;
      usuario.senha = data.senha;
      return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao cadastrar o usuario!');
    }
  }

  async updateUsuario(id: number, data: UpdateUsuarioDto){
    try {
      const usuario = await this.findUsuarioById(id);
      usuario.nome_completo = data.nome_completo;
      usuario.curso = data.curso;
      usuario.matricula = data.matricula;
      usuario.celular = data.celular;
      usuario.email = data.email;
      usuario.senha = data.senha;
      return this.usuarioRepository.save(usuario);
    } 
    catch (error) {
      throw new UnprocessableEntityException('Erro ao editar seus dados!');
    }
  }

  async remove(id: number) {
    return await this.usuarioRepository.delete(id);
  }

  async findAll() {
    return await this.usuarioRepository.find({
      order: {
        votosTotais: 'desc'
      }
    });
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOneBy({ email });
}

async findByMatricula(matricula: number): Promise<Usuario | undefined> {
  return await this.usuarioRepository.findOneBy({ matricula });
}

  async findUsuarioById(id: number) {
    return await this.usuarioRepository.findOneBy({id});
  }

  async updateMaisVotosUsuario(id: number){

    return await this.usuarioRepository
    .createQueryBuilder()
    .update(Usuario)
    .set({
      votosTotais: () => "votosTotais + 1"
    })
    .where({id})
    .execute()
  }

  async updateMenosVotosUsuario(id: number){

    return await this.usuarioRepository
    .createQueryBuilder()
    .update(Usuario)
    .set({
      votosTotais: () => "votosTotais - 1"
    })
    .where({id})
    .execute()
  }
}
