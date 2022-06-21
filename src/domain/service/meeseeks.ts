import { MeeseeksService } from '../models/meesseeks-service';
import { TaskCompletionService } from '../models/task-completion-service';
import { MrMeeseeksRepository } from '../repository/mr-meeseeks';

export const createMeeseeksService = (
  meeseksRepo: MrMeeseeksRepository,
  taskCompletionService: TaskCompletionService,
): MeeseeksService => {
  const processMrMeeseeks = async (): Promise<void> => {
    const listOfMeeseekses = await meeseksRepo.getAllMeeseeks();

    await Promise.all(
      listOfMeeseekses.map(async (meeseeks) => {
        if (await taskCompletionService.isCompleted()) {
          await meeseksRepo.deleteTaskAndMrMeeseeks(meeseeks.taskId);
        } else {
          await meeseksRepo.updateMeeseeksSurvivalCount(meeseeks);
          if (meeseksRepo.hasPassedTwoCycles(meeseeks)) {
            await meeseksRepo.createMrMeeseeks(meeseeks.taskId);
          }
        }
      }),
    );
  };

  const processTasks = async (): Promise<void> => {
    const listOfTasks = await meeseksRepo.getTasksWithoutMeeseekses();
    await Promise.all(
      listOfTasks.map(async (task) => {
        await meeseksRepo.createMrMeeseeks(task.id);
      }),
    );
  };

  const doWork = async (): Promise<void> => {
    await processMrMeeseeks();
    await processTasks();
  };

  return {
    doWork,
  };
};
