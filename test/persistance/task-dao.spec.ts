// import { ObjectId } from 'mongodb';

// import { TaskNotFound } from '../../src/domain/errors/task-not-found';
// import { updateTask } from '../../src/persistance/task-dao';
// import { setupDBForTasks } from '../task-test-setup';

// describe('Task DAO function', () => {
//   setupDBForTasks();

//   test('should throw error when task does not exist', async () => {
//     //arrange
//     const updateTaskPromise = updateTask({ name: 'whatever task' }, { id: new ObjectId().toString() });

//     //assert
//     await expect(updateTaskPromise).rejects.toEqual(new TaskNotFound('Task Not Found'));
//   });
// });
