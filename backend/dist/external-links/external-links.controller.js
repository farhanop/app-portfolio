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
exports.ExternalLinksController = void 0;
const common_1 = require("@nestjs/common");
const external_links_service_1 = require("./external-links.service");
const create_external_link_dto_1 = require("./dto/create-external-link.dto");
const update_external_link_dto_1 = require("./dto/update-external-link.dto");
let ExternalLinksController = class ExternalLinksController {
    externalLinksService;
    constructor(externalLinksService) {
        this.externalLinksService = externalLinksService;
    }
    create(createExternalLinkDto) {
        return this.externalLinksService.create(createExternalLinkDto);
    }
    findAll() {
        return this.externalLinksService.findAll();
    }
    findOne(id) {
        return this.externalLinksService.findOne(+id);
    }
    update(id, updateExternalLinkDto) {
        return this.externalLinksService.update(+id, updateExternalLinkDto);
    }
    remove(id) {
        return this.externalLinksService.remove(+id);
    }
};
exports.ExternalLinksController = ExternalLinksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_external_link_dto_1.CreateExternalLinkDto]),
    __metadata("design:returntype", void 0)
], ExternalLinksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExternalLinksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExternalLinksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_external_link_dto_1.UpdateExternalLinkDto]),
    __metadata("design:returntype", void 0)
], ExternalLinksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExternalLinksController.prototype, "remove", null);
exports.ExternalLinksController = ExternalLinksController = __decorate([
    (0, common_1.Controller)('external-links'),
    __metadata("design:paramtypes", [external_links_service_1.ExternalLinksService])
], ExternalLinksController);
//# sourceMappingURL=external-links.controller.js.map