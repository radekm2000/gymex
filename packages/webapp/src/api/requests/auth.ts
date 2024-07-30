import { apiClient } from "../http-client";

export type AccessTokenRefreshResponse = {
  accessToken: string;
};

export const refreshAccessToken = async () => {
  const url = "/auth/refresh";
  const response = await apiClient.post<AccessTokenRefreshResponse>(url);
  return response.data.accessToken;
};