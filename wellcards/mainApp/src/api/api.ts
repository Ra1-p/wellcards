import axios from "axios";
import AuthService from "../services/Auth";

const API_URL = "http://127.0.0.1:8000/api/"

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    if (config.url !== "/users/login/") {
        config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    }
    return config
})

api.interceptors.response.use(
    config => {
        return config;
    },
    async (error) => {
        const originalConfig = error.config;
        try {
            if (error.response.status === 401 && !originalConfig._retry) {
                const refresh = localStorage.getItem("refresh");
                const response = refresh && await AuthService.getAccessToken(refresh)
                response && localStorage.setItem("access", response.data.access)
                return api.request(originalConfig );
            }
        } catch (e) {
            console.log("Не авторизован");
        }

    })