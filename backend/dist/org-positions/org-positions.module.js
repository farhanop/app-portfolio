"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgPositionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const org_positions_service_1 = require("./org-positions.service");
const org_positions_controller_1 = require("./org-positions.controller");
const org_position_entity_1 = require("./entities/org-position.entity");
let OrgPositionsModule = class OrgPositionsModule {
};
exports.OrgPositionsModule = OrgPositionsModule;
exports.OrgPositionsModule = OrgPositionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([org_position_entity_1.OrgPosition])],
        controllers: [org_positions_controller_1.OrgPositionsController],
        providers: [org_positions_service_1.OrgPositionsService],
    })
], OrgPositionsModule);
//# sourceMappingURL=org-positions.module.js.map