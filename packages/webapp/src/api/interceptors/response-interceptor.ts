import { AxiosError, AxiosInstance } from "axios";
import { z } from "zod";
import { isValidationError } from "../../hooks/utils/isValidationError";

export const useResponseInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const parseResult = z
      .object({ message: z.string().optional() })
      .safeParse(error.response.data);

    const message = parseResult.success ? parseResult.data.message : undefined;

    if (400 <= error.response.status && error.response.status < 500) {
      const responseData = error.response.data as unknown;

      if (isValidationError(responseData)) {
        return Promise.reject({ ...error, ...responseData });
      }
    } else {
      return Promise.reject({ ...error, message: message || error.message });
    }

    if (error.response.status >= 500) {
      return Promise.reject({ ...error, message: message || "Unknown error" });
    }
    return Promise.reject(error);
  });
};
