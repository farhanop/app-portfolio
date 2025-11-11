import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleriesController {
    private readonly galleriesService;
    constructor(galleriesService: GalleriesService);
    create(createGalleryDto: CreateGalleryDto, files: Array<Express.Multer.File>): Promise<import("./entities/gallery.entity").Gallery>;
    findAll(): Promise<import("./entities/gallery.entity").Gallery[]>;
    findOne(id: number): Promise<import("./entities/gallery.entity").Gallery>;
    update(id: number, updateGalleryDto: UpdateGalleryDto): Promise<import("./entities/gallery.entity").Gallery>;
    addPhotos(id: number, files: Array<Express.Multer.File>): Promise<import("./entities/gallery.entity").Gallery>;
    removePhoto(photoId: number): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
