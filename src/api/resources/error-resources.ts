import { JSONSchemaType } from 'ajv';
import { FastifyError } from 'fastify';

export interface ErrorSchema {
  readonly statusCode: number;
  readonly message: string;
  readonly error: string;
  readonly stack: string[];
}

export const formatError = (error: FastifyError): ErrorSchema => {
  return {
    statusCode: error.validation ? 400 : error.statusCode || 500,
    message: error.message,
    error: error.constructor.name,
    stack: error.stack?.split('') || [],
  };
};

export const GENERIC_ERROR_SCHEMA: JSONSchemaType<ErrorSchema> = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
    error: {
      type: 'string',
    },
    stack: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['statusCode', 'message', 'error', 'stack'],
  additionalProperties: false,
};
