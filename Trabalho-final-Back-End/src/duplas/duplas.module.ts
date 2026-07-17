import { Module } from '@nestjs/common';
import { TorneiosModule } from '../torneios/torneios.module';
import { DuplasService } from './duplas.service';
import { DuplasController } from './duplas.controller';

@Module({
  imports: [TorneiosModule],
  controllers: [DuplasController],
  providers: [DuplasService],
})
export class DuplasModule {}
