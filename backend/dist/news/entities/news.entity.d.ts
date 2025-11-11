import { User } from '../../users/entities/user.entity';
export declare enum NewsStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class News {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnailPath: string;
    status: NewsStatus;
    views: number;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
