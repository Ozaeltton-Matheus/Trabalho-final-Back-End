import { Module } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [ClimaService],
  // outros módulos usem o serviço  
  exports: [ClimaService],
})
export class ClimaModule {}
