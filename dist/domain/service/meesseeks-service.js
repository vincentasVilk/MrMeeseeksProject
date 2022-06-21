"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doWork = exports.processTasks = exports.processMrMeeseeks = void 0;
const yes_no_api_1 = require("../../client/yes-no-api");
const mr_meeseeks_dao_1 = require("../../persistance/mr-meeseeks-dao");
const processMrMeeseeks = async () => {
    const listOfMeeseekses = await (0, mr_meeseeks_dao_1.getAllMeeseeks)();
    await Promise.all(listOfMeeseekses.map(async (meeseeks) => {
        if (await (0, yes_no_api_1.taskIsCompleted)()) {
            await (0, mr_meeseeks_dao_1.deleteTaskAndMrMeeseeks)(meeseeks.taskId);
        }
        else {
            await (0, mr_meeseeks_dao_1.updateMeeseeksSurvivalCount)(meeseeks);
            if ((0, mr_meeseeks_dao_1.hasPassedTwoCycles)(meeseeks)) {
                await (0, mr_meeseeks_dao_1.createMrMeeseeks)(meeseeks.taskId);
            }
        }
    }));
};
exports.processMrMeeseeks = processMrMeeseeks;
const processTasks = async () => {
    const listOfTasks = await (0, mr_meeseeks_dao_1.getTasksWithoutMeeseekses)();
    await Promise.all(listOfTasks.map(async (task) => {
        await (0, mr_meeseeks_dao_1.createMrMeeseeks)(task.id);
    }));
};
exports.processTasks = processTasks;
const doWork = async () => {
    await (0, exports.processMrMeeseeks)();
    await (0, exports.processTasks)();
};
exports.doWork = doWork;
//# sourceMappingURL=meesseeks-service.js.map