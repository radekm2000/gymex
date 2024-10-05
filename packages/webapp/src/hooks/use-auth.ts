import { useQuery } from "@tanstack/react-query";
import { getUserDetails, UserQueryKeys } from "../api/requests/user";
import { UserDetailsWrapper } from "./utils/user-details-wrapper";
import { UserDetails } from "../models/user.model";

const NOT_LOGGED_IN_USER: UserDetails = {
  user: {
    createdAt: new Date(),
    id: 0,
    role: "User",
    username: "",
  },
  discordConnection: {
    accessToken: "",
    avatar: "",
    discordId: "0",
    username: "",
  },
  metrics: {
    height: "",
    weight: "",
    badges: [],
  },
  stats: {
    achievements: {},
    maxWeight: 0,
    totalSessions: 0,
    totalTrainingTime: 0,
    totalWeight: 0,
  },
};

export const useAuth = () => {
  const { data: userInfo } = useQuery({
    queryKey: UserQueryKeys.me(),
    queryFn: getUserDetails,
  });

  return {
    user: UserDetailsWrapper.wrap(userInfo ?? NOT_LOGGED_IN_USER),
    isAuthed: !!userInfo?.user.id,
  };
};
