import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTorneioDto } from './dto/create-torneio.dto';
import { UpdateTorneioDto } from './dto/update-torneio.dto';
import { Torneio } from './entities/torneio.entity';

@Injectable()
export class TorneiosService {
  private torneios: Torneio[] = [];

  create(createTorneioDto: CreateTorneioDto): Torneio {
    const nomeExiste = this.torneios.some(
      (t) => t.nome.toLowerCase() === createTorneioDto.nome.toLowerCase(),
    );
    if (nomeExiste) {
      throw new ConflictException(
        `Já existe um torneio cadastrado com o nome "${createTorneioDto.nome}".`,
      );
    }

    if (
      new Date(createTorneioDto.dataFim) < new Date(createTorneioDto.dataInicio)
    ) {
      throw new BadRequestException(
        'A data de fim do torneio não pode ser anterior à data de início.',
      );
    }

    const novoTorneio: Torneio = {
      id: Math.random().toString(36).substring(2, 9),
      nome: createTorneioDto.nome,
      dataInicio: createTorneioDto.dataInicio,
      dataFim: createTorneioDto.dataFim,
      status: createTorneioDto.status,
    };

    this.torneios.push(novoTorneio);
    return novoTorneio;
  }

  findAll(): Torneio[] {
    return this.torneios;
  }

  findOne(id: string): Torneio {
    const torneio = this.torneios.find((t) => t.id === id);
    if (!torneio) {
      throw new NotFoundException(`Torneio com o ID ${id} não foi encontrado.`);
    }
    return torneio;
  }

  update(id: string, updateTorneioDto: UpdateTorneioDto): Torneio {
    const torneio = this.findOne(id);
    if (updateTorneioDto.nome) {
      const nomeExiste = this.torneios.some(
        (t) =>
          t.nome.toLowerCase() === updateTorneioDto.nome!.toLowerCase() &&
          t.id !== id,
      );
      if (nomeExiste) {
        throw new ConflictException(
          `Outro torneio já utiliza o nome "${updateTorneioDto.nome}".`,
        );
      }
      torneio.nome = updateTorneioDto.nome;
    }

    const novaDataInicio = updateTorneioDto.dataInicio || torneio.dataInicio;
    const novaDataFim = updateTorneioDto.dataFim || torneio.dataFim;
    if (new Date(novaDataFim) < new Date(novaDataInicio)) {
      throw new BadRequestException(
        'A data de fim do torneio não pode ser anterior à data de início.',
      );
    }

    if (updateTorneioDto.status) {
      torneio.status = updateTorneioDto.status;
    }
    if (updateTorneioDto.dataInicio) {
      torneio.dataInicio = updateTorneioDto.dataInicio;
    }
    if (updateTorneioDto.dataFim) {
      torneio.dataFim = updateTorneioDto.dataFim;
    }

    return torneio;
  }

  remove(id: string) {
    const index = this.torneios.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Torneio com o ID ${id} não foi encontrado.`);
    }
    this.torneios.splice(index, 1);
    return `Torneio com o ID ${id} foi removido com sucesso.`;
  }
}
