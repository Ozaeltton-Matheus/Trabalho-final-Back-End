import { Test, TestingModule } from '@nestjs/testing';
import { DuplasController } from './duplas.controller';
import { DuplasService } from './duplas.service';

describe('DuplasController', () => {
  let controller: DuplasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuplasController],
      providers: [DuplasService],
    }).compile();

    controller = module.get<DuplasController>(DuplasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
