import { Injectable } from '@nestjs/common';
import { Partidas } from './entities/partidas.entity';

@Injectable()
export class PartidasService {
    private partidas: Partidas[] = [];
}
