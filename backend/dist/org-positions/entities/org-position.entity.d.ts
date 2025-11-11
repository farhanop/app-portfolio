export declare enum OrgType {
    ROOT = "root",
    BIRO = "biro",
    BAGIAN = "bagian",
    JABATAN = "jabatan",
    STAFF = "staff"
}
export declare class OrgPosition {
    id: number;
    name: string;
    type: OrgType;
    officialName: string;
    nip: string;
    bio: string;
    photoPath: string;
    sortOrder: number;
    children: OrgPosition[];
    parent: OrgPosition;
}
