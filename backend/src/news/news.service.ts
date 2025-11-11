import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import slugify from 'slugify';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(
    createNewsDto: CreateNewsDto,
    file: Express.Multer.File,
    userId: number,
  ) {
    const slug = slugify(createNewsDto.title, { lower: true, strict: true });

    const newNews = this.newsRepository.create({
      ...createNewsDto,
      slug: `${slug}-${Date.now()}`,
      thumbnailPath: file ? file.filename : undefined,
      author: { id: userId },
    });

    return this.newsRepository.save(newNews);
  }

  // LIST BERITA DENGAN PAGINATION
  findAll(page: number = 1, limit: number = 10) {
    return this.newsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
      relations: ['author'], // ambil penulis
      select: { author: { id: true, fullName: true } }, // tapi cuma nama & id
    });
  }

  // CARI BERITA BY SLUG ATAU ID
  async findOne(term: string | number) {
    const whereClause =
      typeof term === 'number' ? { id: term } : { slug: term };

    const news = await this.newsRepository.findOne({
      where: whereClause,
      relations: ['author'],
    });

    if (!news) throw new NotFoundException('Berita tidak ditemukan');
    return news;
  }

  // UPDATE BERITA
  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    file?: Express.Multer.File,
  ) {
    // 1. Cari berita lama
    const existingNews = await this.findOne(id);

    // 2. Siapkan data yang akan diupdate
    const updatedData: Partial<News> = { ...updateNewsDto };

    // 3. Update slug jika judul berubah
    if (updateNewsDto.title) {
      updatedData.slug = `${slugify(updateNewsDto.title, { lower: true, strict: true })}-${Date.now()}`;
    }

    // 4. Jika ada file baru
    if (file) {
      if (existingNews.thumbnailPath) {
        try {
          fs.unlinkSync(
            join(
              process.cwd(),
              'uploads/news-thumbs',
              existingNews.thumbnailPath,
            ),
          );
        } catch (err) {
          console.warn('Gagal menghapus file lama:', err);
        }
      }
      updatedData.thumbnailPath = file.filename;
    }

    // 5. Simpan perubahan
    await this.newsRepository.update(id, updatedData);
    return this.findOne(id);
  }

  // DELETE BERITA (opsional, bisa ditambahkan)
  async remove(id: number) {
    const news = await this.findOne(id);
    if (news.thumbnailPath) {
      try {
        fs.unlinkSync(
          join(process.cwd(), 'uploads/news-thumbs', news.thumbnailPath),
        );
      } catch (err) {
        console.warn('Gagal menghapus file thumbnail:', err);
      }
    }
    return this.newsRepository.delete(id);
  }
}
