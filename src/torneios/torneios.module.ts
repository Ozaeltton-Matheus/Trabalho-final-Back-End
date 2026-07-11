import { Module } from '@nestjs/common';
import { TorneiosService } from './torneios.service';
import { TorneiosController } from './torneios.controller';

@Module({
  controllers: [TorneiosController],
  providers: [TorneiosService],
})
export class TorneiosModule {}
