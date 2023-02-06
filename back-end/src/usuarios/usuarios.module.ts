import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from './usuarios.providers';
import { perguntasProviders } from 'src/perguntas/perguntas.providers';
import { respostaProviders } from 'src/respostas/respostas.providers';
import { AuthModule } from 'src/auth/auth.module';
import { perguntaSalvaproviders } from 'src/perguntas-salvas/perguntas_salvas.providers';
import { avisoSalvoproviders } from 'src/avisos-salvos/avisos_salvos.providers';
import { perguntaFavoritaproviders } from 'src/perguntas_favoritas/perguntas_favoritas.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService, ...usuarioProviders, ...perguntasProviders, ...respostaProviders, ...perguntaSalvaproviders, ...perguntaFavoritaproviders, ...avisoSalvoproviders],
  exports: [UsuariosService]
})
export class UsuariosModule {}
