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
exports.BiroProfile = exports.BiroType = void 0;
const typeorm_1 = require("typeorm");
var BiroType;
(function (BiroType) {
    BiroType["BAUK"] = "BAUK";
    BiroType["BPT"] = "BPT";
})(BiroType || (exports.BiroType = BiroType = {}));
let BiroProfile = class BiroProfile {
    id;
    biroType;
    description;
    visiMisi;
    tupoksi;
    updatedAt;
};
exports.BiroProfile = BiroProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BiroProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BiroType, unique: true }),
    __metadata("design:type", String)
], BiroProfile.prototype, "biroType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BiroProfile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BiroProfile.prototype, "visiMisi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BiroProfile.prototype, "tupoksi", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BiroProfile.prototype, "updatedAt", void 0);
exports.BiroProfile = BiroProfile = __decorate([
    (0, typeorm_1.Entity)('biro_profiles')
], BiroProfile);
//# sourceMappingURL=biro-profile.entity.js.map