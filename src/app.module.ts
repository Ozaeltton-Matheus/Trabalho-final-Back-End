import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { DuplasModule } from './duplas/duplas.module';
import { TorneiosModule } from './torneios/torneios.module';
import { ClimaModule } from '../clima/clima.module';
import { PartidasModule } from './partidas/partidas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CacheModule.register({
      ttl: 300,
      max: 100,
      isGlobal: true,
    }),

    DuplasModule,
    TorneiosModule,
    ClimaModule,
    PartidasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}