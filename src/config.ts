import 'dotenv/config';

export const CONFIG = {
  port: Number(process.env.APP_PORT) || 4000,
  db: process.env.DB_CONNECTION || '',
  fastifyConfig: { logger: Boolean(process.env.DEBUG) ? false : true },
};
