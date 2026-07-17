import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreatePartidaDto {
  @IsInt()
  torneioId: number;

  @IsInt()
  duplaAId: number;

  @IsInt()
  duplaBId: number;

  @IsDateString()
  dataHora: string;

  @IsString()
  local: string;
}