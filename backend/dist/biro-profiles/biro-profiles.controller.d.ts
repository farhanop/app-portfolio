import { BiroProfilesService } from './biro-profiles.service';
import { CreateBiroProfileDto } from './dto/create-biro-profile.dto';
import { UpdateBiroProfileDto } from './dto/update-biro-profile.dto';
export declare class BiroProfilesController {
    private readonly biroProfilesService;
    constructor(biroProfilesService: BiroProfilesService);
    create(createBiroProfileDto: CreateBiroProfileDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBiroProfileDto: UpdateBiroProfileDto): string;
    remove(id: string): string;
}
