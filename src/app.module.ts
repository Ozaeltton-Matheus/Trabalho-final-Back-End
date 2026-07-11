import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DuplasModule } from './duplas/duplas.module';
import { TorneiosModule } from './torneios/torneios.module';

@Module({
  imports: [DuplasModule, TorneiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
