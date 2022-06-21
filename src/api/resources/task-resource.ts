import { JSONSchemaType } from 'ajv';

import { Task } from '../../domain/models/task';

export interface TaskResource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskUnitResource {
  data: TaskResource;
}

export interface TaskListResource {
  data: TaskResource[];
}

export const taskFormat = (document: Task): TaskResource => {
  return {
    id: document.id,
    name: document.name,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
};

export const taskFormatUnit = (document: Task): TaskUnitResource => {
  return {
    data: taskFormat(document),
  };
};

export const taskFormatList = (tasks: Task[]): TaskListResource => {
  return {
    data: tasks.map(taskFormat),
  };
};

export const TASK_RESPONSE_OK: JSONSchemaType<TaskUnitResource> = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['id', 'name', 'updatedAt', 'createdAt'],
    },
  },
  required: ['data'],
  additionalProperties: false,
};

export const TASK_RESPONSE_NOT_FOUND = {
  NotFound: {
    description: 'A task with the given ID was not found',
  },
};

export const TASK_LIST_RESPONSE_OK = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'name', 'updatedAt', 'createdAt'],
    },
  },
  required: ['data'],
  additionalProperties: false,
};
