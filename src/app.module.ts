import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TorneiosModule } from './torneios/torneios.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TorneiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
