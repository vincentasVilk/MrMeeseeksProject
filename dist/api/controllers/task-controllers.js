"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDeleteHandler = exports.taskReadAllHandler = exports.taskCreateHandler = exports.taskReadHandler = exports.taskUpdateHandler = void 0;
const http2_1 = require("http2");
const task_not_found_1 = require("../../domain/errors/task-not-found");
const task_not_unique_1 = require("../../domain/errors/task-not-unique");
const task_dao_1 = require("../../persistance/task-dao");
const route_errors_1 = require("../errors/route-errors");
const task_resource_1 = require("../resources/task-resource");
const taskUpdateHandler = async (req, res) => {
    try {
        const task = await (0, task_dao_1.updateTask)(req.body, req.params);
        res.status(http2_1.constants.HTTP_STATUS_OK).send((0, task_resource_1.taskFormatUnit)(task));
    }
    catch (error) {
        (0, route_errors_1.assignStatus)(error, task_not_found_1.TaskNotFound, http2_1.constants.HTTP_STATUS_NOT_FOUND);
        (0, route_errors_1.assignStatus)(error, task_not_unique_1.TaskNotUnique, http2_1.constants.HTTP_STATUS_CONFLICT);
        throw error;
    }
};
exports.taskUpdateHandler = taskUpdateHandler;
const taskReadHandler = async (req, res) => {
    try {
        const task = await (0, task_dao_1.readTask)(req.params);
        res.status(http2_1.constants.HTTP_STATUS_OK).send((0, task_resource_1.taskFormatUnit)(task));
    }
    catch (error) {
        (0, route_errors_1.assignStatus)(error, task_not_found_1.TaskNotFound, http2_1.constants.HTTP_STATUS_NOT_FOUND);
        throw error;
    }
};
exports.taskReadHandler = taskReadHandler;
const taskCreateHandler = async (req, res) => {
    try {
        const task = await (0, task_dao_1.createTask)(req.body);
        res.status(http2_1.constants.HTTP_STATUS_CREATED).send((0, task_resource_1.taskFormatUnit)(task));
    }
    catch (error) {
        (0, route_errors_1.assignStatus)(error, task_not_unique_1.TaskNotUnique, http2_1.constants.HTTP_STATUS_CONFLICT);
        throw error;
    }
};
exports.taskCreateHandler = taskCreateHandler;
const taskReadAllHandler = async (eq, res) => {
    const data = await (0, task_dao_1.readAllTasks)();
    res.status(http2_1.constants.HTTP_STATUS_OK).send((0, task_resource_1.taskFormatList)(data));
};
exports.taskReadAllHandler = taskReadAllHandler;
const taskDeleteHandler = async (req, res) => {
    try {
        await (0, task_dao_1.deleteTask)(req.params);
        res.status(http2_1.constants.HTTP_STATUS_NO_CONTENT).send();
    }
    catch (error) {
        (0, route_errors_1.assignStatus)(error, task_not_found_1.TaskNotFound, http2_1.constants.HTTP_STATUS_NOT_FOUND);
        throw error;
    }
};
exports.taskDeleteHandler = taskDeleteHandler;
//# sourceMappingURL=task-controllers.js.map