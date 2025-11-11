import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

// Fungsi untuk validasi tipe file (hanya gambar)
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Hanya file gambar yang diperbolehkan!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

// Fungsi untuk validasi tipe dokumen (PDF/DOCX)
export const docFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
    return callback(
      new HttpException(
        'Hanya file PDF atau DOC/DOCX yang diperbolehkan!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

// Fungsi untuk edit nama file saat disimpan agar unik
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
