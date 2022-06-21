"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrMeeseeksSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MrMeeseeksSchema = new mongoose_1.Schema({
    startedAt: Date,
    taskId: String,
    survived: Number,
}, {
    timestamps: true,
});
//# sourceMappingURL=mr-meeseeks.js.map