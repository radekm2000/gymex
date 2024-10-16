import { UserMetricsUpdateDto } from "@gymex/commons/src";
import { useAuth } from "../../../hooks/use-auth";
import { NotAuthed } from "../../pages/NotAuthed";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { LabeledInput } from "../../atoms/inputs/LabeledInput";
import { useUserMetricsUpdateMutation } from "../../../api/mutations/user";

export const UserMetricsModal = () => {
  const { user, isAuthed } = useAuth();
  const userId = user.model.user.id;
  const isUserFirstTimeLoggedIn = user.isUserFirstTimeLoggedIn;
  const updateUserMetricsMutation = useUserMetricsUpdateMutation();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [displayName, setDisplayName] = useState("");

  const onUpdate = (dto: UserMetricsUpdateDto, userId: number) => {
    updateUserMetricsMutation.mutate({ dto, userId });
  };

  if (!isAuthed) {
    return <NotAuthed />;
  }

  return (
    <AlertDialog
      open={isUserFirstTimeLoggedIn}
      onOpenChange={(open) => open === isUserFirstTimeLoggedIn}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Fill in your user metrics and set a display name if you want to show
            it instead of your discord username
          </AlertDialogTitle>
          <AlertDialogDescription>
            <LabeledInput
              label="Display name"
              inputValue={displayName}
              onInputValueChange={setDisplayName}
            />
            <LabeledInput
              label="Weight"
              inputValue={weight}
              onInputValueChange={setWeight}
            />
            <LabeledInput
              label="Height"
              inputValue={height}
              onInputValueChange={setHeight}
            />
            <span className="text-sm text-slate-400">
              All inputs are optional and you can leave them blank.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => onUpdate({ displayName, height, weight }, userId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
