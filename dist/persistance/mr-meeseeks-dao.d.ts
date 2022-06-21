import { MrMeeseeks } from '../domain/mr-meeseeks';
import { Task } from '../domain/task';
export declare const createMrMeeseeks: (taskIdToAssignMeeseeksTo: string) => Promise<void>;
export declare const getAllMeeseeks: () => Promise<MrMeeseeks[]>;
export declare const deleteTaskAndMrMeeseeks: (taskToBeDeletedId: string) => Promise<void>;
export declare const hasPassedTwoCycles: (meeseeks: MrMeeseeks) => boolean;
export declare const updateMeeseeksSurvivalCount: (meeseeks: MrMeeseeks) => Promise<void>;
export declare const getTasksWithoutMeeseekses: () => Promise<Task[]>;
