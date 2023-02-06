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
import { AuthModule } from './auth/auth.module';
import { PerguntasFavoritasModule } from './perguntas_favoritas/perguntas_favoritas.module';
import { RespostasFavoritasModule } from './respostas_favoritas/respostas_favoritas.module';

@Module({
  imports: [PerguntasModule, PerguntasSalvasModule, PerguntasFavoritasModule,  RespostasModule, RespostasFavoritasModule, UsuariosModule, AvisosModule, AvisoSalvosModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
