import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiroProfilesService } from './biro-profiles.service';
import { CreateBiroProfileDto } from './dto/create-biro-profile.dto';
import { UpdateBiroProfileDto } from './dto/update-biro-profile.dto';

@Controller('biro-profiles')
export class BiroProfilesController {
  constructor(private readonly biroProfilesService: BiroProfilesService) {}

  @Post()
  create(@Body() createBiroProfileDto: CreateBiroProfileDto) {
    return this.biroProfilesService.create(createBiroProfileDto);
  }

  @Get()
  findAll() {
    return this.biroProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biroProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiroProfileDto: UpdateBiroProfileDto) {
    return this.biroProfilesService.update(+id, updateBiroProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biroProfilesService.remove(+id);
  }
}
