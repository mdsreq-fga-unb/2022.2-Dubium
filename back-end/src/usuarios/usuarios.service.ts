import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {randomBytes} from 'crypto';
import nodemailer from 'nodemailer';

@Injectable()
export class UsuariosService {

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

  async forgotPassword(email: string) {
  
    if(!(await this.findByEmail(email))) {
      throw new BadRequestException('Email não encontrado! Verifique os dados e tente novamente.');
    }

    try{
      
      const token = randomBytes(20).toString('hex'); 
      
      const now = new Date();
      now.setHours(now.getHours() + 1);
      
      const usuario = await this.findByEmail(email);
      
      usuario.tokenRestaurarSenha = token;
      usuario.expiracaoSenha = now;

      console.log(token, now)

      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "654145472cc5ec",
          pass: "990f01e4a94bfa"
        }
      });

      transporter.sendMail({
        to: email,
        from: 'gianmedeiros14@gmail.com',
        subject: 'Recuperação de senha!',
        html: `<p>Esqueceu sua senha? Não tem problema, este é seu token para recuperação: ${token} </p>`
      })

      // return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao recuperar senha!');
    }
  }

  async resetPassword(email: string, token: string, password: string) {
  
    try{
  
      if(!(await this.findByEmail(email))) {
        throw new BadRequestException('Email não encontrado! Verifique os dados e tente novamente.');
      }
      
      const usuario = await this.findByEmail(email);
      
      const now = new Date();
      now.setHours(now.getHours());
      
      if(usuario.tokenRestaurarSenha != token){
        throw new BadRequestException('Token incorreto! Verifique os dados e tente novamente.');
      }

      if(usuario.expiracaoSenha <= now){
        throw new BadRequestException('Token Invalido! Tempo de validade estendido, retire outro token.');
      }

      usuario.senha = password;

      return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao resetar senha!');
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
