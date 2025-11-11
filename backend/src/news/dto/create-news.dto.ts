import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { NewsStatus } from '../entities/news.entity';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsEnum(NewsStatus)
  status: NewsStatus;
}
