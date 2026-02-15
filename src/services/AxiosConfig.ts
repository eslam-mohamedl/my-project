import axios from "axios";
import { TokenService } from "@/services/tokenService";
import { ENV } from "../config/env";

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getToken();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default axiosInstance;
