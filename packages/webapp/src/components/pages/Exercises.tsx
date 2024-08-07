import { RoutePath } from "../../constants/navigation";
import { useAuth } from "../../hooks/use-auth";
import { MuscleArmIcon } from "../atoms/icons/MuscleArmIcon";
import { ExerciseLinkButton } from "../atoms/inputs/ExerciseLinkButton";
import { NotAuthed } from "./NotAuthed";

export const Exercises = () => {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <NotAuthed />;
  }

  return (
    <div className="flex flex-wrap justify-between gap-8 p-6 border rounded bg-primary border-primary-light">
      <ExerciseLinkButton
        name="My exercises"
        path={RoutePath.MyExercises}
        icon={<MuscleArmIcon width={60} height={60} />}
      />
      <ExerciseLinkButton
        name="My exercises"
        path={RoutePath.MyExercises}
        icon={<MuscleArmIcon width={60} height={60} />}
      />
      <ExerciseLinkButton
        name="My exercises"
        path={RoutePath.MyExercises}
        icon={<MuscleArmIcon width={60} height={60} />}
      />
      <ExerciseLinkButton
        name="My exercises"
        path={RoutePath.MyExercises}
        icon={<MuscleArmIcon width={60} height={60} />}
      />
    </div>
  );
};
