import { Module } from '@nestjs/common';
import { BiroProfilesService } from './biro-profiles.service';
import { BiroProfilesController } from './biro-profiles.controller';

@Module({
  controllers: [BiroProfilesController],
  providers: [BiroProfilesService],
})
export class BiroProfilesModule {}
