import { DataSource } from 'typeorm';
import { PerguntaFavorita } from './entities/perguntas_favoritas.entity';

export const perguntaFavoritaproviders = [
    {
      provide: 'PERGUNTAFAVORITA_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(PerguntaFavorita),
      inject: ['DATA_SOURCE'],
    },
  ];