import { OrgPositionsService } from './org-positions.service';
import { CreateOrgPositionDto } from './dto/create-org-position.dto';
export declare class OrgPositionsController {
    private readonly orgPositionsService;
    constructor(orgPositionsService: OrgPositionsService);
    create(createDto: CreateOrgPositionDto): Promise<import("./entities/org-position.entity").OrgPosition>;
    getTree(): Promise<import("./entities/org-position.entity").OrgPosition[]>;
    getTreeBranch(id: string): Promise<import("./entities/org-position.entity").OrgPosition>;
}
