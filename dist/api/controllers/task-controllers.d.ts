import { FastifyReply, FastifyRequest } from 'fastify';
export declare const taskUpdateHandler: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
export declare const taskReadHandler: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
export declare const taskCreateHandler: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
export declare const taskReadAllHandler: (eq: FastifyRequest, res: FastifyReply) => Promise<void>;
export declare const taskDeleteHandler: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
