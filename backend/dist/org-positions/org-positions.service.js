"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgPositionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const org_position_entity_1 = require("./entities/org-position.entity");
let OrgPositionsService = class OrgPositionsService {
    orgRepo;
    constructor(orgRepo) {
        this.orgRepo = orgRepo;
    }
    async create(createDto) {
        const { parentId, ...rest } = createDto;
        let parentNode = undefined;
        if (parentId) {
            const foundParent = await this.orgRepo.findOneBy({ id: parentId });
            if (!foundParent) {
                throw new common_1.NotFoundException('Data Atasan (Parent) tidak ditemukan');
            }
            parentNode = foundParent;
        }
        const newPosition = this.orgRepo.create({
            ...rest,
            parent: parentNode,
        });
        return this.orgRepo.save(newPosition);
    }
    async getTree() {
        return this.orgRepo.findTrees();
    }
    async getTreeBranch(id) {
        const parent = await this.orgRepo.findOneBy({ id });
        if (!parent)
            throw new common_1.NotFoundException('Data tidak ditemukan');
        return this.orgRepo.findDescendantsTree(parent);
    }
};
exports.OrgPositionsService = OrgPositionsService;
exports.OrgPositionsService = OrgPositionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(org_position_entity_1.OrgPosition)),
    __metadata("design:paramtypes", [typeorm_2.TreeRepository])
], OrgPositionsService);
//# sourceMappingURL=org-positions.service.js.map