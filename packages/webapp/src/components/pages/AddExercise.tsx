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
        <div className="flex flex-col gap-2">
          <Label htmlFor="exercise-name">Exercise name</Label>
          <Input
            value={exerciseName}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setExerciseName(e.target.value)}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            type="exercise-name"
            id="exercise-name"
          />
        </div>

        <PrimaryMuscleSelect
          primaryMuscleTargeted={primaryMuscleTargeted}
          setPrimaryMuscleTargeted={setPrimaryMuscleTargeted}
        />
        <RestTimeSelect restTime={restTime} setRestTime={setRestTime} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="exercise-name">Notes</Label>
          <Input
            value={notes}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setNotes(e.target.value)}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

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
