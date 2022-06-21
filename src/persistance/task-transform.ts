import { Types } from 'mongoose';

import { Task } from '../domain/models/task';

export type TaskDocument = Task & { _id: Types.ObjectId };

export const taskTransform = (document: TaskDocument): Task => {
  return {
    id: document._id.toString(),
    name: document.name,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
