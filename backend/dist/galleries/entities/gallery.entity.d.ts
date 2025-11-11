import { GalleryImage } from './gallery-image.entity';
export declare class Gallery {
    id: number;
    title: string;
    description: string;
    coverImagePath: string;
    images: GalleryImage[];
    createdAt: Date;
}
