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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalLink = void 0;
const typeorm_1 = require("typeorm");
const biro_profile_entity_1 = require("../../biro-profiles/entities/biro-profile.entity");
let ExternalLink = class ExternalLink {
    id;
    title;
    url;
    iconIdentifier;
    relatedBiro;
    isActive;
};
exports.ExternalLink = ExternalLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExternalLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExternalLink.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExternalLink.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExternalLink.prototype, "iconIdentifier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: biro_profile_entity_1.BiroType,
        nullable: true,
    }),
    __metadata("design:type", String)
], ExternalLink.prototype, "relatedBiro", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ExternalLink.prototype, "isActive", void 0);
exports.ExternalLink = ExternalLink = __decorate([
    (0, typeorm_1.Entity)('external_links')
], ExternalLink);
//# sourceMappingURL=external-link.entity.js.map