import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // Pastikan sudah install bcryptjs & @types/bcryptjs
import { User, UserRole } from './users/entities/user.entity';
import {
  OrgPosition,
  OrgType,
} from './org-positions/entities/org-position.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OrgPosition)
    private orgRepository: Repository<OrgPosition>,
  ) {}

  // Fungsi ini otomatis jalan saat aplikasi NestJS baru nyala
  async onApplicationBootstrap() {
    await this.seedSuperAdmin();
    await this.seedRootOrg();
  }

  private async seedSuperAdmin() {
    const adminExists = await this.userRepository.findOneBy({
      username: 'admin',
    });
    if (!adminExists) {
      this.logger.log('🌱 Seeding Super Admin...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('bpt@uigm', salt); // Password default

      const superAdmin = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
        fullName: 'Super Administrator',
        role: UserRole.SUPERADMIN,
      });
      await this.userRepository.save(superAdmin);
      this.logger.log('✅ Super Admin created! (User: admin / Pass: bpt@uigm)');
    }
  }

  private async seedRootOrg() {
    const rootExists = await this.orgRepository.findOneBy({
      type: OrgType.ROOT,
    });
    if (!rootExists) {
      this.logger.log('🌱 Seeding Root Organization (Warek II)...');
      const rootNode = this.orgRepository.create({
        name: '',
        type: OrgType.ROOT,
        officialName: '',
        sortOrder: 0,
      });
      await this.orgRepository.save(rootNode);
      this.logger.log('✅ Root Org created!');
    }
  }

  getHello(): string {
    return 'Warek 2 Portfolio API is Running!';
  }
}
