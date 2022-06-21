import { JSONSchemaType } from 'ajv';
import { FastifyError } from 'fastify';
export interface ErrorSchema {
    readonly statusCode: number;
    readonly message: string;
    readonly error: string;
    readonly stack: string[];
}
export declare const formatError: (error: FastifyError) => ErrorSchema;
export declare const GENERIC_ERROR_SCHEMA: JSONSchemaType<ErrorSchema>;
