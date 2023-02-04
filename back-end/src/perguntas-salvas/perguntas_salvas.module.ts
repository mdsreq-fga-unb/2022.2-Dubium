import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PerguntasModule } from 'src/perguntas/perguntas.module';
import { perguntasProviders } from 'src/perguntas/perguntas.providers';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { usuarioProviders } from 'src/usuarios/usuarios.providers';
import { PerguntasSalvasController } from './perguntas_salvas.controller';
import { perguntaSalvaproviders } from './perguntas_salvas.providers';
import { PerguntasSalvasService } from './perguntas_salvas.service';


@Module({
    imports: [DatabaseModule, UsuariosModule, PerguntasModule],
    controllers: [PerguntasSalvasController],
    providers: [PerguntasSalvasService, ...perguntaSalvaproviders, ...perguntasProviders],
  })
  export class PerguntasSalvasModule {}