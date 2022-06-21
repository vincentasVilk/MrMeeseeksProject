"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERIC_ERROR_SCHEMA = exports.formatError = void 0;
const formatError = (error) => {
    var _a;
    return {
        statusCode: error.validation ? 400 : error.statusCode || 500,
        message: error.message,
        error: error.constructor.name,
        stack: ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('')) || [],
    };
};
exports.formatError = formatError;
exports.GENERIC_ERROR_SCHEMA = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
        },
        message: {
            type: 'string',
        },
        error: {
            type: 'string',
        },
        stack: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: ['statusCode', 'message', 'error', 'stack'],
    additionalProperties: false,
};
//# sourceMappingURL=error-resources.js.map