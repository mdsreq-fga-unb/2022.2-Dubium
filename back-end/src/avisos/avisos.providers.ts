import { DataSource } from 'typeorm';
import { Aviso } from './avisos.entity';

export const avisosProviders = [
    {
      provide: 'AVISOS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Aviso),
      inject: ['DATA_SOURCE'],
    },
  ];