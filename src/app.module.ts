import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TorneiosModule } from './torneios/torneios.module';

@Module({
  imports: [TorneiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
