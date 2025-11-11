import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { GalleryImage } from './entities/gallery-image.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepo: Repository<Gallery>,
    @InjectRepository(GalleryImage)
    private imageRepo: Repository<GalleryImage>,
  ) {}

  // CREATE
  async create(
    createGalleryDto: CreateGalleryDto,
    files: Array<Express.Multer.File>,
  ) {
    const newGallery = this.galleryRepo.create({
      ...createGalleryDto,
      coverImagePath: files && files.length > 0 ? files[0].filename : undefined,
    });
    const savedGallery = await this.galleryRepo.save(newGallery);

    if (files && files.length > 0) {
      const images = files.map((file) => {
        return this.imageRepo.create({
          filePath: file.filename,
          gallery: savedGallery,
        });
      });
      await this.imageRepo.save(images);
    }
    return this.findOne(savedGallery.id);
  }

  // READ ALL
  findAll() {
    return this.galleryRepo.find({
      relations: ['images'],
      order: { createdAt: 'DESC' },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const gallery = await this.galleryRepo.findOne({
      where: { id },
      relations: ['images'], // Pastikan 'images' diambil
    });
    if (!gallery) throw new NotFoundException('Album tidak ditemukan');
    return gallery;
  }

  // UPDATE INFO ALBUM (Judul/Deskripsi)
  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    await this.galleryRepo.update(id, updateGalleryDto);
    return this.findOne(id);
  }

  // TAMBAH FOTO BARU KE ALBUM YANG ADA
  async addPhotos(id: number, files: Array<Express.Multer.File>) {
    const gallery = await this.findOne(id);
    if (!files || files.length === 0) return gallery;

    const newImages = files.map((file) => {
      return this.imageRepo.create({
        filePath: file.filename,
        gallery: gallery,
      });
    });
    await this.imageRepo.save(newImages);

    // Update cover image jika album belum punya cover
    if (!gallery.coverImagePath && newImages.length > 0) {
      await this.galleryRepo.update(id, {
        coverImagePath: newImages[0].filePath,
      });
    }

    return this.findOne(id);
  }

  // HAPUS SATU FOTO DARI ALBUM
  async removePhoto(photoId: number) {
    const photo = await this.imageRepo.findOne({
      where: { id: photoId },
      relations: ['gallery'],
    });
    if (!photo) throw new NotFoundException('Foto tidak ditemukan');

    // Hapus file fisik dari server
    try {
      fs.unlinkSync(join(process.cwd(), 'uploads/gallery', photo.filePath));
    } catch (err) {
      console.warn('Gagal menghapus file foto:', err);
    }

    // Cek apakah ini cover foto
    if (photo.gallery.coverImagePath === photo.filePath) {
      // Cari foto lain untuk dijadikan cover
      const otherPhotos = await this.imageRepo.find({
        where: { gallery: { id: photo.gallery.id } },
        order: { createdAt: 'ASC' },
      });
      // Set cover baru jika ada foto lain, jika tidak set null
      // Set cover new jika ada foto lain, jika tidak set undefined
      const newCover =
        otherPhotos.length > 1 ? otherPhotos[1].filePath : undefined; // <-- UBAH KE UNDEFINED
      await this.galleryRepo.update(photo.gallery.id, {
        coverImagePath: newCover,
      });
    }

    await this.imageRepo.delete(photoId);
    return { message: 'Foto berhasil dihapus' };
  }

  // HAPUS SELURUH ALBUM
  async remove(id: number) {
    const gallery = await this.findOne(id);

    // Hapus semua file foto terkait
    gallery.images?.forEach((img) => {
      try {
        fs.unlinkSync(join(process.cwd(), 'uploads/gallery', img.filePath));
      } catch (err) {
        console.warn('Gagal menghapus file foto:', err);
      }
    });

    await this.galleryRepo.delete(id);
    return { message: 'Album berhasil dihapus' };
  }
}
