import { FastifyInstance } from 'fastify';

import { formatError } from '../resources/error-resources';

class RouteNotFound extends Error {}

export const assignStatus = (error: unknown, type: unknown, statusCode: number): void => {
  if (error instanceof (type as CallableFunction)) {
    Object.assign(error as Error, { statusCode });
  }
};

export const installErrorHandler = (app: FastifyInstance): void => {
  app.setErrorHandler(async (err, req, res) => {
    if (err.validation) {
      res.status(400).send(formatError(err));
      return;
    }
    if (err.statusCode) {
      res.status(err.statusCode).send(formatError(err));
      return;
    }
    res.status(500).send(formatError(err));
  });
  app.setNotFoundHandler(async (_req, res) => {
    const error = new RouteNotFound('No such route');
    assignStatus(error, RouteNotFound, 404);
    error.stack = undefined;
    res
      .status(404)
      .send(formatError({ code: '404', name: 'routeNotFound', statusCode: 404, message: 'No such route' }));
  });
};
