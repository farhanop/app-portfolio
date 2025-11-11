import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private docRepository: Repository<Document>,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new NotFoundException('File dokumen belum di-upload');
    }

    const newDoc = this.docRepository.create({
      ...createDocumentDto,
      filePath: file.filename,
      fileSize: file.size, // Simpan ukuran file
    });

    return this.docRepository.save(newDoc);
  }

  findAll() {
    return this.docRepository.find({
      order: { uploadedAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.docRepository.findOneBy({ id });
  }

  // Nanti kita buat logika update dan delete
}
