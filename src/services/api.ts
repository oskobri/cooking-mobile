import axios from 'axios';
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import type {APIResponse} from "@/services/types";


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
});
/*
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
);*/

export default instance