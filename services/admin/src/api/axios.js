import axios from "axios"
import { API_BASE_URL } from "../config/endpoint";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});


export default api;