import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
export declare class DocumentsService {
    private docRepository;
    constructor(docRepository: Repository<Document>);
    create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<Document>;
    findAll(): Promise<Document[]>;
    findOne(id: number): Promise<Document | null>;
}
