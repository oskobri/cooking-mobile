export type APIResponse<T> = {
    data: T;
}

export type APIResponsePaginated<T> = {
    data: T;
    meta: any;
    links: any;
}