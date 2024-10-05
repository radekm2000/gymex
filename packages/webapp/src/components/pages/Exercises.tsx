import { useMediaQuery } from "usehooks-ts";
import { RoutePath } from "../../constants/navigation";
import { useAuth } from "../../hooks/use-auth";
import { ExerciseLinkButton } from "../atoms/inputs/ExerciseLinkButton";
import { NotAuthed } from "./NotAuthed";
import { CustomIcon } from "../atoms/icons/CustomIcon";
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
      } gap-4 p-6 border bg-primary border-primary-light rounded-lg`}
    >
      <ExerciseLinkButton
        name="My own"
        path={RoutePath.MyExercises}
        icon={
          largeSize ? (
            <CustomIcon icon={myexercise} />
          ) : (
            <CustomIcon icon={myexercise} />
          )
        }
      />
      <ExerciseLinkButton
        name="Chest"
        path={RoutePath.ChestExercises}
        icon={
          largeSize ? <CustomIcon icon={chest} /> : <CustomIcon icon={chest} />
        }
      />
      <ExerciseLinkButton
        name="Back"
        path={RoutePath.BackExercises}
        icon={
          largeSize ? <CustomIcon icon={back} /> : <CustomIcon icon={back} />
        }
      />
      <ExerciseLinkButton
        name="Legs"
        path={RoutePath.LegExercises}
        icon={
          largeSize ? <CustomIcon icon={squat} /> : <CustomIcon icon={squat} />
        }
      />
    </div>
  );
};
