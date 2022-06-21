import { Types } from 'mongoose';
import { Task } from '../domain/task';
export declare type TaskDocument = Task & {
    _id: Types.ObjectId;
};
export declare const taskTransform: (document: TaskDocument) => Task;
