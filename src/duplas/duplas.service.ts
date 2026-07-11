import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDuplaDto } from './dto/create-dupla.dto';
import { UpdateDuplaDto } from './dto/update-dupla.dto';
import { Dupla } from './entities/dupla.entity';

@Injectable()
export class DuplasService {
  private duplas: Dupla[] = [];

  create(createDuplaDto: CreateDuplaDto): Dupla {
    const novaDupla: Dupla = {
      id: Math.random().toString(36).substring(2, 9),
      nomeDaDupla: createDuplaDto.nomeDaDupla,
      torneioId: createDuplaDto.torneioId,
    };

    this.duplas.push(novaDupla);
    return novaDupla;
  }

  findAll(): Dupla[] {
    return this.duplas;
  }

  findOne(id: string): Dupla {
    const dupla = this.duplas.find((d) => d.id === id);
    if (!dupla) {
      throw new NotFoundException(`Dupla com o ID ${id} não foi encontrada.`);
    }
    return dupla;
  }

  findAllByTorneio(torneioId: string): Dupla[] {
    return this.duplas.filter((d) => d.torneioId === torneioId);
  }

  update(id: string, updateDuplaDto: UpdateDuplaDto): Dupla {
    const dupla = this.findOne(id);

    if (updateDuplaDto.nomeDaDupla) dupla.nomeDaDupla = updateDuplaDto.nomeDaDupla;
    if (updateDuplaDto.torneioId) dupla.torneioId = updateDuplaDto.torneioId;

    return dupla;
  }

  remove(id: string) {
    const index = this.duplas.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new NotFoundException(`Dupla com o ID ${id} não foi encontrada.`);
    }
    this.duplas.splice(index, 1);
    return `Dupla com o ID ${id} foi removida com sucesso.`;
  }
}
