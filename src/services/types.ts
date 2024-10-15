export type APIResponse<T> = {
    success: boolean
    content?: any | null;
    status?: number;
}