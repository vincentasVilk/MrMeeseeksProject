import { Task } from '../domain/models/task';
import { MrMeeseeks } from '../domain/mr-meeseeks';
import { MrMeeseeksRepository } from '../domain/repository/mr-meeseeks';
import { MrMeeseeksModelType } from './models/mr-meeseeks';
import { TaskModelType } from './models/task';

export const createMrMeeseeksDao = (model: MrMeeseeksModelType, taskModel: TaskModelType): MrMeeseeksRepository => {
  const createMrMeeseeks = async (taskIdToAssignMeeseeksTo: string): Promise<void> => {
    const newMrMeeseeks = await model.create({
      taskId: taskIdToAssignMeeseeksTo,
      startedAt: new Date(),
      survived: 0,
    });
    await model.findByIdAndUpdate(
      taskIdToAssignMeeseeksTo,
      { $push: { mrMeeseekses: newMrMeeseeks.id } },
      { new: true },
    );
  };

  const getAllMeeseeks = async (): Promise<MrMeeseeks[]> => {
    const allMeeseeksData = await model.find({});
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

  const deleteTaskAndMrMeeseeks = async (taskToBeDeletedId: string): Promise<void> => {
    await model.findByIdAndDelete(taskToBeDeletedId);
    await model.deleteMany({ taskId: taskToBeDeletedId });
  };

  const hasPassedTwoCycles = (meeseeks: MrMeeseeks): boolean => {
    return meeseeks.survived >= 2;
  };

  const updateMeeseeksSurvivalCount = async (meeseeks: MrMeeseeks): Promise<void> => {
    await model.updateOne({ id: { $eq: meeseeks.id } }, { survived: meeseeks.survived + 1 });

    meeseeks.survived = meeseeks.survived + 1;
  };

  const getTasksWithoutMeeseekses = async (): Promise<Task[]> => {
    const meeseeks = await model.find({});
    const taskIds = meeseeks.map((meeseek) => meeseek.taskId);
    const tasks = await taskModel.find({ _id: { $nin: taskIds } });
    return tasks.map((document) => {
      return {
        id: document._id.toString(),
        name: document.name,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
    });
  };

  return {
    createMrMeeseeks,
    getAllMeeseeks,
    deleteTaskAndMrMeeseeks,
    hasPassedTwoCycles,
    updateMeeseeksSurvivalCount,
    getTasksWithoutMeeseekses,
  };
};
