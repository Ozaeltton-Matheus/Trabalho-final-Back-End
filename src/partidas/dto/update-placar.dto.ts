import { IsInt, IsNotEmpty } from 'class-validator';
export class UpdatePlacarDto {
    @IsInt()
    @IsNotEmpty()
    placarDuplaA: number;
    @IsInt()
    @IsNotEmpty()
    placarDuplaB: number;
}