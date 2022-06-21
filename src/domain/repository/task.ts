import { Task } from '../../domain/models/task';
import { TaskCreateParam, TaskFindParam } from '../../domain/models/task-params';

export interface TaskDaoRepository {
  createTask(params: TaskCreateParam): Promise<Task>;
  updateTask(createParam: TaskCreateParam, findParam: TaskFindParam): Promise<Task>;
  readTask(findParam: TaskFindParam): Promise<Task>;
  readAllTasks(): Promise<Task[]>;
  deleteTask(findParams: TaskFindParam): Promise<void>;
}
