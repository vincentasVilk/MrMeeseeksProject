import { MrMeeseeks } from '../../domain/mr-meeseeks';

export interface MrMeeseeksResource {
  id: string;
  taskId: string;
  createdAt: string;
  updatedAt: string;
  survived: number;
}

export interface MrMeeseeksListResource {
  data: MrMeeseeksResource[];
}

const mrMeeseeksesFormat = (document: MrMeeseeks): MrMeeseeksResource => {
  return {
    id: document.id,
    taskId: document.taskId,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
    survived: document.survived,
  };
};

export const mrMesseeksFormatList = (document: MrMeeseeks[]): MrMeeseeksListResource => {
  return {
    data: document.map(mrMeeseeksesFormat),
  };
};

export const MRMEESEEKS_LIST_RESPONSE_OK = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      properties: {
        id: { type: 'string' },
        taskId: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        survived: { type: 'number' },
      },
      required: ['id', 'taskId', 'updatedAt', 'createdAt', 'survived'],
    },
  },
  required: ['data'],
  additionalProperties: false,
};
