export type DocCategory =
  | "sk_rektor"
  | "surat_edaran"
  | "pengumuman_mhs"
  | "lainnya";

export interface DocumentItem {
  id: number;
  title: string;
  description?: string;
  filePath: string;
  fileSize: number;
  category: DocCategory;
  isPublic: boolean;
  uploadedAt: string;
}
