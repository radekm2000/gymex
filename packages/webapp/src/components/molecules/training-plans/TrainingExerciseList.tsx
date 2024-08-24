import { AddExerciseToWorkout } from "@gymex/commons/src";

type Props = {
  exercises: AddExerciseToWorkout[];
};

export const TrainingExerciseList = ({ exercises }: Props) => {
  return (
    <div>
      {exercises.map((e) => (
        <div>{e.exerciseName}</div>
      ))}
    </div>
  );
};
