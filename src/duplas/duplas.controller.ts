import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DuplasService } from './duplas.service';
import { CreateDuplaDto } from './dto/create-dupla.dto';
import { UpdateDuplaDto } from './dto/update-dupla.dto';

@Controller('duplas')
export class DuplasController {
  constructor(private readonly duplasService: DuplasService) {}

  @Post()
  create(@Body() createDuplaDto: CreateDuplaDto) {
    return this.duplasService.create(createDuplaDto);
  }

  @Get()
  findAll() {
    return this.duplasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.duplasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDuplaDto: UpdateDuplaDto) {
    return this.duplasService.update(+id, updateDuplaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duplasService.remove(+id);
  }
}
