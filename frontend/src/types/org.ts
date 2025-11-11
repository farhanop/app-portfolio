export type OrgType = "root" | "biro" | "bagian" | "jabatan" | "staff";

export interface OrgNode {
  id: number;
  name: string;
  type: OrgType;
  officialName?: string;
  nip?: string;
  bio?: string;
  photoPath?: string;
  children?: OrgNode[];
}
