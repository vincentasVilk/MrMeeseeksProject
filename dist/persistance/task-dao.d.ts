import { Task } from '../domain/task';
import { TaskCreateParam, TaskFindParam } from './../domain/task-params';
export declare const createTask: (params: TaskCreateParam) => Promise<Task>;
export declare const updateTask: (createParam: TaskCreateParam, findParam: TaskFindParam) => Promise<Task>;
export declare const readTask: (findParam: TaskFindParam) => Promise<Task>;
export declare const readAllTasks: () => Promise<Task[]>;
export declare const deleteTask: (findParams: TaskFindParam) => Promise<void>;
