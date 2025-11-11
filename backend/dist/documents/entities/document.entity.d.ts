export declare enum DocCategory {
    SK = "sk_rektor",
    EDARAN = "surat_edaran",
    PENGUMUMAN = "pengumuman_mhs",
    LAINNYA = "lainnya"
}
export declare class Document {
    id: number;
    title: string;
    description: string;
    filePath: string;
    fileSize: number;
    category: DocCategory;
    isPublic: boolean;
    uploadedAt: Date;
}
