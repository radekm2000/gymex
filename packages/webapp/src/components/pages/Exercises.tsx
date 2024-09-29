import { useMediaQuery } from "usehooks-ts";
import { RoutePath } from "../../constants/navigation";
import { useAuth } from "../../hooks/use-auth";
import { ExerciseLinkButton } from "../atoms/inputs/ExerciseLinkButton";
import { NotAuthed } from "./NotAuthed";
import { ExerciseIcon } from "../atoms/icons/ExerciseIcon";
import squat from "../../assets/powerlifting.png";
import back from "../../assets/pull-ups.png";
import chest from "../../assets/bench-press-weightlifting.png";
import myexercise from "../../assets/kettlebell.png";
export const Exercises = () => {
  const { isAuthed } = useAuth();
  const largeSize = useMediaQuery("(min-width: 1500px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isAuthed) {
    return <NotAuthed />;
  }

  return (
    <div
      className={`${
        isDesktop ? "grid grid-cols-3" : "grid grid-cols-2 sm:grid-cols-2"
      } gap-4 p-6 border bg-primary border-primary-light`}
    >
      <ExerciseLinkButton
        name="My own"
        path={RoutePath.MyExercises}
        icon={
          largeSize ? (
            <ExerciseIcon icon={myexercise} />
          ) : (
            <ExerciseIcon icon={myexercise} />
          )
        }
      />
      <ExerciseLinkButton
        name="Chest"
        path={RoutePath.ChestExercises}
        icon={
          largeSize ? (
            <ExerciseIcon icon={chest} />
          ) : (
            <ExerciseIcon icon={chest} />
          )
        }
      />
      <ExerciseLinkButton
        name="Back"
        path={RoutePath.BackExercises}
        icon={
          largeSize ? (
            <ExerciseIcon icon={back} />
          ) : (
            <ExerciseIcon icon={back} />
          )
        }
      />
      <ExerciseLinkButton
        name="Legs"
        path={RoutePath.LegExercises}
        icon={
          largeSize ? (
            <ExerciseIcon icon={squat} />
          ) : (
            <ExerciseIcon icon={squat} />
          )
        }
      />
    </div>
  );
};
