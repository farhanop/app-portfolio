export interface GalleryImage {
  id: number;
  filePath: string;
  caption?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  coverImagePath?: string;
  createdAt: string;
  images?: GalleryImage[]; // Optional karena di list mungkin tidak diload semua
}
