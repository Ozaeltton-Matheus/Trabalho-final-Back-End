import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { TorneiosModule } from './torneios/torneios.module';
import { ClimaModule } from '../clima/clima.module';

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

    TorneiosModule,
    ClimaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}