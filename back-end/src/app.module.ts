import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerguntasModule } from './perguntas/perguntas.module';
import { RespostasModule } from './respostas/respostas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { AvisosModule } from './avisos/avisos.module';
import { PerguntasSalvasModule } from './perguntas-salvas/perguntas_salvas.module';
import { AvisoSalvosModule } from './avisos-salvos/avisos_salvos.module';

@Module({
  imports: [PerguntasModule, PerguntasSalvasModule, RespostasModule, UsuariosModule, AvisosModule, AvisoSalvosModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
