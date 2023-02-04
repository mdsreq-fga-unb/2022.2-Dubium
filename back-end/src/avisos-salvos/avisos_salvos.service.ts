import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AvisosService } from 'src/avisos/avisos.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateAvisoSalvoDto } from './dto/create-avisos_salvos.dto';
import { AvisoSalvo } from './entities/avisos_salvos.entity';


@Injectable()
export class AvisosSalvosService {

    constructor(
        @Inject('AVISOSALVOS_REPOSITORY')
        private avisoSalvoRepository: Repository<AvisoSalvo>,
        private readonly usuarioService: UsuariosService,
        private readonly avisoService: AvisosService
    ) { }

    async create(data: CreateAvisoSalvoDto) {
        const usuario = await this.usuarioService.findUsuarioById(data.id_usuario);
        const aviso = await this.avisoService.findAvisoById(data.id_aviso);
        if (!usuario) {
            throw new BadRequestException('Usuário inválido!');
        }
        if (!aviso) {
            throw new BadRequestException('Aviso inválidp!');
        }

        try {
            const avisoSalvo = new AvisoSalvo();

            avisoSalvo.aviso = aviso;
            avisoSalvo.usuario = usuario;

            return this.avisoSalvoRepository.save(avisoSalvo);
        }
        catch (error) {
            throw new UnprocessableEntityException('Erro ao criar o aviso!');
        }
    }

    async findAllAvisoByUsuario(id_usuario: number) {
        const usuario = await this.usuarioService.findUsuarioById(id_usuario);

        return await this.avisoSalvoRepository.find({
            where: { usuario },
            relations: {
                aviso: true
            }
        })
    }
}