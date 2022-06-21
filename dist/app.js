"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = require("fastify");
const task_documentation_1 = require("./api/documentation/task-documentation");
const route_errors_1 = require("./api/errors/route-errors");
const meeseeks_routes_1 = require("./api/routes/meeseeks-routes");
const task_routes_1 = require("./api/routes/task-routes");
const config_1 = require("./config");
exports.app = (0, fastify_1.default)(config_1.CONFIG.fastifyConfig);
(0, route_errors_1.installErrorHandler)(exports.app);
(0, task_documentation_1.installSwagger)(exports.app);
(0, task_routes_1.installTaskRoutes)(exports.app);
(0, meeseeks_routes_1.installMeeseeksRoutes)(exports.app);
//# sourceMappingURL=app.js.map