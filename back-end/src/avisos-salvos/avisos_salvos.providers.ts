import { DataSource } from 'typeorm';
import { AvisoSalvo } from './entities/avisos_salvos.entity'; 

export const avisoSalvoproviders = [
    {
      provide: 'AVISOSALVOS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(AvisoSalvo),
      inject: ['DATA_SOURCE'],
    },
  ];