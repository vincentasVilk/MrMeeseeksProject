// import fetch from 'node-fetch';
const fetchMock = jest.fn();

jest.mock('node-fetch', () => {
  return {
    default: fetchMock,
  };
});

import { mocked } from 'jest-mock';

import { TaskCompletionService } from '../../src/domain/models/task-completion-service';

const fakeTaskCompletionService = mocked<TaskCompletionService>({
  isCompleted: jest.fn(),
});

describe('Meeseeks -> Yes/No API', () => {
  test('taskIsCompleted should return true when response is yes', async () => {
    const request = fetchMock.mockResolvedValue({
      json: async () => ({ answer: 'yes' }),
    });

    const result = await fakeTaskCompletionService.isCompleted();

    expect(request).toBeCalled();
    expect(result).toBe(true);
  });

  test('taskIsCompleted should return false when response is no', async () => {
    const request = fetchMock.mockResolvedValue({
      json: async () => ({ answer: 'no' }),
    });

    const result = await fakeTaskCompletionService.isCompleted();

    expect(request).toBeCalled();
    expect(result).toBe(false);
  });
});
