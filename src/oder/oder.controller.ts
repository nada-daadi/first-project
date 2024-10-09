import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OderService } from './oder.service';
import { CreateOderDto } from './dto/create-oder.dto';
import { UpdateOderDto } from './dto/update-oder.dto';

@Controller('oder')
export class OderController {
  constructor(private readonly oderService: OderService) {}

  @Post()
  create(@Body() createOderDto: CreateOderDto) {
    return this.oderService.create(createOderDto);
  }

  @Get()
  findAll() {
    return this.oderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.oderService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOderDto: UpdateOderDto) {
    return this.oderService.update(id, updateOderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderService.remove(id);
  }
}
