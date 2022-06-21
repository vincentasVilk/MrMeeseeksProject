import { mocked } from 'jest-mock';

import { TaskCompletionService } from '../../../src/domain/models/task-completion-service';
import { MrMeeseeksRepository } from '../../../src/domain/repository/mr-meeseeks';
import { createMeeseeksService } from '../../../src/domain/service/meeseeks';
import { MrMeeseeksModel } from '../../../src/persistance/models/mr-meeseeks';
import { TaskModel } from '../../../src/persistance/models/task';
import { createMrMeeseeksDao } from '../../../src/persistance/mr-meeseeks-dao';
import { createTaskDao } from '../../../src/persistance/task-dao';

describe('MeeseeksService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

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

  describe('doWork', () => {
    test('should assign MrMeeseeksees to new tasks', async () => {
      const fetchFn = fakeMrMeeseeksRepository.getTasksWithoutMeeseekses.mockResolvedValue([
        {
          id: 'task_id',
          name: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      //Mock MrMeeseeksRepository get all mrMeseekses returns empty array

      fakeMrMeeseeksRepository.getAllMeeseeks.mockResolvedValue([]);

      const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);

      await service.doWork();

      expect(fetchFn).toBeCalledTimes(1);
    });
  });

  test('when Meeseeks has been created and IsCompleted returns true, should delete task', async () => {
    fakeMrMeeseeksRepository.getAllMeeseeks.mockResolvedValue([
      {
        id: '62345bc84ac19b1e21468f72',
        taskId: '622f194f52b23dB8c445c4cd',
        createdAt: new Date('2022-03-28T09:52:08.246Z'),
        updatedAt: new Date('2022-03-29T09:52:08.246Z'),
        survived: 2,
      },
    ]);
    fakeMrMeeseeksRepository.getTasksWithoutMeeseekses.mockResolvedValue([]);
    fakeTaskCompletionService.isCompleted.mockResolvedValue(true);

    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);

    await service.doWork();

    expect(fakeMrMeeseeksRepository.deleteTaskAndMrMeeseeks).toBeCalledWith('622f194f52b23dB8c445c4cd');
  });

  test('Yes no API should return true', async () => {
    const response = fakeTaskCompletionService.isCompleted.mockResolvedValue(true);

    expect(await response()).toEqual(true);
  });

  test('getAllMeeseeks function should return all Meeseeks', async () => {
    fakeMrMeeseeksRepository.getAllMeeseeks.mockResolvedValue([]);
    const meeseeks = await fakeMrMeeseeksRepository.getAllMeeseeks();

    expect(meeseeks).toStrictEqual([]);
  });

  test('should create meeseekses for tasks that do not have meeseekses', async () => {
    const taskDao = createTaskDao(TaskModel);
    //arrange
    await taskDao.createTask({ name: 'random task' });
    await taskDao.createTask({ name: 'extra task' });
    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);

    //act

    await service.doWork();

    //assert
    const response = await fakeMrMeeseeksRepository.getAllMeeseeks();

    expect(response.length).toBe(2);
  });
  test('When meeseeks has been created and IsCompleted returns false, task should not be deleted', async () => {
    //arrange
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const anyTask = await taskDao.createTask({ name: 'random task' });
    await mrMeeseeksDao.createMrMeeseeks(anyTask.id);

    fakeTaskCompletionService.isCompleted.mockResolvedValue(false);
    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);
    const mrMeeseeksDaoSpy = jest.spyOn(mrMeeseeksDao, 'deleteTaskAndMrMeeseeks');
    //act
    await service.doWork();
    const allTasks = await taskDao.readAllTasks();
    //assert
    expect(allTasks.length).toBe(1);
    expect(mrMeeseeksDaoSpy).toHaveBeenCalledTimes(0);
  });

  test('should have called updateMeeseeksSurvivalCountMethod', async () => {
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const anyTask = await taskDao.createTask({ name: 'random task' });
    await mrMeeseeksDao.createMrMeeseeks(anyTask.id);

    fakeTaskCompletionService.isCompleted.mockResolvedValue(false);
    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);
    const mrMeeseeksDaoSpy = jest.spyOn(mrMeeseeksDao, 'updateMeeseeksSurvivalCount');
    //act
    await service.doWork();

    expect(mrMeeseeksDaoSpy).toBeCalled();
  });

  test('should have called hasPassedTwoCycles', async () => {
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const anyTask = await taskDao.createTask({ name: 'random task' });
    await mrMeeseeksDao.createMrMeeseeks(anyTask.id);

    fakeTaskCompletionService.isCompleted.mockResolvedValue(false);
    const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);
    const mrMeeseeksDaoSpy = jest.spyOn(mrMeeseeksDao, 'hasPassedTwoCycles');
    //act
    await service.doWork();

    expect(mrMeeseeksDaoSpy).toBeCalledTimes(1);
  });

  // test('When its the first cycle, it should return false', async () => {
  //   fakeMrMeeseeksRepository.hasPassedTwoCycles.mockResolvedValue(false);

  //   const res =
  // })

  test('When tasksWithoutMeeseekses is called, it should return all tasks without assigned Meeseekses', async () => {
    //arrange
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const task1 = await taskDao.createTask({ name: 'random task' });
    const task2 = await taskDao.createTask({ name: 'any task' });
    const task3 = await taskDao.createTask({ name: 'some task' });
    await mrMeeseeksDao.createMrMeeseeks(task3.id);
    const tasks = [task1, task2].map((document) => {
      return {
        id: document.id,
        name: document.name,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
    });

    const tasksWithoutMeeseekses = await fakeMrMeeseeksRepository.getTasksWithoutMeeseekses();

    //assert
    expect(tasksWithoutMeeseekses.length).toBe(2);
    expect(tasksWithoutMeeseekses).toStrictEqual(tasks);
  });

  test('When deleteTaskAndMrMeeseeks is called, should delete task and MrMeeseeks', async () => {
    //arrange
    const taskDao = createTaskDao(TaskModel);
    const mrMeeseeksDao = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);

    const task = await taskDao.createTask({ name: 'extra task' });
    await mrMeeseeksDao.createMrMeeseeks(task.id);
    await mrMeeseeksDao.createMrMeeseeks(task.id);

    await fakeMrMeeseeksRepository.deleteTaskAndMrMeeseeks(task.id);

    //assert
    const allMeeseeks = await MrMeeseeksModel.find({});

    expect(allMeeseeks.length).toBe(0);
  });

