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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gallery_entity_1 = require("./entities/gallery.entity");
const gallery_image_entity_1 = require("./entities/gallery-image.entity");
const fs = __importStar(require("fs"));
const path_1 = require("path");
let GalleriesService = class GalleriesService {
    galleryRepo;
    imageRepo;
    constructor(galleryRepo, imageRepo) {
        this.galleryRepo = galleryRepo;
        this.imageRepo = imageRepo;
    }
    async create(createGalleryDto, files) {
        const newGallery = this.galleryRepo.create({
            ...createGalleryDto,
            coverImagePath: files && files.length > 0 ? files[0].filename : undefined,
        });
        const savedGallery = await this.galleryRepo.save(newGallery);
        if (files && files.length > 0) {
            const images = files.map((file) => {
                return this.imageRepo.create({
                    filePath: file.filename,
                    gallery: savedGallery,
                });
            });
            await this.imageRepo.save(images);
        }
        return this.findOne(savedGallery.id);
    }
    findAll() {
        return this.galleryRepo.find({
            relations: ['images'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const gallery = await this.galleryRepo.findOne({
            where: { id },
            relations: ['images'],
        });
        if (!gallery)
            throw new common_1.NotFoundException('Album tidak ditemukan');
        return gallery;
    }
    async update(id, updateGalleryDto) {
        await this.galleryRepo.update(id, updateGalleryDto);
        return this.findOne(id);
    }
    async addPhotos(id, files) {
        const gallery = await this.findOne(id);
        if (!files || files.length === 0)
            return gallery;
        const newImages = files.map((file) => {
            return this.imageRepo.create({
                filePath: file.filename,
                gallery: gallery,
            });
        });
        await this.imageRepo.save(newImages);
        if (!gallery.coverImagePath && newImages.length > 0) {
            await this.galleryRepo.update(id, {
                coverImagePath: newImages[0].filePath,
            });
        }
        return this.findOne(id);
    }
    async removePhoto(photoId) {
        const photo = await this.imageRepo.findOne({
            where: { id: photoId },
            relations: ['gallery'],
        });
        if (!photo)
            throw new common_1.NotFoundException('Foto tidak ditemukan');
        try {
            fs.unlinkSync((0, path_1.join)(process.cwd(), 'uploads/gallery', photo.filePath));
        }
        catch (err) {
            console.warn('Gagal menghapus file foto:', err);
        }
        if (photo.gallery.coverImagePath === photo.filePath) {
            const otherPhotos = await this.imageRepo.find({
                where: { gallery: { id: photo.gallery.id } },
                order: { createdAt: 'ASC' },
            });
            const newCover = otherPhotos.length > 1 ? otherPhotos[1].filePath : undefined;
            await this.galleryRepo.update(photo.gallery.id, {
                coverImagePath: newCover,
            });
        }
        await this.imageRepo.delete(photoId);
        return { message: 'Foto berhasil dihapus' };
    }
    async remove(id) {
        const gallery = await this.findOne(id);
        gallery.images?.forEach((img) => {
            try {
                fs.unlinkSync((0, path_1.join)(process.cwd(), 'uploads/gallery', img.filePath));
            }
            catch (err) {
                console.warn('Gagal menghapus file foto:', err);
            }
        });
        await this.galleryRepo.delete(id);
        return { message: 'Album berhasil dihapus' };
    }
};
exports.GalleriesService = GalleriesService;
exports.GalleriesService = GalleriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __param(1, (0, typeorm_1.InjectRepository)(gallery_image_entity_1.GalleryImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GalleriesService);
//# sourceMappingURL=galleries.service.js.map