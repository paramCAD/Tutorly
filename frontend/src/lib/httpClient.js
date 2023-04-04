import axios from "axios";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:8000/api"  })
    
httpClient.interceptors.request.use(async function (config) {
    return config;
});

httpClient.interceptors.response.use(async function (config) {
    return config;
    },
    (error) => {return Promise.reject(error.response.data) });

export default httpClient;