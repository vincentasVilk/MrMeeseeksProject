"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_LIST_RESPONSE_OK = exports.TASK_RESPONSE_NOT_FOUND = exports.TASK_RESPONSE_OK = exports.taskFormatList = exports.taskFormatUnit = exports.taskFormat = void 0;
const taskFormat = (document) => {
    return {
        id: document.id,
        name: document.name,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
    };
};
exports.taskFormat = taskFormat;
const taskFormatUnit = (document) => {
    return {
        data: (0, exports.taskFormat)(document),
    };
};
exports.taskFormatUnit = taskFormatUnit;
const taskFormatList = (tasks) => {
    return {
        data: tasks.map(exports.taskFormat),
    };
};
exports.taskFormatList = taskFormatList;
exports.TASK_RESPONSE_OK = {
    type: 'object',
    properties: {
        data: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
            required: ['id', 'name', 'updatedAt', 'createdAt'],
        },
    },
    required: ['data'],
    additionalProperties: false,
};
exports.TASK_RESPONSE_NOT_FOUND = {
    NotFound: {
        description: 'A task with the given ID was not found',
    },
};
exports.TASK_LIST_RESPONSE_OK = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'updatedAt', 'createdAt'],
        },
    },
    required: ['data'],
    additionalProperties: false,
};
//# sourceMappingURL=task-resource.js.map