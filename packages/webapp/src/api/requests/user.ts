import { UserDetails } from "../../models/user.model";
import { apiClient } from "../http-client";

export const UserQueryKeys = {
  all: ["user-details"] as const,
  me: () => [...UserQueryKeys.all, "me"] as const,
};

export const getUserDetails = async (): Promise<UserDetails> => {
  const response = await apiClient.get<UserDetails>("/users/me");
  return response.data;
};
