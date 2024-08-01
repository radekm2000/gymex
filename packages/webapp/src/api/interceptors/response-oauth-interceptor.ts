import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../requests/auth";
import { ACCESS_TOKEN_KEY } from "../../constants/local-storage";

let requestsToRetry: (() => unknown)[] = [];
const retryFailedRequests = () => {
  requestsToRetry.forEach((cb) => cb());
  requestsToRetry = [];
};
let tokenIsBeingRefreshed = false;

export const useResponseOauthInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.response.use(undefined, async (err: AxiosError) => {
    const config = err?.config as AxiosRequestConfig;
    if (
      err.response?.status === 401 &&
      !err.config?.url?.endsWith("/auth/logout")
    ) {
      if (!tokenIsBeingRefreshed) {
        tokenIsBeingRefreshed = true;
        try {
          const accessToken = await refreshAccessToken();
          console.log(accessToken);
          if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          console.log(requestsToRetry);
          retryFailedRequests();
          return axios.request(config);
        } catch (accessTokenError) {
          tokenIsBeingRefreshed = false;
          return Promise.reject(accessTokenError);
        }
      }
    } else {
      return new Promise((resolve) => {
        console.log(requestsToRetry);

        requestsToRetry.push(() => resolve(axios(config)));
      });
    }
    return Promise.reject(err);
  });
};
