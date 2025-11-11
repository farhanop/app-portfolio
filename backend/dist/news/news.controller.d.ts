import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto, file: Express.Multer.File, req: any): Promise<import("./entities/news.entity").News>;
    findAll(page?: string, limit?: string): Promise<[import("./entities/news.entity").News[], number]>;
    findOne(term: string): Promise<import("./entities/news.entity").News>;
    update(id: number, updateNewsDto: UpdateNewsDto, file?: Express.Multer.File): Promise<import("./entities/news.entity").News>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
