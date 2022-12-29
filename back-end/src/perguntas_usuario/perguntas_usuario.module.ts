import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { perguntaUsuarioProviders } from "./perguntas_usuario.providers";

@Module({
    imports: [DatabaseModule],
    providers: [...perguntaUsuarioProviders],
  })
  export class AlunoModule {}