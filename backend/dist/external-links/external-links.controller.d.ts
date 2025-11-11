import { ExternalLinksService } from './external-links.service';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';
export declare class ExternalLinksController {
    private readonly externalLinksService;
    constructor(externalLinksService: ExternalLinksService);
    create(createExternalLinkDto: CreateExternalLinkDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateExternalLinkDto: UpdateExternalLinkDto): string;
    remove(id: string): string;
}
