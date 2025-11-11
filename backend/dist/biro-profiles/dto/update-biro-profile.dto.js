"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBiroProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_biro_profile_dto_1 = require("./create-biro-profile.dto");
class UpdateBiroProfileDto extends (0, mapped_types_1.PartialType)(create_biro_profile_dto_1.CreateBiroProfileDto) {
}
exports.UpdateBiroProfileDto = UpdateBiroProfileDto;
//# sourceMappingURL=update-biro-profile.dto.js.map