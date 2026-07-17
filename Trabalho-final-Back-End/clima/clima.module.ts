import { Module } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { ClimaController } from './clima.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ClimaController],
  providers: [ClimaService],
  exports: [ClimaService], 
})
export class ClimaModule {}