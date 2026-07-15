import { Test, TestingModule } from '@nestjs/testing';
import { PartidasService } from './partidas.service';

describe('PartidasService', () => {
  let service: PartidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartidasService],
    }).compile();

    service = module.get<PartidasService>(PartidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the status of a partida', () => {
    const partida = service.create({
      torneioId: 1,
      duplaAId: 1,
      duplaBId: 2,
      dataHora: '2026-07-15T20:00:00.000Z',
      local: 'Arena Teste',
    });

    const updated = service.atualizarStatus(partida.id, {
      status: 'EM_ANDAMENTO',
    });

    expect(updated.status).toBe('EM_ANDAMENTO');
    expect(service.buscarPorId(partida.id).status).toBe('EM_ANDAMENTO');
  });
});
