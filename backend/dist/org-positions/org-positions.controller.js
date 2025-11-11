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
exports.OrgPositionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const org_positions_service_1 = require("./org-positions.service");
const create_org_position_dto_1 = require("./dto/create-org-position.dto");
let OrgPositionsController = class OrgPositionsController {
    orgPositionsService;
    constructor(orgPositionsService) {
        this.orgPositionsService = orgPositionsService;
    }
    create(createDto) {
        return this.orgPositionsService.create(createDto);
    }
    getTree() {
        return this.orgPositionsService.getTree();
    }
    getTreeBranch(id) {
        return this.orgPositionsService.getTreeBranch(+id);
    }
};
exports.OrgPositionsController = OrgPositionsController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_org_position_dto_1.CreateOrgPositionDto]),
    __metadata("design:returntype", void 0)
], OrgPositionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrgPositionsController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)('tree/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrgPositionsController.prototype, "getTreeBranch", null);
exports.OrgPositionsController = OrgPositionsController = __decorate([
    (0, common_1.Controller)('org-positions'),
    __metadata("design:paramtypes", [org_positions_service_1.OrgPositionsService])
], OrgPositionsController);
//# sourceMappingURL=org-positions.controller.js.map