// backend\src\news\entities\news.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NewsStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string; // Untuk URL yang cantik (misal: berita-terbaru-hari-ini)

  @Column({ type: 'text' })
  content: string; // Isi berita (HTML dari rich text editor)

  @Column({ nullable: true })
  thumbnailPath: string; // Foto utama berita

  @Column({
    type: 'enum',
    enum: NewsStatus,
    default: NewsStatus.DRAFT,
  })
  status: NewsStatus;

  @Column({ type: 'int', default: 0 })
  views: number; // Hitung jumlah pembaca

  // RELASI KE USER (PENULIS)
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
