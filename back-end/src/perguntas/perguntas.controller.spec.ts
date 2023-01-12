import { Test, TestingModule } from '@nestjs/testing';
import { PerguntasController } from './perguntas.controller';

describe('PerguntasController', () => {
    let controller = PerguntasController; 

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            service:[PerguntasController], 
        }).compile();

        controller = module.get<PerguntasController>(PerguntasController);
    });
    it('shold be defined', () => {
        expect(controller).toBeDefined();
    });

})