//   test('When meeseeks have been created and IsCompleted returns true, should delete task', async () => {
//     //arrange
//     fakeMrMeeseeksRepository.getAllMeeseeks.mockResolvedValue([]);
//     fakeMrMeeseeksRepository.updateMeeseeksSurvivalCount.mockResolvedValue({
//       id: '62346bc84ac22a2e34679gf78',
//       taskId: '622f457c45b45f07g445a5gb',
//       createdAt: new Date('2022-04-14T09:33:02.227G'),
//       survived: 1,
//     });

//     fakeMrMeeseeksRepository.getTasksWithoutMeeseekses.mockResolvedValue([]);
//     fakeTaskCompletionService.isCompleted.mockResolvedValue(true);
//     const service = createMeeseeksService(fakeMrMeeseeksRepository, fakeTaskCompletionService);

//     await service.doWork();

//     expect(fakeMrMeeseeksRepository.deleteTaskAndMrMeeseeks).toBeCalledWith('622f457c45b45f07g445a5gb');
//   });
// });

// const taskIsCompleted = jest.fn();

// jest.mock('../../../src/client/yes-no-api', () => {
//   return {
//     taskIsCompleted,
//   };
// });

// import { MrMeeseeksModel } from '../../../src/models/mr-meeseeks';
// import { TaskModel } from '../../../src/models/task';
// import { createMrMeeseeksDao } from '../../../src/persistance/mr-meeseeks-dao';
// import { meeseeksService } from '../../../src/service/meeseeks';
// import { findTaskByName } from '../../task-test-helper';
// import { setupDBForMeeseeks } from '../../task-test-setup';

// // const { getAllMeeseeks, createMrMeeseeks, deleteTaskAndMrMeeseeks, getTasksWithoutMeeseekses } =
// //   mrMeeseeksDao(MrMeeseeksModel);
// // const { doWork, processTasks } = meeseeksService(mrMeeseeksDao(MrMeeseeksModel));

// describe('dowork', () => {
//   setupDBForMeeseeks();

//   test('should assign MrMeeseeksees to new tasks', async () => {
//     //arrange
//     const tasks = await TaskModel.create([{ name: '2' }, { name: '3' }]);

//     //act
//     await doWork();

//     //assert
//     const allMeeseeksData = await MrMeeseeksModel.find({ taskId: { $in: tasks.map((task) => task.id) } });

//     expect(allMeeseeksData.length).toBe(2);
//   });

// describe('Meeseekses, read tasks without Meeseekses', () => {
//   setupDBForMeeseeks();
//   test('should get all tasks without meeseekses', async () => {
//     //arrange
//     const randomTask = await TaskModel.create({ name: 'random task' });
//     await createMrMeeseeks(randomTask.id);
//     const someTask = await TaskModel.create({ name: 'some Task' });
//     await createMrMeeseeks(someTask.id);
//     const anotherTask = await TaskModel.create({ name: 'another Task' });
//     await createMrMeeseeks(anotherTask.id);

//     //act
//     const tasksWithoutMeeseekses = await getTasksWithoutMeeseekses();

//     //assert
//     expect(tasksWithoutMeeseekses.length).toBe(0);
//   });
