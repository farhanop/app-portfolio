import { Module } from '@nestjs/common';
import { ExternalLinksService } from './external-links.service';
import { ExternalLinksController } from './external-links.controller';

@Module({
  controllers: [ExternalLinksController],
  providers: [ExternalLinksService],
})
export class ExternalLinksModule {}
