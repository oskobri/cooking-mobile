import axios from 'axios';
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import type {APIResponse} from "@/services/types";

declare module 'axios' {
    export interface AxiosInstance {
        request<T = any> (config: AxiosRequestConfig): APIResponse<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): APIResponse<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): APIResponse<T>;
        head<T = any>(url: string, config?: AxiosRequestConfig): APIResponse<T>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): APIResponse<T>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): APIResponse<T>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): APIResponse<T>;
    }
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
});

instance.interceptors.response.use(
    (response: AxiosResponse): APIResponse<any> => {
        return {
            success: true,
            status: response.status,
            content: response.data,
        };
    },
    (error: AxiosError) => {
        return {
            success: false,
            status: error.response?.status || 400,
            content: null,
        };
    }
);

export default instance