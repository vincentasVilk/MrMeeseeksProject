import { model } from 'mongoose';

import { Task } from '../../domain/models/task';
import { tasksSchema } from '../schemas/task';

export const TaskModel = model<Task>('Task', tasksSchema);

export type TaskModelType = typeof TaskModel;
