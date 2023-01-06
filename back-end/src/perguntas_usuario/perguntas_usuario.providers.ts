import { DataSource } from 'typeorm';
import { PerguntasUsuario } from './perguntas_usuario.entity';

export const perguntaUsuarioProviders = [
    {
      provide: 'PERGUNTAS_USUARIO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(PerguntasUsuario),
      inject: ['DATA_SOURCE'],
    },
  ];