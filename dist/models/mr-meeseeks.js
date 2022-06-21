"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrMeeseeksModel = void 0;
const mongoose_1 = require("mongoose");
const mr_meeseeks_1 = require("../schemas/mr-meeseeks");
exports.MrMeeseeksModel = (0, mongoose_1.model)('mr_meeseeks', mr_meeseeks_1.MrMeeseeksSchema);
//# sourceMappingURL=mr-meeseeks.js.map