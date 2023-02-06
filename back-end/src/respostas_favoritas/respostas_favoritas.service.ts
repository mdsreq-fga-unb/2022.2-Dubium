import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RespostasService } from 'src/respostas/respostas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateRespostaFavoritaDto } from './dto/create-respostas_favoritas.dto';
import { RespostaFavorita } from './entities/respostas_favoritas.entity';


@Injectable()
export class RespostasFavoritasService {

    constructor(
        @Inject('RESPOSTAFAVORITA_REPOSITORY')
        private respostasFavoritasRepository: Repository<RespostaFavorita>,
        private readonly usuarioService: UsuariosService,
        private readonly respostaService: RespostasService
    ) { }

    async create(data: CreateRespostaFavoritaDto) {
        const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
        const resposta = await this.respostaService.findRespostaById(data.id_resposta);
        if (!usuario) {
            throw new BadRequestException('Usuário inválido!');
        }
        if (!resposta) {
            throw new BadRequestException('Resposta inválida!');
        }

        try {
            const respostaFavorita = new RespostaFavorita();

            respostaFavorita.resposta = resposta;
            respostaFavorita.usuario = usuario;

            return this.respostasFavoritasRepository.save(respostaFavorita);
        }
        catch (error) {
            throw new UnprocessableEntityException('Erro ao criar a resposta!');
        }
    }

}