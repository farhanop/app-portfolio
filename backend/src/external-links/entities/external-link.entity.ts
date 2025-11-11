import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BiroType } from '../../biro-profiles/entities/biro-profile.entity';

@Entity('external_links')
export class ExternalLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Misal: "E-Aset System"

  @Column()
  url: string;

  @Column({ nullable: true })
  iconIdentifier: string; // String untuk nama icon (misal: 'fa-server')

  @Column({
    type: 'enum',
    enum: BiroType,
    nullable: true,
  })
  relatedBiro: BiroType; // Link ini punya BAUK atau BPT? (Null = punya umum Warek 2)

  @Column({ default: true })
  isActive: boolean;
}
