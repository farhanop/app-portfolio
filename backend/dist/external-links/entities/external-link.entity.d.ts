import { BiroType } from '../../biro-profiles/entities/biro-profile.entity';
export declare class ExternalLink {
    id: number;
    title: string;
    url: string;
    iconIdentifier: string;
    relatedBiro: BiroType;
    isActive: boolean;
}
