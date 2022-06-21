// const taskIsCompleted = jest.fn();

// jest.mock('../src/client/yes-no-api', () => {
//   return {
//     taskIsCompleted,
//   };
// });

// import { doWork, processTasks } from '../src/domain/service/meesseeks-service';
// import { MrMeeseeksModel } from '../src/models/mr-meeseeks';
// import { TaskModel } from '../src/models/task';
// import {
//   createMrMeeseeks,
//   deleteTaskAndMrMeeseeks,
//   getAllMeeseeks,
//   getTasksWithoutMeeseekses,
// } from '../src/persistance/mr-meeseeks-dao';
// import { findTaskByName } from './task-test-helper';
// import { setupDBForMeeseeks } from './task-test-setup';

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

//   test('Yes no API should return true', async () => {
//     const response = taskIsCompleted.mockResolvedValue(true);

//     expect(await response()).toEqual(true);
//   });

//   test('should create meeseekses for tasks that do not have meeseekses', async () => {
//     //arrange
//     await TaskModel.create({ name: 'random task' });
//     await TaskModel.create({ name: 'extra task' });

//     //act
//     await processTasks();

//     //assert
//     const response = await MrMeeseeksModel.find({});

//     expect(response.length).toBe(2);
//   });

//   test('getAllMeeseeks function should return all Meeseeks', async () => {
//     const meeseeks = await getAllMeeseeks();

//     expect(meeseeks).toStrictEqual([]);
//   });

//   test('When meeseeks has been created and taskIsCompleted returns false, task should not be deleted', async () => {
//     //arrange
//     await TaskModel.create({ name: 'random task' });
//     const anyTask = await findTaskByName('random task');
//     await createMrMeeseeks(anyTask.id);
//     taskIsCompleted.mockResolvedValue(false);

//     //act
//     await doWork();
//     const response = await findTaskByName('random task');

//     //assert
//     expect(response).toEqual(expect.anything());
//   });

//   test('When meeseeks have been created and taskIsCompleted returns true, should delete task and Meeseeks', async () => {
//     //arrange
//     await TaskModel.create({ name: 'extra task' });
//     const anyTask = await findTaskByName('extra task');
//     await createMrMeeseeks(anyTask.id);
//     taskIsCompleted.mockResolvedValue(true);

//     //act
//     await doWork();
//     const response = await MrMeeseeksModel.find({});

//     //assert
//     expect(response.length).toBe(0);
//   });

//   test('When deleteTaskAndMrMeeseeks is called, should delete task and MrMeeseeks', async () => {
//     //arrange
//     await TaskModel.create({ name: 'extra task' });
//     const task = await findTaskByName('extra task');
//     await createMrMeeseeks(task.id);
//     await createMrMeeseeks(task.id);

//     await deleteTaskAndMrMeeseeks(task.id);

//     //assert
//     const allMeeseeks = await MrMeeseeksModel.find({});

//     expect(allMeeseeks.length).toBe(0);
//   });
// });

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

//   test('When tasksWithoutMeeseekses is called, it should return all tasks without assigned Meeseekses', async () => {
//     //arrange
//     const task1 = await TaskModel.create({ name: 'random task' });
//     const task2 = await TaskModel.create({ name: 'any task' });
//     const task3 = await TaskModel.create({ name: 'some task' });
//     await createMrMeeseeks(task3.id);
//     const tasks = [task1, task2].map((document) => {
//       return {
//         id: document._id.toString(),
//         name: document.name,
//         createdAt: document.createdAt,
//         updatedAt: document.updatedAt,
//       };
//     });

//     const tasksWithoutMeeseekses = await getTasksWithoutMeeseekses();

//     //assert
//     expect(tasksWithoutMeeseekses.length).toBe(2);
//     expect(tasksWithoutMeeseekses).toStrictEqual(tasks);
//   });
// });
