/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRequestAccessTokenInterceptor } from "./interceptors/request-interceptor";
import { useResponseInterceptor } from "./interceptors/response-interceptor";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

useRequestAccessTokenInterceptor(apiClient);
useResponseInterceptor(apiClient);
