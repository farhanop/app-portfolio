import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum DocCategory {
  SK = 'sk_rektor',
  EDARAN = 'surat_edaran',
  PENGUMUMAN = 'pengumuman_mhs',
  LAINNYA = 'lainnya',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  filePath: string; // Nama file fisik di server

  @Column()
  fileSize: number; // Ukuran file dalam bytes (untuk info user sebelum download)

  @Column({
    type: 'enum',
    enum: DocCategory,
    default: DocCategory.PENGUMUMAN,
  })
  category: DocCategory;

  @Column({ default: true })
  isPublic: boolean; // Apakah bisa diakses mahasiswa atau internal saja

  @CreateDateColumn()
  uploadedAt: Date;
}
