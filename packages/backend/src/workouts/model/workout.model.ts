import {
  DetailedWorkoutModel,
  ExerciseModel,
  WorkoutExerciseSetsModel,
  WorkoutModel,
} from '../types/workout.types';

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

  public get detailedWorkoutModel(): DetailedWorkoutModel {
    return {
      workout: {
        id: this._model.id,
        name: this.model.name,
        createdAt: this._model.createdAt,
        creatorId: this._model.creatorId,
      },
      exercises:
        this._exercises.length > 0 ? this.mapExercises(this._exercises) : [],
      exerciseSets:
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
      exerciseSetNumber: exerciseSet.exerciseSetNumber ?? '0',
      reps: exerciseSet.reps ?? '0',
      weight: exerciseSet.weight ?? '0',
      rir: exerciseSet.rir ?? '',
      tempo: exerciseSet.tempo ?? '',
      restTime: exerciseSet.restTime ?? '60',
      userId: exerciseSet.userId ?? 0,
    }));
  };

  private mapExercises = (exercises: ExerciseModel[]) => {
    return exercises.map((exercise) => ({
      id: exercise.id,
      exerciseName: exercise.exerciseName,
      notes: exercise.notes,
      isDefault: exercise.userId ? false : true,
      primaryMuscleTargeted: exercise.primaryMuscleTargeted,
      userId: exercise.userId ?? 0,
      isCreatorDeveloper: exercise.isCreatorDeveloper ?? false,
    }));
  };
}
