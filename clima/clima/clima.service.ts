import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClimaService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  // busca o clima de uma cidade usando a API do OpenWeatherMap
 async buscarClima(cidade: string) {
  try {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');

    const resposta = await this.httpService.axiosRef.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`,
    );

    return resposta.data;

  } catch(error: unknown) {
    return {
      mensagem: 'Erro ao buscar o clima no momento',
      error: (error as Error).message
    };
  }
}
}
