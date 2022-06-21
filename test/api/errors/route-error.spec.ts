const createTask = jest.fn();

jest.mock('../../../src/persistance/task-dao', () => {
  return {
    createTask,
  };
});

import { formatError } from '../../../src/api/resources/error-resources';
import { app } from '../../../src/app';

describe('Testing errors', () => {
  test('testing 500 error message', async () => {
    app.get('/500', (request, reply) => {
      throw new Error();
    });
    const response = await app.inject({ method: 'GET', url: '/500' });

    expect(response.statusCode).toBe(500);
    expect(response.statusMessage).toBe('Internal Server Error');
  });

  test('testing 404 error message', async () => {
    const response = await app.inject({ method: 'GET', url: '/404' });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toStrictEqual(
      formatError({ code: '404', name: 'routeNotFound', statusCode: 404, message: 'No such route' }),
    );
  });
  test('testing 500 error using mocked DAO function', async () => {
    createTask.mockResolvedValue(() => {
      throw new Error();
    });
    const response = await app.inject({ method: 'POST', url: '/tasks', payload: { name: 'name' } });

    expect(response.statusCode).toBe(500);
    expect(response.statusMessage).toBe('Internal Server Error');
  });
});
