import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDuplaDto } from './dto/create-dupla.dto';
import { UpdateDuplaDto } from './dto/update-dupla.dto';
import { Dupla } from './entities/dupla.entity';
import { TorneiosService } from '../torneios/torneios.service';

@Injectable()
export class DuplasService {
  private duplas: Dupla[] = [];

  constructor(private readonly torneiosService: TorneiosService) {}

  create(createDuplaDto: CreateDuplaDto): Dupla {
    const torneio = this.torneiosService.findOne(createDuplaDto.torneioId);

    if (torneio.status === 'FINALIZADO') {
      throw new BadRequestException(
        'Não é possível inscrever duplas em um torneio que já foi finalizado.',
      );
    }

    const nomeExisteNoTorneio = this.duplas.some(
      (d) =>
        d.torneioId === createDuplaDto.torneioId &&
        d.nomeDaDupla.toLowerCase() ===
          createDuplaDto.nomeDaDupla.toLowerCase(),
    );
    if (nomeExisteNoTorneio) {
      throw new ConflictException(
        `Já existe uma dupla cadastrada com o nome "${createDuplaDto.nomeDaDupla}" neste torneio.`,
      );
    }

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
    this.torneiosService.findOne(torneioId);
    return this.duplas.filter((d) => d.torneioId === torneioId);
  }

  update(id: string, updateDuplaDto: UpdateDuplaDto): Dupla {
    const dupla = this.findOne(id);

    if (updateDuplaDto.torneioId) {
      const torneio = this.torneiosService.findOne(updateDuplaDto.torneioId);
      if (torneio.status === 'FINALIZADO') {
        throw new BadRequestException(
          'Não é possível mover uma dupla para um torneio finalizado.',
        );
      }
      dupla.torneioId = updateDuplaDto.torneioId;
    }

    if (updateDuplaDto.nomeDaDupla) {
      const nomeDaDuplaValidar = updateDuplaDto.nomeDaDupla;
      const torneioIdValidar = dupla.torneioId;

      const nomeExisteNoTorneio = this.duplas.some(
        (d) =>
          d.id !== id &&
          d.torneioId === torneioIdValidar &&
          d.nomeDaDupla.toLowerCase() === nomeDaDuplaValidar.toLowerCase(),
      );

      if (nomeExisteNoTorneio) {
        throw new ConflictException(
          `Outra dupla já utiliza o nome "${nomeDaDuplaValidar}" neste torneio.`,
        );
      }
      dupla.nomeDaDupla = updateDuplaDto.nomeDaDupla;
    }

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
