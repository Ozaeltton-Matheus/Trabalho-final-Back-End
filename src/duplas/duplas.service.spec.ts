import { Test, TestingModule } from '@nestjs/testing';
import { DuplasService } from './duplas.service';

describe('DuplasService', () => {
  let service: DuplasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuplasService],
    }).compile();

    service = module.get<DuplasService>(DuplasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
