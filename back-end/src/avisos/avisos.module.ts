import { Module } from "@nestjs/common";
import { avisoSalvoproviders } from "src/avisos-salvos/avisos_salvos.providers";
import { DatabaseModule } from "src/database/database.module";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { AvisosController } from "./avisos.controller";
import { avisosProviders } from "./avisos.providers";
import { AvisosService } from "./avisos.service";

@Module({
    imports: [DatabaseModule, UsuariosModule],
    controllers: [AvisosController],
    providers: [AvisosService, ...avisosProviders, ...avisoSalvoproviders],
    exports: [AvisosService]
  })
  export class AvisosModule {}