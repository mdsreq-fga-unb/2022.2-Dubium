import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerguntasModule } from './perguntas/perguntas.module';
import { RespostasModule } from './respostas/respostas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { AvisosModule } from './avisos/avisos.module';

@Module({
  imports: [PerguntasModule, RespostasModule, UsuariosModule, AvisosModule, ConfigModule.forRoot({ isGlobal: true })],
  service: [AppController],
  providers: [AppService],
})
export class AppModule {}
