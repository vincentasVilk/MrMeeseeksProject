import { FastifyInstance } from 'fastify';
export declare const installErrorHandler: (app: FastifyInstance) => void;
export declare const assignStatus: (error: unknown, type: unknown, statusCode: number) => void;
