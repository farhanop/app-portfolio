import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  // Buat Album Baru
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FilesInterceptor('photos', 20)) // Maks 20 foto
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.galleriesService.create(createGalleryDto, files);
  }

  // Get Semua Album (Publik)
  @Get()
  findAll() {
    return this.galleriesService.findAll();
  }

  // Get Satu Album (Publik)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.galleriesService.findOne(id);
  }

  // Update Info Album (Judul/Deskripsi)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleriesService.update(id, updateGalleryDto);
  }

  // Tambah Foto ke Album
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/photos')
  @UseInterceptors(FilesInterceptor('photos', 20))
  addPhotos(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.galleriesService.addPhotos(id, files);
  }

  // Hapus Satu Foto dari Album
  @UseGuards(AuthGuard('jwt'))
  @Delete('photos/:photoId')
  removePhoto(@Param('photoId', ParseIntPipe) photoId: number) {
    return this.galleriesService.removePhoto(photoId);
  }

  // Hapus Album
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.galleriesService.remove(id);
  }
}
