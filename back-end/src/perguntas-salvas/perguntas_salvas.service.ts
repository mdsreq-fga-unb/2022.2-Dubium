import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PerguntasService } from 'src/perguntas/perguntas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreatePerguntaSalvaDto } from './dto/create-perguntas_salvas.dto';
import { PerguntaSalva } from './entities/perguntas_salvas.entity';


@Injectable()
export class PerguntasSalvasService {

    constructor(
        @Inject('PERGUNTASALVAS_REPOSITORY')
        private perguntasSalvasRepository: Repository<PerguntaSalva>,
        private readonly usuarioService: UsuariosService,
        private readonly perguntaService: PerguntasService
    ) { }

    async create(data: CreatePerguntaSalvaDto) {
        const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
        const pergunta = await this.perguntaService.findPerguntaById(data.id_pergunta);
        if (!usuario) {
            throw new BadRequestException('Usuário inválido!');
        }
        if (!pergunta) {
            throw new BadRequestException('Pergunta inválida!');
        }

        try {
            const perguntaSalva = new PerguntaSalva();

            perguntaSalva.pergunta = pergunta;
            perguntaSalva.usuario = usuario;

            return this.perguntasSalvasRepository.save(perguntaSalva);
        }
        catch (error) {
            throw new UnprocessableEntityException('Erro ao criar a pergunta!');
        }
    }

    async findAllPerguntaByUsuario(id_usuario: number) {
        const usuario = await this.usuarioService.findUsuarioById(id_usuario);

        return await this.perguntasSalvasRepository.find({
            where: { usuario },
            relations: {
                pergunta: true
            }
        })
    }
}