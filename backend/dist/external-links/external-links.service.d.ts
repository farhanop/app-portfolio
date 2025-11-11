import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';
export declare class ExternalLinksService {
    create(createExternalLinkDto: CreateExternalLinkDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExternalLinkDto: UpdateExternalLinkDto): string;
    remove(id: number): string;
}
