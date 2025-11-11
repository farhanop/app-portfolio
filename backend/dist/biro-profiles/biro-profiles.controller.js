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
exports.BiroProfilesController = void 0;
const common_1 = require("@nestjs/common");
const biro_profiles_service_1 = require("./biro-profiles.service");
const create_biro_profile_dto_1 = require("./dto/create-biro-profile.dto");
const update_biro_profile_dto_1 = require("./dto/update-biro-profile.dto");
let BiroProfilesController = class BiroProfilesController {
    biroProfilesService;
    constructor(biroProfilesService) {
        this.biroProfilesService = biroProfilesService;
    }
    create(createBiroProfileDto) {
        return this.biroProfilesService.create(createBiroProfileDto);
    }
    findAll() {
        return this.biroProfilesService.findAll();
    }
    findOne(id) {
        return this.biroProfilesService.findOne(+id);
    }
    update(id, updateBiroProfileDto) {
        return this.biroProfilesService.update(+id, updateBiroProfileDto);
    }
    remove(id) {
        return this.biroProfilesService.remove(+id);
    }
};
exports.BiroProfilesController = BiroProfilesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_biro_profile_dto_1.CreateBiroProfileDto]),
    __metadata("design:returntype", void 0)
], BiroProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BiroProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BiroProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_biro_profile_dto_1.UpdateBiroProfileDto]),
    __metadata("design:returntype", void 0)
], BiroProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BiroProfilesController.prototype, "remove", null);
exports.BiroProfilesController = BiroProfilesController = __decorate([
    (0, common_1.Controller)('biro-profiles'),
    __metadata("design:paramtypes", [biro_profiles_service_1.BiroProfilesService])
], BiroProfilesController);
//# sourceMappingURL=biro-profiles.controller.js.map