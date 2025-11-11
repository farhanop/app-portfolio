import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<import("./entities/document.entity").Document>;
    findAll(): Promise<import("./entities/document.entity").Document[]>;
    findOne(id: string): Promise<import("./entities/document.entity").Document | null>;
}
