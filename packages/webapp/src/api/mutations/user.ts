import { UserMetricsUpdateDto } from "@gymex/commons/src";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMetrics, UserQueryKeys } from "../requests/user";
import toast from "react-hot-toast";
import { UserDetails } from "../../models/user.model";

export const useUserMetricsUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dto,
      userId,
    }: {
      dto: UserMetricsUpdateDto;
      userId: number;
    }) => updateUserMetrics(dto, userId),
    onSuccess: (user) => {
      toast.success("User updated!");

      if (user !== undefined) {
        queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), user);
      }
    },
  });
};
