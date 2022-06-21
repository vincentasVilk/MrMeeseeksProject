import { MrMeeseeks } from '../../domain/mr-meeseeks';
export interface MrMeeseeksResource {
    id: string;
    taskId: string;
    createdAt: string;
    updatedAt: string;
    survived: number;
}
export interface MrMeeseeksListResource {
    data: MrMeeseeksResource[];
}
export declare const mrMesseeksFormatList: (document: MrMeeseeks[]) => MrMeeseeksListResource;
export declare const MRMEESEEKS_LIST_RESPONSE_OK: {
    type: string;
    properties: {
        data: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                taskId: {
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
                survived: {
                    type: string;
                };
            };
            required: string[];
        };
    };
    required: string[];
    additionalProperties: boolean;
};
