"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiroProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const biro_profiles_service_1 = require("./biro-profiles.service");
const biro_profiles_controller_1 = require("./biro-profiles.controller");
let BiroProfilesModule = class BiroProfilesModule {
};
exports.BiroProfilesModule = BiroProfilesModule;
exports.BiroProfilesModule = BiroProfilesModule = __decorate([
    (0, common_1.Module)({
        controllers: [biro_profiles_controller_1.BiroProfilesController],
        providers: [biro_profiles_service_1.BiroProfilesService],
    })
], BiroProfilesModule);
//# sourceMappingURL=biro-profiles.module.js.map