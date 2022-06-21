import fetch from 'node-fetch';

import { TaskCompletionService } from '../domain/models/task-completion-service';

interface YesNoResponse {
  answer: string;
  forced: boolean;
  image: string;
}

export const createTaskCompletionService = (fetchFn: typeof fetch): TaskCompletionService => {
  const getResponse = async (): Promise<YesNoResponse> => {
    const response = await fetchFn('https://yesno.wtf/api');
    const data = await response.json();
    return data;
  };

  const isCompleted = async (): Promise<boolean> => {
    const yesNoResponse = await getResponse();
    return yesNoResponse.answer === 'yes';
  };

  return {
    isCompleted,
  };
};
