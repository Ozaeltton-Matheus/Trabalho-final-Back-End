import { Module } from '@nestjs/common';
import { TorneiosService } from './torneios.service';
import { TorneiosController } from './torneios.controller';

@Module({
  controllers: [TorneiosController],
  providers: [TorneiosService],
  exports: [TorneiosService],
})
export class TorneiosModule {}
