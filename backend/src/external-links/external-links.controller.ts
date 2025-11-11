import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExternalLinksService } from './external-links.service';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';

@Controller('external-links')
export class ExternalLinksController {
  constructor(private readonly externalLinksService: ExternalLinksService) {}

  @Post()
  create(@Body() createExternalLinkDto: CreateExternalLinkDto) {
    return this.externalLinksService.create(createExternalLinkDto);
  }

  @Get()
  findAll() {
    return this.externalLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExternalLinkDto: UpdateExternalLinkDto) {
    return this.externalLinksService.update(+id, updateExternalLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalLinksService.remove(+id);
  }
}
