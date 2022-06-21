import { JSONSchemaType } from 'ajv';
import { Task } from '../../domain/task';
export interface TaskResource {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface TaskUnitResource {
    data: TaskResource;
}
export interface TaskListResource {
    data: TaskResource[];
}
export declare const taskFormat: (document: Task) => TaskResource;
export declare const taskFormatUnit: (document: Task) => TaskUnitResource;
export declare const taskFormatList: (tasks: Task[]) => TaskListResource;
export declare const TASK_RESPONSE_OK: JSONSchemaType<TaskUnitResource>;
export declare const TASK_RESPONSE_NOT_FOUND: {
    NotFound: {
        description: string;
    };
};
export declare const TASK_LIST_RESPONSE_OK: {
    type: string;
    properties: {
        data: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                updatedAt: {
                    type: string;
                    format: string;
                };
            };
            required: string[];
        };
    };
    required: string[];
    additionalProperties: boolean;
};
