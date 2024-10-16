import { UserMetricsUpdateDto } from "@gymex/commons/src";
import { UserDetails } from "../../models/user.model";
import { apiClient } from "../http-client";

export const UserQueryKeys = {
  all: ["user-details"] as const,
  me: () => [...UserQueryKeys.all, "me"] as const,
  leaderboard: () => [UserQueryKeys.all, "leaderboard"] as const,
};

export const getUserDetails = async (): Promise<UserDetails> => {
  const response = await apiClient.get<UserDetails>("/users/me");
  return response.data;
};

export const getUsersLeaderboardInfo = async (): Promise<UserDetails[]> => {
  const response = await apiClient.get<UserDetails[]>("/users/leaderboard");
  return response.data;
};

export const updateUserMetrics = async (
  dto: UserMetricsUpdateDto,
  userId: number
): Promise<UserDetails> => {
  const response = await apiClient.post<UserDetails>(
    `users/${userId}/metrics`,
    dto
  );
  return response.data;
};
