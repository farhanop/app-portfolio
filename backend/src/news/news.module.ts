import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { editFileName, imageFileFilter } from '../common/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/news-thumbs',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
