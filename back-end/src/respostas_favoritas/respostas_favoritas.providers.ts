import { DataSource } from 'typeorm';
import { RespostaFavorita } from './entities/respostas_favoritas.entity';

export const respostaFavoritaproviders = [
    {
      provide: 'RESPOSTAFAVORITA_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(RespostaFavorita),
      inject: ['DATA_SOURCE'],
    },
  ];