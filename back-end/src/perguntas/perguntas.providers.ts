import { DataSource } from 'typeorm';
import { Pergunta } from './entities/pergunta.entity';

export const perguntasProviders = [
    {
      provide: 'PERGUNTAS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Pergunta),
      inject: ['DATA_SOURCE'],
    },
  ];