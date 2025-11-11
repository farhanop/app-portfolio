import { Gallery } from './gallery.entity';
export declare class GalleryImage {
    id: number;
    filePath: string;
    caption: string;
    gallery: Gallery;
    createdAt: Date;
}
