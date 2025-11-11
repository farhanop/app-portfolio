import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { BiroType } from '../../biro-profiles/entities/biro-profile.entity';

export class CreateExternalLinkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  iconIdentifier: string;

  @IsEnum(BiroType)
  @IsOptional()
  relatedBiro: BiroType;
}
