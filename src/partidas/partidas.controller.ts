import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PartidasService } from './partidas.service';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Get()
  listarPartidas() {
    return this.partidasService.listarTodas();
  }

  @Get(':id')
  buscarPartidaPorId(@Param('id') id: string) {
    return this.partidasService.buscarPorId(Number(id));
  }

  @Get(':id/clima')
  buscarClima(@Param('id') id: string) {
    return this.partidasService.buscarClimaPorPartida(Number(+id));
  }

  @Post()
  criarPartida(@Body() dto: CreatePartidaDto) {
    return this.partidasService.create(dto);
  }

  @Patch(':id')
  atualizarPartida(
    @Param('id') id: string,
    @Body() updatePartidaDto: UpdatePartidaDto,
  ) {
    return this.partidasService.atualizar(Number(id), updatePartidaDto);
  }

  @Patch(':id/status')
  atualizarStatusPartida(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.partidasService.atualizarStatus(Number(id), updateStatusDto);
  }

  @Delete(':id')
  removerPartida(@Param('id') id: string) {
    this.partidasService.remover(Number(id));

    return { message: `A partida foi removida com sucesso` };
  }
}
