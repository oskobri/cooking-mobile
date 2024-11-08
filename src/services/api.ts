import axios from 'axios';

const instance = axios.create({
    baseURL:  import.meta.env.VITE_API_ENDPOINT,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});


instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


export default instance