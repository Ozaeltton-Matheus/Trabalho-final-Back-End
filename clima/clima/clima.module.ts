import { Module } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  providers: [ClimaService],
  // outros módulos usem o serviço  
  exports: [ClimaService],
})
export class ClimaModule {}
