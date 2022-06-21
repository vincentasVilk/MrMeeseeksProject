import { constants } from 'http2';

import { app } from '../../../src/app';
import { MrMeeseeksModel } from '../../../src/persistance/models/mr-meeseeks';
import { TaskModel } from '../../../src/persistance/models/task';
import { createMrMeeseeksDao } from '../../../src/persistance/mr-meeseeks-dao';
import { createTaskDao } from '../../../src/persistance/task-dao';
import { setupDBForMeeseeks } from '../../task-test-setup';

describe('GET /meeseeks', () => {
  setupDBForMeeseeks();

  const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);
  const taskDao = createTaskDao(TaskModel);

  test('should return status 200, when getting all meeseeks', async () => {
    //arrange

    const task1 = await taskDao.createTask({ name: 'random task' });
    const task2 = await taskDao.createTask({ name: 'any task' });
    const task3 = await taskDao.createTask({ name: 'extra task' });
    await mrMeeseeksDao.createMrMeeseeks(task1.id);
    await mrMeeseeksDao.createMrMeeseeks(task2.id);
    await mrMeeseeksDao.createMrMeeseeks(task3.id);

    //act
    const response = await app.inject({ method: 'GET', url: '/meeseeks' });

    //assert
    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    expect(response.json().data.length).toEqual(3);
  });
});
