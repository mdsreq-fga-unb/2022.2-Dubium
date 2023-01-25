import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { respostaProviders } from "src/respostas/respostas.providers";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { AvisosController } from "./avisos.controller";
import { avisosProviders } from "./avisos.providers";
import { AvisosService } from "./avisos.service";

@Module({
    imports: [DatabaseModule, UsuariosModule],
    controllers: [AvisosController],
    providers: [AvisosService, ...avisosProviders, ...respostaProviders],
    exports: [AvisosService]
  })
  export class AvisosModule {}