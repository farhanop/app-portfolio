import { TreeRepository } from 'typeorm';
import { OrgPosition } from './entities/org-position.entity';
import { CreateOrgPositionDto } from './dto/create-org-position.dto';
export declare class OrgPositionsService {
    private orgRepo;
    constructor(orgRepo: TreeRepository<OrgPosition>);
    create(createDto: CreateOrgPositionDto): Promise<OrgPosition>;
    getTree(): Promise<OrgPosition[]>;
    getTreeBranch(id: number): Promise<OrgPosition>;
}
