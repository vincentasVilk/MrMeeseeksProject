"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSwagger = void 0;
const fastify_swagger_1 = require("fastify-swagger");
const installSwagger = (app) => {
    app.register(fastify_swagger_1.default, {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            host: 'localhost',
            schemes: ['http'],
            info: {
                title: 'Onboarding task',
                description: 'API that can handle tasks',
                version: '0.1.0',
            },
        },
    });
};
exports.installSwagger = installSwagger;
//# sourceMappingURL=task-documentation.js.map