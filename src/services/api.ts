import axios, {type AxiosError} from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
});

instance.interceptors.response.use(
    (response): { success: boolean; status: number; content: any; } => {
        // En cas de succès, renvoyer un objet formaté
        return {
            success: true,
            status: response.status,
            content: response.data,
        };
    },
    (error: AxiosError) => {
        // En cas d'échec, renvoyer un objet d'erreur formaté
        return {
            success: false,
            status: error.response?.status || 400,
            content: null,
        };
    }
);

export default instance