// import { TaskNotFound } from '../src/domain/errors/task-not-found';
// import { Task } from '../src/domain/models/task';
// import { TaskModel } from '../src/models/task';

// export const findTaskByName = async (taskName: string): Promise<Task> => {
//   const task = await TaskModel.findOne({ name: taskName });
//   if (!task) {
//     throw new TaskNotFound('Task not found');
//   }
//   return task;
// };
