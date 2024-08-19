import { UserDetails } from "../../models/user.model";

export const useIsAdmin = (profile: UserDetails) => {
  return profile.user.role === "Admin";
};
