"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MRMEESEEKS_LIST_RESPONSE_OK = exports.mrMesseeksFormatList = void 0;
const mrMeeseeksesFormat = (document) => {
    return {
        id: document.id,
        taskId: document.taskId,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
        survived: document.survived,
    };
};
const mrMesseeksFormatList = (document) => {
    return {
        data: document.map(mrMeeseeksesFormat),
    };
};
exports.mrMesseeksFormatList = mrMesseeksFormatList;
exports.MRMEESEEKS_LIST_RESPONSE_OK = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            properties: {
                id: { type: 'string' },
                taskId: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                survived: { type: 'number' },
            },
            required: ['id', 'taskId', 'updatedAt', 'createdAt', 'survived'],
        },
    },
    required: ['data'],
    additionalProperties: false,
};
//# sourceMappingURL=meeseeks-resource.js.map