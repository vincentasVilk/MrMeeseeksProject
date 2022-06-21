"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_VALIDATOR_PARAMS = exports.TASKS_VALIDATOR_BODY_CREATE = void 0;
exports.TASKS_VALIDATOR_BODY_CREATE = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
    },
    required: ['name'],
    additionalProperties: false,
};
exports.TASKS_VALIDATOR_PARAMS = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
    },
    required: ['id'],
    additionalProperties: false,
};
//# sourceMappingURL=task-validator.js.map