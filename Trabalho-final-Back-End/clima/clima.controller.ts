import { Controller, Get, Query } from '@nestjs/common';
import { ClimaService } from './clima.service';

@Controller('clima')
export class ClimaController {

  constructor(
    private readonly climaService: ClimaService,
  ) {}

  @Get()
  buscar(@Query('cidade') cidade: string) {
    return this.climaService.buscarClima(cidade);
  }
}