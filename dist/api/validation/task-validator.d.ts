import { JSONSchemaType } from 'ajv';
import { TaskParam } from '../../domain/task-params';
export declare const TASKS_VALIDATOR_BODY_CREATE: JSONSchemaType<TaskParam>;
export declare const TASKS_VALIDATOR_PARAMS: {
    type: string;
    properties: {
        id: {
            type: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
