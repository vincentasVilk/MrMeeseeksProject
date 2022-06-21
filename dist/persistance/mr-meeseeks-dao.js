"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksWithoutMeeseekses = exports.updateMeeseeksSurvivalCount = exports.hasPassedTwoCycles = exports.deleteTaskAndMrMeeseeks = exports.getAllMeeseeks = exports.createMrMeeseeks = void 0;
const mr_meeseeks_1 = require("../models/mr-meeseeks");
const task_1 = require("../models/task");
const createMrMeeseeks = async (taskIdToAssignMeeseeksTo) => {
    const newMrMeeseeks = await mr_meeseeks_1.MrMeeseeksModel.create({
        taskId: taskIdToAssignMeeseeksTo,
        startedAt: new Date(),
        survived: 0,
    });
    await task_1.TaskModel.findByIdAndUpdate(taskIdToAssignMeeseeksTo, { $push: { mrMeeseekses: newMrMeeseeks.id } }, { new: true });
};
exports.createMrMeeseeks = createMrMeeseeks;
const getAllMeeseeks = async () => {
    const allMeeseeksData = await mr_meeseeks_1.MrMeeseeksModel.find({});
    return allMeeseeksData.map((document) => {
        return {
            id: document.id,
            taskId: document.taskId,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
            survived: document.survived,
        };
    });
};
exports.getAllMeeseeks = getAllMeeseeks;
const deleteTaskAndMrMeeseeks = async (taskToBeDeletedId) => {
    await task_1.TaskModel.findByIdAndDelete(taskToBeDeletedId);
    await mr_meeseeks_1.MrMeeseeksModel.deleteMany({ taskId: taskToBeDeletedId });
};
exports.deleteTaskAndMrMeeseeks = deleteTaskAndMrMeeseeks;
const hasPassedTwoCycles = (meeseeks) => {
    return meeseeks.survived >= 2;
};
exports.hasPassedTwoCycles = hasPassedTwoCycles;
const updateMeeseeksSurvivalCount = async (meeseeks) => {
    await mr_meeseeks_1.MrMeeseeksModel.updateOne({ id: { $eq: meeseeks.id } }, { survived: meeseeks.survived + 1 });
    meeseeks.survived = meeseeks.survived + 1;
};
exports.updateMeeseeksSurvivalCount = updateMeeseeksSurvivalCount;
const getTasksWithoutMeeseekses = async () => {
    const meeseeks = await mr_meeseeks_1.MrMeeseeksModel.find({});
    const taskIds = meeseeks.map((meeseek) => meeseek.taskId);
    const tasks = await task_1.TaskModel.find({ _id: { $nin: taskIds } });
    return tasks.map((document) => {
        return {
            id: document._id.toString(),
            name: document.name,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    });
};
exports.getTasksWithoutMeeseekses = getTasksWithoutMeeseekses;
//# sourceMappingURL=mr-meeseeks-dao.js.map