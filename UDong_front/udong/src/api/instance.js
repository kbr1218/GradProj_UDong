import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const axiosConfig = {
    baseURL: BASE_URL,
    withCredentials: true, 
    headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN") ? localStorage.getItem("AUTH-TOKEN") : ""}`,
    },
};

export const baseApi = axios.create(axiosConfig);

baseApi.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const {
            config,
            response: { status },
        } = error;
        if (status === 401) {
            const originalRequest = config;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);
