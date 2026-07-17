import { Module } from '@nestjs/common';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';
import { ClimaModule } from 'clima/clima.module';
@Module({
  imports: [ClimaModule],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
