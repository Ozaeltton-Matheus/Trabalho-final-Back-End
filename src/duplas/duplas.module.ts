import { Module } from '@nestjs/common';
import { DuplasService } from './duplas.service';
import { DuplasController } from './duplas.controller';

@Module({
  controllers: [DuplasController],
  providers: [DuplasService],
})
export class DuplasModule {}
