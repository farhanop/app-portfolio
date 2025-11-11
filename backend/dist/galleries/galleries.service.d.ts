import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { GalleryImage } from './entities/gallery-image.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleriesService {
    private galleryRepo;
    private imageRepo;
    constructor(galleryRepo: Repository<Gallery>, imageRepo: Repository<GalleryImage>);
    create(createGalleryDto: CreateGalleryDto, files: Array<Express.Multer.File>): Promise<Gallery>;
    findAll(): Promise<Gallery[]>;
    findOne(id: number): Promise<Gallery>;
    update(id: number, updateGalleryDto: UpdateGalleryDto): Promise<Gallery>;
    addPhotos(id: number, files: Array<Express.Multer.File>): Promise<Gallery>;
    removePhoto(photoId: number): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
