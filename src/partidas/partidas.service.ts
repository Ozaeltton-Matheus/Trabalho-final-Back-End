import { Injectable, NotFoundException } from '@nestjs/common';
import { Partidas } from './entities/partidas.entity';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class PartidasService {
  private partidas: Partidas[] = [];

  private id = 1;

  create(createPartidaDto: CreatePartidaDto): Partidas {
    const partida: Partidas = {
      id: this.id++,
      ...createPartidaDto,
      status: 'AGENDADA',
      dataHora: new Date(createPartidaDto.dataHora),
      placarDuplaA: 0,
      placarDuplaB: 0,
    };
    this.partidas.push(partida);
    return partida;
  }

  listarTodas(): Partidas[] {
    return this.partidas;
  }

  buscarPorId(id: number): Partidas {
    const partida = this.partidas.find((partida) => partida.id === id);
    if (!partida) {
      throw new NotFoundException(`A partida com ID ${id} não foi encontrada`);
    }
    return partida;
  }

  atualizar(id: number, updatePartidaDto: UpdatePartidaDto): Partidas {
    const partida = this.buscarPorId(id);
    Object.assign(partida, updatePartidaDto);
    return partida;
  }

  atualizarStatus(id: number, updateStatusDto: UpdateStatusDto): Partidas {
    const partida = this.buscarPorId(id);
    partida.status = updateStatusDto.status;
    return partida;
  }

  remover(id: number): void {
    const indice = this.partidas.findIndex((partida) => partida.id === id);
    if (indice === -1) {
      throw new NotFoundException(`A partida com ID ${id} não foi encontrada`);
    }
    this.partidas.splice(indice, 1);
  }
}
