import { mongo } from 'mongoose';

import { TaskNotFound } from '../domain/errors/task-not-found';
import { TaskNotUnique } from '../domain/errors/task-not-unique';
import { Task } from '../domain/models/task';
import { TaskCreateParam, TaskFindParam } from '../domain/models/task-params';
import { TaskDaoRepository } from '../domain/repository/task';
import { TaskModelType } from '../persistance/models/task';
import { taskTransform } from './task-transform';

export const createTaskDao = (taskModel: TaskModelType): TaskDaoRepository => {
  const createTask = async (params: TaskCreateParam): Promise<Task> => {
    try {
      const task = await taskModel.create(params);
      return taskTransform(task);
    } catch (error) {
      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        throw new TaskNotUnique('Such task name already exists');
      }
      throw error;
    }
  };

  const updateTask = async (createParam: TaskCreateParam, findParam: TaskFindParam): Promise<Task> => {
    const tasks = await taskModel.find({ name: createParam.name });
    if (tasks.length !== 0) {
      throw new TaskNotUnique('Such Task name already exists');
    }

    const task = await taskModel.findByIdAndUpdate(findParam.id, { name: createParam.name }, { new: true });
    if (!task) {
      throw new TaskNotFound('Task Not Found');
    }
    return taskTransform(task);
  };

  const readTask = async (findParam: TaskFindParam): Promise<Task> => {
    const task = await taskModel.findById(findParam.id);
    if (!task) {
      throw new TaskNotFound('Task not found');
    }
    return taskTransform(task);
  };

  const readAllTasks = async (): Promise<Task[]> => {
    const tasks = await taskModel.find();
    return tasks.map(taskTransform);
  };

  const deleteTask = async (findParams: TaskFindParam): Promise<void> => {
    const task = await taskModel.findByIdAndRemove(findParams.id);
    if (!task) {
      throw new TaskNotFound(`task not found`);
    }
  };
  return {
    createTask,
    updateTask,
    readTask,
    readAllTasks,
    deleteTask,
  };
};
