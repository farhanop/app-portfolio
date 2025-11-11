import { CreateBiroProfileDto } from './dto/create-biro-profile.dto';
import { UpdateBiroProfileDto } from './dto/update-biro-profile.dto';
export declare class BiroProfilesService {
    create(createBiroProfileDto: CreateBiroProfileDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBiroProfileDto: UpdateBiroProfileDto): string;
    remove(id: number): string;
}
