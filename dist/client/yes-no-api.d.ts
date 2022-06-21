interface YesNoResponse {
    answer: string;
    forced: boolean;
    image: string;
}
export declare const getResponse: () => Promise<YesNoResponse>;
export declare const taskIsCompleted: () => Promise<boolean>;
export {};
