import { Module } from '@nestjs/common';
import { AvisosModule } from 'src/avisos/avisos.module';
import { avisosProviders } from 'src/avisos/avisos.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AvisosSalvosController } from './avisos_salvos.controller';
import { avisoSalvoproviders } from './avisos_salvos.providers';
import { AvisosSalvosService } from './avisos_salvos.service';


@Module({
    imports: [DatabaseModule, UsuariosModule, AvisosModule],
    controllers: [AvisosSalvosController],
    providers: [AvisosSalvosService, ...avisoSalvoproviders, ...avisosProviders],
  })
  export class AvisoSalvosModule {}