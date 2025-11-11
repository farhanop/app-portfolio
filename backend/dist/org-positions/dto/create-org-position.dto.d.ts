import { OrgType } from '../entities/org-position.entity';
export declare class CreateOrgPositionDto {
    parentId: number;
    name: string;
    type: OrgType;
    officialName: string;
    nip: string;
    bio: string;
}
