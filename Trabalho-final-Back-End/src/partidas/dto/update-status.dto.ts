import { IsEnum } from 'class-validator';

export enum StatusPartida {
  AGENDADA = 'AGENDADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADA = 'FINALIZADA',
}

export class UpdateStatusDto {
  @IsEnum(StatusPartida)
  status: StatusPartida;
}
