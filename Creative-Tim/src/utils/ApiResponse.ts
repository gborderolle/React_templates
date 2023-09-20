export interface APIResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: T;
}

export interface ResponseId {
    id: number;
}