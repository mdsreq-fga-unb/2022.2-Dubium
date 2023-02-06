import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PerguntasService } from 'src/perguntas/perguntas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreatePerguntaFavoritaDto } from './dto/create-perguntas_favoritas.dto';
import { PerguntaFavorita } from './entities/perguntas_favoritas.entity';


@Injectable()
export class PerguntasFavoritasService {

    constructor(
        @Inject('PERGUNTAFAVORITA_REPOSITORY')
        private perguntasFavoritasRepository: Repository<PerguntaFavorita>,
        private readonly usuarioService: UsuariosService,
        private readonly perguntaService: PerguntasService
    ) { }

    async create(data: CreatePerguntaFavoritaDto) {
        const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
        const pergunta = await this.perguntaService.findPerguntaById(data.id_pergunta);
        if (!usuario) {
            throw new BadRequestException('Usuário inválido!');
        }
        if (!pergunta) {
            throw new BadRequestException('Pergunta inválida!');
        }

        try {
            const perguntaFavorita = new PerguntaFavorita();

            perguntaFavorita.pergunta = pergunta;
            perguntaFavorita.usuario = usuario;

            return this.perguntasFavoritasRepository.save(perguntaFavorita);
        }
        catch (error) {
            throw new UnprocessableEntityException('Erro ao criar a pergunta!');
        }
    }

}