import axios from 'axios';

const instance = axios.create({
    baseURL:  import.meta.env.VITE_API_ENDPOINT,
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});


export default instance