import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { DocCategory } from '../entities/document.entity';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(DocCategory)
  category: DocCategory;
}
