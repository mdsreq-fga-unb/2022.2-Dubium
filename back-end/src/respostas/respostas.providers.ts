import { DataSource } from 'typeorm';
import { Resposta } from './entities/resposta.entity';

export const respostaProviders = [
    {
      provide: 'RESPOSTA_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Resposta),
      inject: ['DATA_SOURCE'],
    },
  ];