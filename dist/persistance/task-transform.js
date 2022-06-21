"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskTransform = void 0;
const taskTransform = (document) => {
    return {
        id: document._id.toString(),
        name: document.name,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
    };
};
exports.taskTransform = taskTransform;
//# sourceMappingURL=task-transform.js.map