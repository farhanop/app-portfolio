"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./users/entities/user.entity");
const org_position_entity_1 = require("./org-positions/entities/org-position.entity");
let AppService = AppService_1 = class AppService {
    userRepository;
    orgRepository;
    logger = new common_1.Logger(AppService_1.name);
    constructor(userRepository, orgRepository) {
        this.userRepository = userRepository;
        this.orgRepository = orgRepository;
    }
    async onApplicationBootstrap() {
        await this.seedSuperAdmin();
        await this.seedRootOrg();
    }
    async seedSuperAdmin() {
        const adminExists = await this.userRepository.findOneBy({
            username: 'admin',
        });
        if (!adminExists) {
            this.logger.log('🌱 Seeding Super Admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('bpt@uigm', salt);
            const superAdmin = this.userRepository.create({
                username: 'admin',
                password: hashedPassword,
                fullName: 'Super Administrator',
                role: user_entity_1.UserRole.SUPERADMIN,
            });
            await this.userRepository.save(superAdmin);
            this.logger.log('✅ Super Admin created! (User: admin / Pass: bpt@uigm)');
        }
    }
    async seedRootOrg() {
        const rootExists = await this.orgRepository.findOneBy({
            type: org_position_entity_1.OrgType.ROOT,
        });
        if (!rootExists) {
            this.logger.log('🌱 Seeding Root Organization (Warek II)...');
            const rootNode = this.orgRepository.create({
                name: '',
                type: org_position_entity_1.OrgType.ROOT,
                officialName: '',
                sortOrder: 0,
            });
            await this.orgRepository.save(rootNode);
            this.logger.log('✅ Root Org created!');
        }
    }
    getHello() {
        return 'Warek 2 Portfolio API is Running!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(org_position_entity_1.OrgPosition)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map