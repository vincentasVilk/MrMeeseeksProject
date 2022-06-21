"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.readAllTasks = exports.readTask = exports.updateTask = exports.createTask = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const task_not_found_1 = require("../domain/errors/task-not-found");
const task_not_unique_1 = require("../domain/errors/task-not-unique");
const task_1 = require("../models/task");
const task_transform_1 = require("./task-transform");
const createTask = async (params) => {
    try {
        const task = await task_1.TaskModel.create(params);
        return (0, task_transform_1.taskTransform)(task);
    }
    catch (error) {
        if (error instanceof mongoose_1.mongo.MongoServerError && error.code === 11000) {
            throw new task_not_unique_1.TaskNotUnique('Such task name already exists');
        }
        throw error;
    }
};
exports.createTask = createTask;
const updateTask = async (createParam, findParam) => {
    const tasks = await task_1.TaskModel.find({ name: createParam.name });
    if (tasks.length !== 0) {
        throw new task_not_unique_1.TaskNotUnique('Such Task name already exists');
    }
    const task = await task_1.TaskModel.findByIdAndUpdate(findParam.id, { name: createParam.name }, { new: true });
    if (!task) {
        throw new task_not_found_1.TaskNotFound('Task Not Found');
    }
    return (0, task_transform_1.taskTransform)(task);
};
exports.updateTask = updateTask;
const readTask = async (findParam) => {
    const task = await task_1.TaskModel.findById(findParam.id);
    if (!task) {
        throw new task_not_found_1.TaskNotFound('Task not found');
    }
    return (0, task_transform_1.taskTransform)(task);
};
exports.readTask = readTask;
const readAllTasks = async () => {
    const tasks = await task_1.TaskModel.find();
    return tasks.map(task_transform_1.taskTransform);
};
exports.readAllTasks = readAllTasks;
const deleteTask = async (findParams) => {
    const result = await task_1.TaskModel.findByIdAndRemove(new mongodb_1.ObjectId(findParams.id));
    if (!result) {
        throw new task_not_found_1.TaskNotFound(`task not found`);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task-dao.js.map