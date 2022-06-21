import { FastifyInstance } from 'fastify';

import { TaskController } from '../controllers/task-controllers';
import { GENERIC_ERROR_SCHEMA } from '../resources/error-resources';
import { TASK_LIST_RESPONSE_OK, TASK_RESPONSE_NOT_FOUND, TASK_RESPONSE_OK } from '../resources/task-resource';
import { TASKS_VALIDATOR_BODY_CREATE, TASKS_VALIDATOR_PARAMS } from '../validation/task-validator';

export const installTaskRoutes = (app: FastifyInstance, taskController: TaskController): void => {
  app.patch(
    '/tasks/:id',
    {
      schema: {
        params: TASKS_VALIDATOR_PARAMS,
        body: TASKS_VALIDATOR_BODY_CREATE,
        response: {
          200: TASK_RESPONSE_OK,
          404: TASK_RESPONSE_NOT_FOUND,
        },
      },
    },
    taskController.taskUpdateHandler,
  );

  app.get(
    '/tasks/:id',
    {
      schema: {
        params: TASKS_VALIDATOR_PARAMS,
        response: {
          200: TASK_RESPONSE_OK,
          404: TASK_RESPONSE_NOT_FOUND,
        },
      },
    },
    taskController.taskReadHandler,
  );

  app.post(
    '/tasks',
    {
      schema: {
        body: TASKS_VALIDATOR_BODY_CREATE,
        response: {
          201: TASK_RESPONSE_OK,
          404: GENERIC_ERROR_SCHEMA,
        },
      },
    },
    taskController.taskCreateHandler,
  );

  app.get(
    '/tasks',
    {
      schema: {
        response: {
          200: TASK_LIST_RESPONSE_OK,
        },
      },
    },
    taskController.taskReadAllHandler,
  );

  app.delete(
    '/tasks/:id',
    {
      schema: {
        params: TASKS_VALIDATOR_PARAMS,
        response: {
          404: GENERIC_ERROR_SCHEMA,
        },
      },
    },
    taskController.taskDeleteHandler,
  );
};
