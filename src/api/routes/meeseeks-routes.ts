import { FastifyInstance } from 'fastify';

import { MeeseeksController } from '../controllers/mr-meeseeks-controller';
import { MRMEESEEKS_LIST_RESPONSE_OK } from '../resources/meeseeks-resource';

export const installMeeseeksRoutes = (app: FastifyInstance, controller: MeeseeksController): void => {
  app.get(
    '/meeseeks',
    {
      schema: {
        response: {
          200: MRMEESEEKS_LIST_RESPONSE_OK,
        },
      },
    },
    controller.meeseeksAllHandler,
  );
};
