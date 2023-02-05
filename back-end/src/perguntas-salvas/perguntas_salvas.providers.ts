import { DataSource } from 'typeorm';
import { PerguntaSalva } from './entities/perguntas_salvas.entity'; 

export const perguntaSalvaproviders = [
    {
      provide: 'PERGUNTASALVAS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(PerguntaSalva),
      inject: ['DATA_SOURCE'],
    },
  ];