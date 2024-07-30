import { AxiosInstance } from "axios";
import { ACCESS_TOKEN_KEY } from "../../constants/local-storage";

export const useRequestAccessTokenInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);

    return config;
  });
};
