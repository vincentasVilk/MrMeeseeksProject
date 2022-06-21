"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTaskRoutes = void 0;
const task_controllers_1 = require("../controllers/task-controllers");
const error_resources_1 = require("../resources/error-resources");
const task_resource_1 = require("../resources/task-resource");
const task_validator_1 = require("../validation/task-validator");
const installTaskRoutes = (app) => {
    app.patch('/tasks/:id', {
        schema: {
            params: task_validator_1.TASKS_VALIDATOR_PARAMS,
            body: task_validator_1.TASKS_VALIDATOR_BODY_CREATE,
            response: {
                200: task_resource_1.TASK_RESPONSE_OK,
                404: task_resource_1.TASK_RESPONSE_NOT_FOUND,
            },
        },
    }, task_controllers_1.taskUpdateHandler);
    app.get('/tasks/:id', {
        schema: {
            params: task_validator_1.TASKS_VALIDATOR_PARAMS,
            response: {
                200: task_resource_1.TASK_RESPONSE_OK,
                404: task_resource_1.TASK_RESPONSE_NOT_FOUND,
            },
        },
    }, task_controllers_1.taskReadHandler);
    app.post('/tasks', {
        schema: {
            body: task_validator_1.TASKS_VALIDATOR_BODY_CREATE,
            response: {
                201: task_resource_1.TASK_RESPONSE_OK,
                404: error_resources_1.GENERIC_ERROR_SCHEMA,
            },
        },
    }, task_controllers_1.taskCreateHandler);
    app.get('/tasks', {
        schema: {
            response: {
                200: task_resource_1.TASK_LIST_RESPONSE_OK,
            },
        },
    }, task_controllers_1.taskReadAllHandler);
    app.delete('/tasks/:id', {
        schema: {
            params: task_validator_1.TASKS_VALIDATOR_PARAMS,
            response: {
                404: error_resources_1.GENERIC_ERROR_SCHEMA,
            },
        },
    }, task_controllers_1.taskDeleteHandler);
};
exports.installTaskRoutes = installTaskRoutes;
//# sourceMappingURL=task-routes.js.map