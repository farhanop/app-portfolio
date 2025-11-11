import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { Gallery } from './entities/gallery.entity';
import { GalleryImage } from './entities/gallery-image.entity';
import { editFileName, imageFileFilter } from '../common/config/multer.config';

@Module({
  imports: [
    // DAFTARKAN DUA ENTITY SEKALIGUS:
    TypeOrmModule.forFeature([Gallery, GalleryImage]),

    // Konfigurasi upload untuk Galeri
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/gallery', // Folder tujuan
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [GalleriesController],
  providers: [GalleriesService],
})
export class GalleriesModule {}
