import { AddExerciseToWorkout, WorkoutCreateSchema } from "@gymex/commons/src";
import { TrainingExerciseCard } from "./TrainingExerciseCard";

type Props = {
  exercises: AddExerciseToWorkout[];
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutCreateSchema>>;
  workout: WorkoutCreateSchema
};

export const TrainingExerciseList = ({ exercises, setWorkout, workout }: Props) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <span className="text-2xl font-display">Exercises</span>
      {exercises.map((e, index) => (
        <TrainingExerciseCard
        workout={workout}
          setWorkout={setWorkout}
          key={index}
          exerciseId={e.id}
        />
      ))}
    </div>
  );
};
