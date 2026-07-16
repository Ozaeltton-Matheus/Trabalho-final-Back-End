import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ClimaResponseDto } from './dto/clima-response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class ClimaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  // busca o clima de uma cidade usando a API do OpenWeatherMap
  async buscarClima(cidade: string): Promise<ClimaResponseDto> {
    // verifica o cache antes de fazer a requisição
    const cacheKey = `clima_${cidade.toLowerCase()}`;

    const climaCache = await this.cacheManager.get<ClimaResponseDto>(cacheKey);

    if (climaCache) {
      return climaCache;
    }

    const apiKey = this.configService.get<string>('API_KEY');

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: cidade,
              appid: apiKey,
              units: 'metric',
              lang: 'pt_br',
            },
          },
        ),
      );

      const clima =  {
        cidade: response.data.name,
        temperatura: response.data.main.temp,
        descricao: response.data.weather[0].description,
        umidade: response.data.main.humidity,
        vento: response.data.wind.speed,
      };
      await this.cacheManager.set(cacheKey, clima, 300);
      return clima;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar o clima. Verifique se a cidade está correta.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
