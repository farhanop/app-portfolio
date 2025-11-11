import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
export declare class NewsService {
    private newsRepository;
    constructor(newsRepository: Repository<News>);
    create(createNewsDto: CreateNewsDto, file: Express.Multer.File, userId: number): Promise<News>;
    findAll(page?: number, limit?: number): Promise<[News[], number]>;
    findOne(term: string | number): Promise<News>;
    update(id: number, updateNewsDto: UpdateNewsDto, file?: Express.Multer.File): Promise<News>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
