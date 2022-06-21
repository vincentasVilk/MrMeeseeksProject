import mongoose from 'mongoose';
import fetch from 'node-fetch';

import { createTaskCompletionService } from './client/yes-no-api';
import { CONFIG } from './config';
import { createMeeseeksService } from './domain/service/meeseeks';
import { MrMeeseeksModel } from './persistance/models/mr-meeseeks';
import { TaskModel } from './persistance/models/task';
import { createMrMeeseeksDao } from './persistance/mr-meeseeks-dao';

const start = async (): Promise<void> => {
  const taskCompletionService = createTaskCompletionService(fetch);
  const repository = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);
  const service = createMeeseeksService(repository, taskCompletionService);

  try {
    await mongoose.connect(CONFIG.db);
    await service.doWork();
    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
  }
};

start();
