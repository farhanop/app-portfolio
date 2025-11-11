import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

export enum OrgType {
  ROOT = 'root', // Warek 2
  BIRO = 'biro', // BAUK / BPT
  BAGIAN = 'bagian', // Bagian Sapras, dll
  JABATAN = 'jabatan', // Kabag, Kasie
  STAFF = 'staff', // Staff biasa
}

@Entity('org_positions')
@Tree('closure-table') // Tipe struktur tree yang efisien untuk read
export class OrgPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nama Jabatan/Unit (misal: "Kepala Biro BAUK")

  @Column({ type: 'enum', enum: OrgType })
  type: OrgType;

  // --- Data Pejabat (Boleh kosong jika ini cuma nama unit) ---
  @Column({ nullable: true })
  officialName: string; // Nama lengkap pejabat

  @Column({ nullable: true })
  nip: string;

  @Column({ type: 'text', nullable: true })
  bio: string; // Profil singkat untuk modal pop-up

  @Column({ nullable: true })
  photoPath: string; // Path foto profil
  // ---------------------------------------------------------

  @Column({ default: 1 })
  sortOrder: number; // Untuk mengatur urutan tampilan

  // RELASI SELF-REFERENCING (HIERARKI)
  @TreeChildren()
  children: OrgPosition[];

  @TreeParent()
  parent: OrgPosition;
}
