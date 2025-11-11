"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrgPositionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_org_position_dto_1 = require("./create-org-position.dto");
class UpdateOrgPositionDto extends (0, mapped_types_1.PartialType)(create_org_position_dto_1.CreateOrgPositionDto) {
}
exports.UpdateOrgPositionDto = UpdateOrgPositionDto;
//# sourceMappingURL=update-org-position.dto.js.map