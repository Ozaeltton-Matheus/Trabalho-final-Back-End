import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { ClimaService } from './clima.service';
import { ClimaController } from './clima.controller';
@Module({
    imports: [HttpModule],
    providers: [ClimaService],
    controllers: [ClimaController]
})
export class ClimaModule {
    
}
