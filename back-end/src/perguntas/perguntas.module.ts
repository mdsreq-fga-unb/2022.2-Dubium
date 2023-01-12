import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import {perguntasProviders} from './perguntas.providers'
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { perguntaUsuarioProviders } from 'src/perguntas_usuario/perguntas_usuario.providers';
import { respostaProviders } from 'src/respostas/respostas.providers';
@Module({
  imports: [DatabaseModule, UsuariosModule],
  service: [PerguntasController],
  providers: [PerguntasService, ...perguntasProviders, ...respostaProviders],
  exports: [PerguntasService]
})
export class PerguntasModule {}