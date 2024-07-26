import { Workout } from 'src/workouts/model/workout.model';
import {
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from 'src/workouts/types/workout.types';

export type ChartData = {
  finishedAt: Date;
  maxWeight: number;
} | null;

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

        return {
          finishedAt,
          maxWeight,
        };
      })
      .filter((result) => result !== null);
  }
}
