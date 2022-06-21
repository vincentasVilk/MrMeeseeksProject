"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNotUnique = void 0;
class TaskNotUnique extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TaskNotUnique = TaskNotUnique;
//# sourceMappingURL=task-not-unique.js.map