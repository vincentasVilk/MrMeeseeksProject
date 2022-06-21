import { Task } from '../models/task';
import { MrMeeseeks } from '../mr-meeseeks';

export interface MrMeeseeksRepository {
  createMrMeeseeks(taskIdToAssignMeeseeksTo: string): Promise<void>;
  getAllMeeseeks(): Promise<MrMeeseeks[]>;
  deleteTaskAndMrMeeseeks(taskToBeDeletedId: string): Promise<void>;
  hasPassedTwoCycles(meeseeks: MrMeeseeks): boolean;
  updateMeeseeksSurvivalCount(meeseeks: MrMeeseeks): Promise<void>;
  getTasksWithoutMeeseekses(): Promise<Task[]>;
}
