import { JSONSchemaType } from 'ajv';

import { TaskParam } from '../../domain/models/task-params';

export const TASKS_VALIDATOR_BODY_CREATE: JSONSchemaType<TaskParam> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
  additionalProperties: false,
};

export const TASKS_VALIDATOR_PARAMS = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: ['id'],
  additionalProperties: false,
};
