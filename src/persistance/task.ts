import { model, Schema } from 'mongoose';

import { Task } from '../domain/models/task';

export const TaskModel = model<Task>(
  'Task',
  new Schema(
    {
      name: {
        type: String,
        unique: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export type TaskModelType = typeof TaskModel;
