export declare enum BiroType {
    BAUK = "BAUK",
    BPT = "BPT"
}
export declare class BiroProfile {
    id: number;
    biroType: BiroType;
    description: string;
    visiMisi: string;
    tupoksi: string;
    updatedAt: Date;
}
