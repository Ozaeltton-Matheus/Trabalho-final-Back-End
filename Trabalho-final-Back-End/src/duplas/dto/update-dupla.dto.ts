import { PartialType } from '@nestjs/mapped-types';
import { CreateDuplaDto } from './create-dupla.dto';

export class UpdateDuplaDto extends PartialType(CreateDuplaDto) {}
