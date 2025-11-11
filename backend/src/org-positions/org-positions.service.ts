import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { OrgPosition } from './entities/org-position.entity';
import { CreateOrgPositionDto } from './dto/create-org-position.dto';

@Injectable()
export class OrgPositionsService {
  constructor(
    @InjectRepository(OrgPosition)
    private orgRepo: TreeRepository<OrgPosition>,
  ) {}

  async create(createDto: CreateOrgPositionDto) {
    const { parentId, ...rest } = createDto;

    // PERBAIKAN 1: Tentukan tipe variabel secara eksplisit
    let parentNode: OrgPosition | undefined = undefined; // Gunakan 'undefined' sebagai nilai awal

    if (parentId) {
      // Gunakan 'await' dan tampung hasilnya
      const foundParent = await this.orgRepo.findOneBy({ id: parentId });
      if (!foundParent) {
        throw new NotFoundException('Data Atasan (Parent) tidak ditemukan');
      }
      // Jika ketemu, baru masukkan ke variabel parentNode
      parentNode = foundParent;
    }

    const newPosition = this.orgRepo.create({
      ...rest,
      // PERBAIKAN 2: parentNode sekarang isinya OrgPosition atau undefined (aman)
      parent: parentNode,
    });

    return this.orgRepo.save(newPosition);
  }

  // API untuk mengambil seluruh struktur pohon
  async getTree() {
    // findTrees() otomatis mengambil seluruh hirarki
    return this.orgRepo.findTrees();
  }

  // API untuk mengambil satu cabang (misal: semua bawahan BAUK)
  async getTreeBranch(id: number) {
    const parent = await this.orgRepo.findOneBy({ id });
    if (!parent) throw new NotFoundException('Data tidak ditemukan');

    // findDescendantsTree() mengambil 1 node + semua anak cucunya
    return this.orgRepo.findDescendantsTree(parent);
  }
}
