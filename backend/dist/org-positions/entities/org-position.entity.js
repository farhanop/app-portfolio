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
exports.OrgPosition = exports.OrgType = void 0;
const typeorm_1 = require("typeorm");
var OrgType;
(function (OrgType) {
    OrgType["ROOT"] = "root";
    OrgType["BIRO"] = "biro";
    OrgType["BAGIAN"] = "bagian";
    OrgType["JABATAN"] = "jabatan";
    OrgType["STAFF"] = "staff";
})(OrgType || (exports.OrgType = OrgType = {}));
let OrgPosition = class OrgPosition {
    id;
    name;
    type;
    officialName;
    nip;
    bio;
    photoPath;
    sortOrder;
    children;
    parent;
};
exports.OrgPosition = OrgPosition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrgPosition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrgPosition.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OrgType }),
    __metadata("design:type", String)
], OrgPosition.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrgPosition.prototype, "officialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrgPosition.prototype, "nip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrgPosition.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrgPosition.prototype, "photoPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], OrgPosition.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], OrgPosition.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", OrgPosition)
], OrgPosition.prototype, "parent", void 0);
exports.OrgPosition = OrgPosition = __decorate([
    (0, typeorm_1.Entity)('org_positions'),
    (0, typeorm_1.Tree)('closure-table')
], OrgPosition);
//# sourceMappingURL=org-position.entity.js.map