import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import {perguntasProviders} from './perguntas.providers'
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { respostaProviders } from 'src/respostas/respostas.providers';
import { perguntaSalvaproviders } from 'src/perguntas-salvas/perguntas_salvas.providers';
@Module({
  imports: [DatabaseModule, UsuariosModule],
  controllers: [PerguntasController],
  providers: [PerguntasService, ...perguntasProviders, ...respostaProviders, ...perguntaSalvaproviders],
  exports: [PerguntasService]
})
export class PerguntasModule {}