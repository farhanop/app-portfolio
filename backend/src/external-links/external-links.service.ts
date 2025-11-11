import { Injectable } from '@nestjs/common';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';

@Injectable()
export class ExternalLinksService {
  create(createExternalLinkDto: CreateExternalLinkDto) {
    return 'This action adds a new externalLink';
  }

  findAll() {
    return `This action returns all externalLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externalLink`;
  }

  update(id: number, updateExternalLinkDto: UpdateExternalLinkDto) {
    return `This action updates a #${id} externalLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalLink`;
  }
}
