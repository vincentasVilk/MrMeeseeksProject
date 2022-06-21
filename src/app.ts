import fastify from 'fastify';

import { createMrMeeseeksController } from './api/controllers/mr-meeseeks-controller';
import { createTaskController } from './api/controllers/task-controllers';
import { installSwagger } from './api/documentation/task-documentation';
import { installErrorHandler } from './api/errors/route-errors';
import { installMeeseeksRoutes } from './api/routes/meeseeks-routes';
import { installTaskRoutes } from './api/routes/task-routes';
import { CONFIG } from './config';
import { MrMeeseeksModel } from './persistance/models/mr-meeseeks';
import { TaskModel } from './persistance/models/task';
import { createMrMeeseeksDao } from './persistance/mr-meeseeks-dao';
import { createTaskDao } from './persistance/task-dao';

export const app = fastify(CONFIG.fastifyConfig);

const taskRepository = createTaskDao(TaskModel);
const taskController = createTaskController(taskRepository);
const repository = createMrMeeseeksDao(MrMeeseeksModel, TaskModel);
const mrMeeseeksController = createMrMeeseeksController(repository);

installErrorHandler(app);
installSwagger(app);
installTaskRoutes(app, taskController);
installMeeseeksRoutes(app, mrMeeseeksController);
