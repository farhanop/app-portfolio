import { BiroType } from '../../biro-profiles/entities/biro-profile.entity';
export declare class CreateExternalLinkDto {
    title: string;
    url: string;
    iconIdentifier: string;
    relatedBiro: BiroType;
}
