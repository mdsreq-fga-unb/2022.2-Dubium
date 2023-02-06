import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { usuarioProviders } from 'src/usuarios/usuarios.providers';
import { RespostasFavoritasController } from './respostas_favoritascontroller';
import { respostaFavoritaproviders } from './respostas_favoritas.providers';
import { RespostasFavoritasService } from './respostas_favoritas.service';
import { respostaProviders } from 'src/respostas/respostas.providers';
import { RespostasModule } from 'src/respostas/respostas.module';
import { RespostasService } from 'src/respostas/respostas.service';
import { PerguntasService } from 'src/perguntas/perguntas.service';
import { perguntasProviders } from 'src/perguntas/perguntas.providers';


@Module({
    imports: [DatabaseModule, UsuariosModule, RespostasModule],
    controllers: [RespostasFavoritasController],
    providers: [PerguntasService, RespostasService, RespostasFavoritasService, ...perguntasProviders, ...respostaFavoritaproviders, ...respostaProviders],
  })
  export class RespostasFavoritasModule {}