import { useMediaQuery } from "usehooks-ts";
import { RoutePath } from "../../constants/navigation";
import { useAuth } from "../../hooks/use-auth";
import { MuscleArmIcon } from "../atoms/icons/MuscleArmIcon";
import { ExerciseLinkButton } from "../atoms/inputs/ExerciseLinkButton";
import { NotAuthed } from "./NotAuthed";

export const Exercises = () => {
  const { isAuthed } = useAuth();
  const largeSize = useMediaQuery("(min-width: 1500px)");
  if (!isAuthed) {
    return <NotAuthed />;
  }

  return (
    <div className="grid grid-cols-2 gap-8 p-6 border sm:grid-cols-3 bg-primary border-primary-light">
      <ExerciseLinkButton
        name="My exercises"
        path={RoutePath.MyExercises}
        icon={
          largeSize ? (
            <MuscleArmIcon width={96} height={96} />
          ) : (
            <MuscleArmIcon width={60} height={60} />
          )
        }
      />

      <ExerciseLinkButton
        name="Chest"
        path={RoutePath.ChestExercises}
        icon={
          largeSize ? (
            <MuscleArmIcon width={96} height={96} />
          ) : (
            <MuscleArmIcon width={60} height={60} />
          )
        }
      />

      <ExerciseLinkButton
        name="Back"
        path={RoutePath.BackExercises}
        icon={
          largeSize ? (
            <MuscleArmIcon width={96} height={96} />
          ) : (
            <MuscleArmIcon width={60} height={60} />
          )
        }
      />
      <ExerciseLinkButton
        name="Legs"
        path={RoutePath.LegExercises}
        icon={
          largeSize ? (
            <MuscleArmIcon width={96} height={96} />
          ) : (
            <MuscleArmIcon width={60} height={60} />
          )
        }
      />
    </div>
  );
};
