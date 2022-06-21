import { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';

export const installSwagger = (app: FastifyInstance): void => {
  app.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      host: 'localhost',
      schemes: ['http'],
      info: {
        title: 'Onboarding task',
        description: 'API that can handle tasks',
        version: '0.1.0',
      },
    },
  });
};
