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
  
    console.log(data.email)

    if((await this.findByEmail(data.email))) {
      throw new BadRequestException('Email já cadastrado! Verifique os dados e tente novamente.');
    }

    if((await this.findByMatricula(data.matricula))) {
      throw new BadRequestException('Matricula já cadastrada! Verifique os dados e tente novamente.');
    }

    const token_fake = "123123"

    const now_fake = new Date();
    now_fake.setHours(now_fake.getHours() - 1);

    try{
      const usuario = new Usuario();

      usuario.nome_completo = data.nome_completo;
      usuario.curso = data.curso;
      usuario.matricula = data.matricula;
      usuario.celular = data.celular;
      usuario.email = data.email;
      usuario.senha = data.senha;
      usuario.tokenRestaurarSenha = token_fake
      usuario.expiracaoSenha = now_fake
      return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao cadastrar o usuario!');
    }
  }

  async forgotPassword(data: string) {

    console.log(data['email'])

    if(!(await this.findByEmail(data['email']))) {
      throw new BadRequestException('Email não encontrado! Verifique os dados e tente novamente.');
    }
    
    try{ 

      const token = randomBytes(20).toString('hex'); 

      const now = new Date();
      now.setHours(now.getHours() + 1);

      const usuario = await this.findByEmail(data['email']);

      console.log(token, now)
      console.log("222")
      console.log(usuario)
      console.log("222")

      usuario.tokenRestaurarSenha = token;
      usuario.expiracaoSenha = now;

      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "654145472cc5ec",
          pass: "990f01e4a94bfa"
        }
      });

      transporter.sendMail({
        to: data['email'],
        from: 'gianmedeiros14@gmail.com',
        subject: 'Recuperação de senha!',
        html: `<p>Esqueceu sua senha? Não tem problema, este é seu token para recuperação: ${token} </p>`
      })

      console.log("FOOOOOOOOOOOOOOOOOIIIIIIII")

      return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao recuperar senha!');
    }
  }

  async resetPassword(data: string) {

    try{

      if(!(await this.findByEmail(data['email']))) {
        throw new BadRequestException('Email não encontrado! Verifique os dados e tente novamente.');
      }

      const usuario = await this.findByEmail(data['email']);

      const now = new Date();
      now.setHours(now.getHours());

      console.log(usuario.tokenRestaurarSenha)
      console.log(data)

      if(usuario.tokenRestaurarSenha != data['token']){
        throw new BadRequestException('Token incorreto! Verifique os dados e tente novamente.');
      }

      if(usuario.expiracaoSenha <= now){
        throw new BadRequestException('Token Invalido! Tempo de validade estendido, retire outro token.');
      }

      usuario.senha = data['password'];

      return this.usuarioRepository.save(usuario);
    }
    catch(error) {
      console.log(error.message)
      throw new UnprocessableEntityException('Erro ao resetar senha!');
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
