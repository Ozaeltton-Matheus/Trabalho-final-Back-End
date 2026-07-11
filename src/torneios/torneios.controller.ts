import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TorneiosService } from './torneios.service';
import { CreateTorneioDto } from './dto/create-torneio.dto';
import { UpdateTorneioDto } from './dto/update-torneio.dto';

@Controller('torneios')
export class TorneiosController {
  constructor(private readonly torneiosService: TorneiosService) {}

  @Post()
  create(@Body() createTorneioDto: CreateTorneioDto) {
    return this.torneiosService.create(createTorneioDto);
  }

  @Get()
  findAll() {
    return this.torneiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torneiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorneioDto: UpdateTorneioDto) {
    return this.torneiosService.update(+id, updateTorneioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torneiosService.remove(+id);
  }
}
