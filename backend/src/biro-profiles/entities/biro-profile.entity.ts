import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export enum BiroType {
  BAUK = 'BAUK',
  BPT = 'BPT',
}

@Entity('biro_profiles')
export class BiroProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BiroType, unique: true })
  biroType: BiroType; // Hanya boleh ada 1 profil untuk BAUK, 1 untuk BPT

  @Column({ type: 'text', nullable: true })
  description: string; // Deskripsi singkat biro

  @Column({ type: 'text', nullable: true })
  visiMisi: string; // Rich text visi misi khusus biro

  @Column({ type: 'text', nullable: true })
  tupoksi: string; // Tugas Pokok & Fungsi

  @UpdateDateColumn()
  updatedAt: Date;
}
