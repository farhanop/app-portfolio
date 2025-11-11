import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { GalleryImage } from './gallery-image.entity';

@Entity('galleries')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  coverImagePath: string; // Foto sampul album

  // RELASI KE FOTO-FOTO
  @OneToMany(() => GalleryImage, (image) => image.gallery, { cascade: true })
  images: GalleryImage[];

  @CreateDateColumn()
  createdAt: Date;
}
