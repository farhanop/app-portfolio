"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const news_entity_1 = require("./entities/news.entity");
const slugify_1 = __importDefault(require("slugify"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
let NewsService = class NewsService {
    newsRepository;
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async create(createNewsDto, file, userId) {
        const slug = (0, slugify_1.default)(createNewsDto.title, { lower: true, strict: true });
        const newNews = this.newsRepository.create({
            ...createNewsDto,
            slug: `${slug}-${Date.now()}`,
            thumbnailPath: file ? file.filename : undefined,
            author: { id: userId },
        });
        return this.newsRepository.save(newNews);
    }
    findAll(page = 1, limit = 10) {
        return this.newsRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
            relations: ['author'],
            select: { author: { id: true, fullName: true } },
        });
    }
    async findOne(term) {
        const whereClause = typeof term === 'number' ? { id: term } : { slug: term };
        const news = await this.newsRepository.findOne({
            where: whereClause,
            relations: ['author'],
        });
        if (!news)
            throw new common_1.NotFoundException('Berita tidak ditemukan');
        return news;
    }
    async update(id, updateNewsDto, file) {
        const existingNews = await this.findOne(id);
        const updatedData = { ...updateNewsDto };
        if (updateNewsDto.title) {
            updatedData.slug = `${(0, slugify_1.default)(updateNewsDto.title, { lower: true, strict: true })}-${Date.now()}`;
        }
        if (file) {
            if (existingNews.thumbnailPath) {
                try {
                    fs.unlinkSync((0, path_1.join)(process.cwd(), 'uploads/news-thumbs', existingNews.thumbnailPath));
                }
                catch (err) {
                    console.warn('Gagal menghapus file lama:', err);
                }
            }
            updatedData.thumbnailPath = file.filename;
        }
        await this.newsRepository.update(id, updatedData);
        return this.findOne(id);
    }
    async remove(id) {
        const news = await this.findOne(id);
        if (news.thumbnailPath) {
            try {
                fs.unlinkSync((0, path_1.join)(process.cwd(), 'uploads/news-thumbs', news.thumbnailPath));
            }
            catch (err) {
                console.warn('Gagal menghapus file thumbnail:', err);
            }
        }
        return this.newsRepository.delete(id);
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsService);
//# sourceMappingURL=news.service.js.map