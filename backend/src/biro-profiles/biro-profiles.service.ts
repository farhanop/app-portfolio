import { Injectable } from '@nestjs/common';
import { CreateBiroProfileDto } from './dto/create-biro-profile.dto';
import { UpdateBiroProfileDto } from './dto/update-biro-profile.dto';

@Injectable()
export class BiroProfilesService {
  create(createBiroProfileDto: CreateBiroProfileDto) {
    return 'This action adds a new biroProfile';
  }

  findAll() {
    return `This action returns all biroProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biroProfile`;
  }

  update(id: number, updateBiroProfileDto: UpdateBiroProfileDto) {
    return `This action updates a #${id} biroProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} biroProfile`;
  }
}
