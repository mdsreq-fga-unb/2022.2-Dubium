import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PerguntasModule } from 'src/perguntas/perguntas.module';
import { perguntasProviders } from 'src/perguntas/perguntas.providers';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PerguntasFavoritasController } from './perguntas_favoritas.controller';
import { perguntaFavoritaproviders } from './perguntas_favoritas.providers';
import { PerguntasFavoritasService } from './perguntas_favoritas.service';


@Module({
    imports: [DatabaseModule, UsuariosModule, PerguntasModule],
    controllers: [PerguntasFavoritasController],
    providers: [PerguntasFavoritasService, ...perguntaFavoritaproviders, ...perguntasProviders],
  })
  export class PerguntasFavoritasModule {}