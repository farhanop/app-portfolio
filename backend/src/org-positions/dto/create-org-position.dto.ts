import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { OrgType } from '../entities/org-position.entity';

export class CreateOrgPositionDto {
  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(OrgType)
  type: OrgType;

  @IsString()
  @IsOptional()
  officialName: string;

  @IsString()
  @IsOptional()
  nip: string;

  @IsString()
  @IsOptional()
  bio: string;
}
