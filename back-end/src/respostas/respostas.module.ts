import { Module } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { RespostasController } from './respostas.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PerguntasModule } from 'src/perguntas/perguntas.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { respostaProviders } from './respostas.providers';
import { perguntasProviders } from 'src/perguntas/perguntas.providers';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PerguntasService } from 'src/perguntas/perguntas.service';

@Module({
  imports: [DatabaseModule, UsuariosModule, PerguntasModule],
  controllers: [RespostasController],
  providers: [RespostasService, ...respostaProviders, ...perguntasProviders],
})
export class RespostasModule {}
