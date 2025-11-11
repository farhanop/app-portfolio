import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Import ini
import { OrgPositionsService } from './org-positions.service';
import { OrgPositionsController } from './org-positions.controller';
import { OrgPosition } from './entities/org-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgPosition])],
  controllers: [OrgPositionsController],
  providers: [OrgPositionsService],
})
export class OrgPositionsModule {}
