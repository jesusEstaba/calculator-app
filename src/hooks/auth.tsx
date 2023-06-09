import { useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = (): AxiosInstance => {
    const { token } = useContext(AuthContext);
    const instance = axios.create();

    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAuth;
