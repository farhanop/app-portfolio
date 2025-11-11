import { PartialType } from '@nestjs/mapped-types';
import { CreateBiroProfileDto } from './create-biro-profile.dto';

export class UpdateBiroProfileDto extends PartialType(CreateBiroProfileDto) {}
