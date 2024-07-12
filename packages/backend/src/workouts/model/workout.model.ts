import { muscleNameEnum } from 'src/db/schema/workout';
import {
  DetailedWorkoutModel,
  ExerciseModel,
  WorkoutExerciseSetsModel,
  WorkoutModel,
} from '../types/workout.types';
import { MuscleStats } from 'src/muscles/dto/muscles.dto';

export type WorkoutExerciseSetsWithoutPlanAndExerciseIds = Omit<
  WorkoutExerciseSetsModel,
  'workoutPlanId' | 'workoutExerciseId'
>;

export type WorkoutSummary = {
  totalSets: number;
  totalWeight: number;
  maxWeight: number;
  totalExercises: number;
  muscleStats: MuscleStats;
};

export class Workout {
  constructor(
    private readonly _model: WorkoutModel,
    private readonly _exercises?: ExerciseModel[],
    private readonly _exerciseSets?: WorkoutExerciseSetsModel[],
  ) {}

  public static from = (
    model: WorkoutModel,
    exercises?: ExerciseModel[],
    exerciseSets?: WorkoutExerciseSetsModel[],
  ) => new Workout(model, exercises, exerciseSets);

  public get model(): WorkoutModel {
    return this._model;
  }

  public get exercises(): ExerciseModel[] {
    return this._exercises;
  }

  public get exerciseSets(): WorkoutExerciseSetsModel[] {
    return this._exerciseSets;
  }

  public get workoutSummary(): WorkoutSummary {
    const totalSets = this._exerciseSets.length;
    const totalWeight = this._exerciseSets.reduce(
      (sum, set) => sum + Number(set.weight),
      0,
    );
    const maxWeight = Math.max(
      ...this._exerciseSets.map((set) => Number(set.weight)),
    );
    const totalExercises = this._exercises.length;
    const muscleStats: MuscleStats = {};
    this.mapMuscleStats(this.exercises, muscleStats);

    return {
      totalWeight,
      totalSets,
      maxWeight,
      totalExercises,
      muscleStats,
    } satisfies WorkoutSummary;
  }

  private mapMuscleStats(exercises: ExerciseModel[], muscleStats: MuscleStats) {
    for (const exercise of exercises) {
      const primaryMuscle = exercise.primaryMuscleTargeted;
      const exerciseWeight = this.exerciseSets
        .filter((set) => set.workoutExerciseId === exercise.id)
        .reduce((sum, set) => sum + Number(set.weight), 0);
      if (muscleStats[primaryMuscle]) {
        muscleStats[primaryMuscle] += exerciseWeight;
      } else {
        muscleStats[primaryMuscle] = exerciseWeight;
      }
    }
  }

  public get detailedWorkoutModel(): DetailedWorkoutModel {
    return {
      workout: {
        id: this._model.id,
        name: this.model.name,
        createdAt: this._model.createdAt,
        creatorId: this._model.creatorId,
      },
      exercises: this._exercises.length > 0 ? this.mapExercisesWithSets() : [],
      allExerciseSets:
        this._exerciseSets.length > 0
          ? this.mapExerciseSets(this._exerciseSets)
          : [],
    };
  }

  private mapExerciseSets = (exerciseSets: WorkoutExerciseSetsModel[]) => {
    return exerciseSets.map((exerciseSet) => ({
      id: exerciseSet.id,
      workoutPlanId: exerciseSet.workoutPlanId,
      workoutExerciseId: exerciseSet.workoutExerciseId,
      exerciseSetNumber: exerciseSet.exerciseSetNumber ?? '1',
      reps: exerciseSet.reps ?? '10',
      weight: exerciseSet.weight ?? '0',
      rir: exerciseSet.rir ?? '',
      tempo: exerciseSet.tempo ?? '',
      userId: exerciseSet.userId ?? 0,
      workoutSessionId: exerciseSet.workoutSessionId ?? 0,
    }));
  };

  private mapExerciseSetsWithoutPlanAndExerciseIds = (
    exerciseSets: WorkoutExerciseSetsModel[],
  ) => {
    return exerciseSets.map((exerciseSet) => ({
      id: exerciseSet.id,
      exerciseSetNumber: exerciseSet.exerciseSetNumber ?? '1',
      reps: exerciseSet.reps ?? '10',
      weight: exerciseSet.weight ?? '0',
      rir: exerciseSet.rir ?? '',
      tempo: exerciseSet.tempo ?? '',
      userId: exerciseSet.userId ?? 0,
      workoutSessionId: exerciseSet.workoutSessionId ?? 0,
    }));
  };

  private mapExercisesWithSets = () => {
    return this._exercises.map((exercise) => {
      const exerciseSets = this.exerciseSets.filter(
        (set) => set.workoutExerciseId === exercise.id,
      );
      return {
        id: exercise.id,
        exerciseName: exercise.exerciseName,
        notes: exercise.notes,
        isDefault: exercise.userId ? false : true,
        primaryMuscleTargeted: exercise.primaryMuscleTargeted,
        userId: exercise.userId ?? 0,
        isCreatorDeveloper: exercise.isCreatorDeveloper ?? false,
        sets: this.mapExerciseSetsWithoutPlanAndExerciseIds(exerciseSets),
        restTime: exercise.restTime ?? '60',
      };
    });
  };
}
