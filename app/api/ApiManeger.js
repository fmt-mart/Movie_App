import axios from "axios";

const ApiManeger = axios.create({
    baseURL: "https://task-management-ts-api.vercel.app/api/v1",
    responseType: "json",
    withCredentials: true,
});

export default ApiManeger;