import { Test, TestingModule } from '@nestjs/testing';
import { PerguntasService } from './perguntas.service';

describe('PerguntasService', () => {
    let service = PerguntasService; 

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            service:[PerguntasService], 
        }).compile();

        service = module.get<PerguntasService>(PerguntasService);
    });
    it('shold be defined', () => {
        expect(service).toBeDefined();
    });

})