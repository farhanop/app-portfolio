import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { OrgPosition } from './org-positions/entities/org-position.entity';
export declare class AppService implements OnApplicationBootstrap {
    private userRepository;
    private orgRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, orgRepository: Repository<OrgPosition>);
    onApplicationBootstrap(): Promise<void>;
    private seedSuperAdmin;
    private seedRootOrg;
    getHello(): string;
}
