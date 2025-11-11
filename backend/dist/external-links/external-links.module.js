"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalLinksModule = void 0;
const common_1 = require("@nestjs/common");
const external_links_service_1 = require("./external-links.service");
const external_links_controller_1 = require("./external-links.controller");
let ExternalLinksModule = class ExternalLinksModule {
};
exports.ExternalLinksModule = ExternalLinksModule;
exports.ExternalLinksModule = ExternalLinksModule = __decorate([
    (0, common_1.Module)({
        controllers: [external_links_controller_1.ExternalLinksController],
        providers: [external_links_service_1.ExternalLinksService],
    })
], ExternalLinksModule);
//# sourceMappingURL=external-links.module.js.map