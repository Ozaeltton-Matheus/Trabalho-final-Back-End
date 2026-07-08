import { Module } from '@nestjs/common';
import { TorneiosController } from './torneios.controller';
import { TorneiosService } from './torneios.service';

@Module({
  controllers: [TorneiosController],
  providers: [TorneiosService]
})
export class TorneiosModule {}
