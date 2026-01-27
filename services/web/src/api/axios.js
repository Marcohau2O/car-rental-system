import axios from 'axios'
import { API_PUBLIC_URL } from "../config/endpointPublic"

const api = axios.create({
    baseURL: API_PUBLIC_URL
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"]
    }

    return config;
})

export default api;