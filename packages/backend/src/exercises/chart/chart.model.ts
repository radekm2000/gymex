import { Workout } from 'src/workouts/model/workout.model';
import {
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from 'src/workouts/types/workout.types';

export type ChartData = {
  finishedAt: Date;
  maxWeight: number;
  averageWeight: number;
};

export class Chart {
  constructor(
    private readonly _exerciseModel: ExerciseModel,
    private readonly _workoutModels: Workout[],
  ) {}

  public static from = (
    exerciseModel: ExerciseModel,
    workoutModels: Workout[],
  ) => {
    return new Chart(exerciseModel, workoutModels);
  };

  public get exerciseName(): string {
    return this._exerciseModel.exerciseName;
  }

  public get chartData(): ChartData[] {
    return this.filterOutExerciseAndExerciseSets();
  }

  private calculateTheBiggestWeightAtSession(
    exerciseSets: WorkoutExerciseSetsModel[],
  ) {
    return Math.max(...exerciseSets.map((set) => Number(set.weight)));
  }

  private calculateAverageWeightAtSession(
    exerciseSets: WorkoutExerciseSetsModel[],
  ) {
    const totalWeight = exerciseSets.reduce(
      (acc, set) => acc + Number(set.weight),
      0,
    );

    return totalWeight / exerciseSets.length;
  }

  private filterOutExerciseAndExerciseSets() {
    return this._workoutModels
      .map((m) => {
        const exerciseSets = m.exerciseSets.filter(
          (exerciseSet) =>
            exerciseSet.workoutExerciseId === this._exerciseModel.id,
        );

        if (exerciseSets.length === 0) {
          return null;
        }
        const finishedAt = m.session.finishedAt;
        const maxWeight = this.calculateTheBiggestWeightAtSession(exerciseSets);
        const averageWeight =
          this.calculateAverageWeightAtSession(exerciseSets);

        return {
          finishedAt,
          maxWeight,
          averageWeight,
        };
      })
      .filter((result) => result !== null);
  }
}
