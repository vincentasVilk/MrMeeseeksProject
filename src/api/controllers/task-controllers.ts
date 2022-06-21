import { FastifyReply, FastifyRequest } from 'fastify';
import { constants } from 'http2';

import { TaskDaoRepository } from '../../../src/domain/repository/task';
import { TaskNotFound } from '../../domain/errors/task-not-found';
import { TaskNotUnique } from '../../domain/errors/task-not-unique';
import { TaskCreateParam, TaskFindParam } from '../../domain/models/task-params';
import { assignStatus } from '../errors/route-errors';
import { taskFormatList, taskFormatUnit } from '../resources/task-resource';

export interface TaskController {
  taskUpdateHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
  taskReadHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
  taskCreateHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
  taskReadAllHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
  taskDeleteHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
}

export const createTaskController = (repository: TaskDaoRepository): TaskController => {
  const taskUpdateHandler = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const task = await repository.updateTask(req.body as TaskCreateParam, req.params as TaskFindParam);
      res.status(constants.HTTP_STATUS_OK).send(taskFormatUnit(task));
    } catch (error) {
      assignStatus(error, TaskNotFound, constants.HTTP_STATUS_NOT_FOUND);
      assignStatus(error, TaskNotUnique, constants.HTTP_STATUS_CONFLICT);
      throw error;
    }
  };

  const taskReadHandler = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const task = await repository.readTask(req.params as TaskFindParam);

      res.status(constants.HTTP_STATUS_OK).send(taskFormatUnit(task));
    } catch (error) {
      assignStatus(error, TaskNotFound, constants.HTTP_STATUS_NOT_FOUND);
      throw error;
    }
  };

  const taskCreateHandler = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const task = await repository.createTask(req.body as TaskCreateParam);
      res.status(constants.HTTP_STATUS_CREATED).send(taskFormatUnit(task));
    } catch (error) {
      assignStatus(error, TaskNotUnique, constants.HTTP_STATUS_CONFLICT);
      throw error;
    }
  };

  const taskReadAllHandler = async (eq: FastifyRequest, res: FastifyReply): Promise<void> => {
    const data = await repository.readAllTasks();
    res.status(constants.HTTP_STATUS_OK).send(taskFormatList(data));
  };

  const taskDeleteHandler = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      await repository.deleteTask(req.params as TaskFindParam);
      res.status(constants.HTTP_STATUS_NO_CONTENT).send();
    } catch (error) {
      assignStatus(error, TaskNotFound, constants.HTTP_STATUS_NOT_FOUND);
      throw error;
    }
  };

  return {
    taskUpdateHandler,
    taskReadHandler,
    taskCreateHandler,
    taskReadAllHandler,
    taskDeleteHandler,
  };
};
