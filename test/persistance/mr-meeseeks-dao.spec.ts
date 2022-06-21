import { mocked } from 'jest-mock';

import { TaskCompletionService } from '../../src/domain/models/task-completion-service';
import { MrMeeseeksRepository } from '../../src/domain/repository/mr-meeseeks';
import { createMeeseeksService } from '../../src/domain/service/meeseeks';
import { MrMeeseeksModel } from '../../src/persistance/models/mr-meeseeks';
import { TaskModel } from '../../src/persistance/models/task';
import { createMrMeeseeksDao } from '../../src/persistance/mr-meeseeks-dao';
import { createTaskDao } from '../../src/persistance/task-dao';
import { setupDBForMeeseeks } from '../task-test-setup';

// const taskIsCompleted = jest.fn();

// jest.mock('../../src/client/yes-no-api', () => {
//   return {
//     taskIsCompleted,
//   };
// });

// import { MrMeeseeksModel } from '../../src/models/mr-meeseeks';
// import { TaskModel } from '../../src/models/task';
// import { mrMeeseeksDao } from '../../src/persistance/mr-meeseeks-dao';
// import { meeseeksService } from '../../src/service/meeseeks';
// import { findTaskByName } from '../task-test-helper';
// import { setupDBForMeeseeks } from '../task-test-setup';

const fakeMrMeeseeksRepository = mocked<MrMeeseeksRepository>({
  createMrMeeseeks: jest.fn(),
  getAllMeeseeks: jest.fn(),
  deleteTaskAndMrMeeseeks: jest.fn(),
  hasPassedTwoCycles: jest.fn(),
  updateMeeseeksSurvivalCount: jest.fn(),
  getTasksWithoutMeeseekses: jest.fn(),
});

const fakeTaskCompletionService = mocked<TaskCompletionService>({
  isCompleted: jest.fn(),
});
describe('Meeseeks DAO functions', () => {
  setupDBForMeeseeks();

  //   test('successfully creates Mr Meeseeks', async () => {
  //     //arrange
  //     const { createMrMeeseeks } = mrMeeseeksDao(MrMeeseeksModel);
  //     await TaskModel.create({ name: 'extra task' });
  //     const task = await findTaskByName('extra task');

  //     await createMrMeeseeks(task.id);
  //     const meeseeks = await MrMeeseeksModel.findOne({ taskId: task.id });

  //     //act
  //     const allMeeseeksees = await MrMeeseeksModel.find({});

  //     //assert
  //     expect(allMeeseeksees.length).toBe(1);
  //     expect(meeseeks?.taskId).toBe(task.id);
  //   });

  test('when taskIsCompleted returns false and when hasPassedTwoCycles is true, should spawn new Meeseeks', async () => {
    //arrange
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const task = await taskDao.createTask({ name: 'random task' });
    await mrMeeseeksDao.createMrMeeseeks(task.id);

    fakeTaskCompletionService.isCompleted.mockResolvedValue(false);
    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);
    //act
    await service.doWork();

    //assert
    const allMeeseeks = await mrMeeseeksDao.getAllMeeseeks();

    expect(allMeeseeks.length).toBe(2);
  });
});
