// import { constants } from 'http2';

// import { app } from '../../../src/app';
// import { TaskModel } from '../../../src/models/task';
// import { findTaskByName } from '../../task-test-helper';
// import { setupDBForTasks } from '../../task-test-setup';

// describe('Task API', () => {
//   setupDBForTasks();

//   describe('POST /tasks', () => {
//     test('should return 201 status, when an object is created', async () => {
//       const response = await app.inject({ method: 'POST', url: '/tasks', payload: { name: 'Take out the trash' } });
//       const data = await findTaskByName('Take out the trash');

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
//       expect(response.json()).toEqual({
//         data: {
//           id: data.id,
//           name: data.name,
//           createdAt: data.createdAt.toISOString(),
//           updatedAt: data.updatedAt.toISOString(),
//         },
//       });
//     });

//     test('should return 400, when body is empty', async () => {
//       const response = await app.inject({ method: 'POST', url: '/tasks' });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
//     });

//     test('should return 409, when trying to create duplicate task', async () => {
//       const response = await app.inject({ method: 'POST', url: '/tasks', payload: { name: 'random task' } });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_CONFLICT);
//     });
//   });

//   describe('GET /tasks', () => {
//     test('should return 200, when reading all tasks', async () => {
//       const data = await TaskModel.find();
//       const response = await app.inject({ method: 'GET', url: '/tasks' });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
//       expect(response.json()).toEqual({
//         data: data.map((item) => {
//           return {
//             id: item.id,
//             name: item.name,
//             createdAt: item.createdAt.toISOString(),
//             updatedAt: item.updatedAt.toISOString(),
//           };
//         }),
//       });
//     });

//     test('should return 200 and an object when reading only one task', async () => {
//       const data = await findTaskByName('random task');
//       const response = await app.inject({ method: 'GET', url: `/tasks/${data.id}` });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
//       expect(response.json()).toEqual({
//         data: {
//           id: data.id,
//           name: data.name,
//           createdAt: data.createdAt.toISOString(),
//           updatedAt: data.updatedAt.toISOString(),
//         },
//       });
//     });

//     test('should return 404 status if task is not found', async () => {
//       const response = await app.inject({ method: 'GET', url: '/tasks/6244817967e3617ff57820ae' });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
//     });
//   });

//   describe('PATCH', () => {
//     test('should return 200 and a changed object after reading only one task', async () => {
//       const task = await findTaskByName('random task');
//       const response = await app.inject({
//         method: 'PATCH',
//         url: `/tasks/${task.id}`,
//         payload: { name: 'Clean your room instead of recycling the trash' },
//       });
//       const taskUpdated = await findTaskByName('Clean your room instead of recycling the trash');

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
//       expect(response.json()).not.toEqual({
//         data: {
//           id: task.id,
//           name: task.name,
//           createdAt: task.createdAt.toISOString(),
//           updatedAt: task.updatedAt.toISOString(),
//         },
//       });
//       expect(response.json()).toEqual({
//         data: {
//           id: taskUpdated.id,
//           name: taskUpdated.name,
//           createdAt: taskUpdated.createdAt.toISOString(),
//           updatedAt: taskUpdated.updatedAt.toISOString(),
//         },
//       });
//     });

//     test('should return 409, when trying to create duplicate task', async () => {
//       const task = await findTaskByName('random task');
//       const response = await app.inject({
//         method: 'PATCH',
//         url: `/tasks/${task.id}`,
//         payload: { name: 'random task' },
//       });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_CONFLICT);
//     });

//     test('should return 400, when body is empty', async () => {
//       const task = await findTaskByName('random task');
//       const response = await app.inject({
//         method: 'PATCH',
//         url: `/tasks/${task.id}`,
//         payload: {},
//       });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
//     });
//   });

//   describe('DELETE', () => {
//     test('should return 204, when body is empty', async () => {
//       const task = await findTaskByName('random task');
//       const response = await app.inject({
//         method: 'DELETE',
//         url: `/tasks/${task.id}`,
//       });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_NO_CONTENT);
//       expect(response.body).toBeFalsy();
//     });

//     test('should return 404 status if task is not found', async () => {
//       const response = await app.inject({ method: 'DELETE', url: '/tasks/6244817967e3617ff57820ae' });

//       expect(response.statusCode).toBe(constants.HTTP_STATUS_NOT_FOUND);
//     });
//   });
// });
