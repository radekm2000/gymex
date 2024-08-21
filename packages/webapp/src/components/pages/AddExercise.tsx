import { Info } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { PrimaryMuscleTargeted, RestTimeOptions } from "@gymex/commons/src";
import { PrimaryMuscleSelect } from "../atoms/exercises/PrimaryMuscleSelect";
import { RestTimeSelect } from "../atoms/exercises/RestTimeSelect";
import { useIsAdmin } from "../../hooks/utils/isAdmin";
import { useAuth } from "../../hooks/use-auth";
import { IsDefaultExerciseSelect } from "../atoms/exercises/IsDefaultExerciseSelect";
import { useExerciseCreateMutation } from "../../api/mutations/exercises";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import { LabeledInput } from "../atoms/inputs/LabeledInput";

export const AddExercise = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [notes, setNotes] = useState("");
  const [primaryMuscleTargeted, setPrimaryMuscleTargeted] =
    useState<PrimaryMuscleTargeted>("base");
  const [restTime, setRestTime] = useState<RestTimeOptions>("60");
  const [isDefault, setIsDefault] = useState(false);
  const { user } = useAuth();
  const isAdmin = useIsAdmin(user.model);
  const createMutation = useExerciseCreateMutation();

  const onCreate = () => {
    createMutation.mutate({
      exerciseName: exerciseName,
      isCreatorDeveloper: isAdmin === true,
      isDefault: isDefault,
      muscleTargeted: primaryMuscleTargeted,
      notes: notes,
      restTime: restTime,
      userId: user.model.user.id,
    });
  };

  return (
    <Card>
      <CardTitle className="flex gap-4">
        <Info />
        Add exercise
      </CardTitle>
      <div className="flex flex-col gap-4 pt-3">
        <LabeledInput
          inputValue={exerciseName}
          onInputValueChange={setExerciseName}
          label="Exercise name"
        />

        <PrimaryMuscleSelect
          primaryMuscleTargeted={primaryMuscleTargeted}
          setPrimaryMuscleTargeted={setPrimaryMuscleTargeted}
        />
        <RestTimeSelect restTime={restTime} setRestTime={setRestTime} />

        <LabeledInput
          label="Notes"
          inputValue={notes}
          onInputValueChange={setNotes}
        />

        {isAdmin && (
          <IsDefaultExerciseSelect
            isDefault={isDefault}
            setIsDefault={setIsDefault}
          />
        )}
        <PrimaryButton
          onClick={onCreate}
          className="w-full"
          buttonMessage="CREATE"
          tooltipMessage="You have to fill exercise name first"
          disabled={Boolean(!exerciseName)}
        />
      </div>
    </Card>
  );
};
