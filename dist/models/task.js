"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
exports.TaskModel = (0, mongoose_1.model)('Task', new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
}));
//# sourceMappingURL=task.js.map