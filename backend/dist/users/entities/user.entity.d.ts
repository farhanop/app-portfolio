export declare enum UserRole {
    SUPERADMIN = "superadmin",
    ADMIN_BAUK = "admin_bauk",
    ADMIN_BPT = "admin_bpt"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    fullName: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
