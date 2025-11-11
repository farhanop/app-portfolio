import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrgPositionsService } from './org-positions.service';
import { CreateOrgPositionDto } from './dto/create-org-position.dto';

@Controller('org-positions')
export class OrgPositionsController {
  constructor(private readonly orgPositionsService: OrgPositionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: CreateOrgPositionDto) {
    return this.orgPositionsService.create(createDto);
  }

  @Get('tree') // Endpoint: GET /org-positions/tree
  getTree() {
    return this.orgPositionsService.getTree();
  }

  @Get('tree/:id') // Endpoint: GET /org-positions/tree/1
  getTreeBranch(@Param('id') id: string) {
    return this.orgPositionsService.getTreeBranch(+id);
  }
}
