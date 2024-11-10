import { CreateWorkoutWithExercisesDto } from "@gymex/commons";
import {
  ActiveWorkoutFinishSchema,
  AddExerciseToWorkout,
  DetailedWorkoutModel,
  ExerciseModel,
  initDetailedWorkoutModel,
} from "@gymex/commons/src";
import { create } from "zustand";

type State = {
  activeWorkoutModel: ActiveWorkoutFinishSchema;
  setActiveWorkoutModel: (
    activeWorkoutModel: ActiveWorkoutFinishSchema
  ) => void;

  clearWorkoutModel: () => void;

  addExercise: (exercise: ExerciseModel) => void;
  addSet: (exerciseId: number) => void;
  deleteExercise: (exerciseId: number) => void;
  deleteSet: (exerciseId: number) => void;
  updateReps: (exerciseId: number, setId: string, newReps: string) => void;
  updateWeight: (exerciseId: number, setId: string, newWeight: string) => void;
  toggleSetIsFinished: (exerciseId: number, setId: string) => void;

  mapDetailedWorkoutModelToWorkoutFinishSchema: (
    model: DetailedWorkoutModel
  ) => ActiveWorkoutFinishSchema;

  formatWorkoutModelIntoRequiredFinishWorkoutDto: (
    activeWorkoutModel: ActiveWorkoutFinishSchema
  ) => CreateWorkoutWithExercisesDto;

  formatWorkoutModelIntoRequiredFinishWorkoutDtoWithSetCheckboxes: (
    activeWorkoutModel: ActiveWorkoutFinishSchema
  ) => CreateWorkoutWithExercisesDto;
};

export const useWorkoutStore = create<State>((set) => ({
  model: initDetailedWorkoutModel,
  activeWorkoutModel: {
    workout: {
      id: 0,
      name: "",
    },
    exercises: [],
  },

  clearWorkoutModel: () => {
    set({
      activeWorkoutModel: {
        exercises: [],
        workout: {
          id: 0,
          name: "",
        },
      },
    });
  },

  formatWorkoutModelIntoRequiredFinishWorkoutDto: (activeWorkoutModel) => {
    const dto: CreateWorkoutWithExercisesDto = {
      workoutName: activeWorkoutModel.workout.name,
      exercises: activeWorkoutModel.exercises.map((exercise) => ({
        id: exercise.id,
        notes: exercise.notes,
        orderIndex: exercise.orderIndex,
        sets: exercise.sets.map((set) => ({
          exerciseSetNumber: set.exerciseSetNumber,
          reps: set.reps,
          weight: set.weight,
          tempo: set.tempo ?? "0",
          isStaticSet: set.isStaticSet ?? false,
          holdSecs: set.holdSecs ?? "0",
        })),
      })),
    };

    return dto;
  },
  formatWorkoutModelIntoRequiredFinishWorkoutDtoWithSetCheckboxes: (
    activeWorkoutModel
  ) => {
    let exercisesWithFinishedSets = activeWorkoutModel.exercises
      .map((exercise) => {
        const filteredSets = exercise.sets.filter((set) => set.isFinished);

        return filteredSets.length > 0
          ? {
              id: exercise.id,
              notes: exercise.notes,
              orderIndex: exercise.orderIndex,
              sets: filteredSets.map((set) => ({
                exerciseSetNumber: set.exerciseSetNumber,
                reps: set.reps,
                weight: set.weight,
                tempo: set.tempo ?? "0",
                isStaticSet: set.isStaticSet ?? false,
                holdSecs: set.holdSecs ?? "0",
              })),
            }
          : null;
      })
      .filter((exercise) => exercise !== null);

    if (exercisesWithFinishedSets.length === 0) {
      const firstExercise = activeWorkoutModel.exercises[0];
      exercisesWithFinishedSets = [
        {
          id: firstExercise.id,
          notes: firstExercise.notes,
          orderIndex: firstExercise.orderIndex,
          sets: firstExercise.sets.map((set) => ({
            exerciseSetNumber: set.exerciseSetNumber,
            reps: set.reps ?? "10",
            weight: set.weight ?? "0",
            tempo: set.tempo ?? "0",
            isStaticSet: set.isStaticSet ?? false,
            holdSecs: set.holdSecs ?? "0",
          })),
        },
      ];
    }

    const dto: CreateWorkoutWithExercisesDto = {
      workoutName: activeWorkoutModel.workout.name,
      exercises: exercisesWithFinishedSets,
    };

    return dto;
  },

  setActiveWorkoutModel: (activeWorkoutModel) => {
    set({ activeWorkoutModel: activeWorkoutModel });
  },

  addSet: (exerciseId: number) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: prevState.activeWorkoutModel.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            const lastSetToCopy = exercise.sets[exercise.sets.length - 1];

            const newSet = {
              ...lastSetToCopy,
              exerciseSetNumber: (exercise.sets.length + 1).toString(),
            };

            return {
              ...exercise,
              sets: [...exercise.sets, newSet],
            };
          }
          return exercise;
        }),
      },
    }));
  },
  toggleSetIsFinished: (exerciseId: number, setId: string) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: prevState.activeWorkoutModel.exercises.map((exercise) => {
          if (exercise.id !== exerciseId) return exercise;

          const updatedSets = exercise.sets.map((set) => {
            if (set.exerciseSetNumber === setId) {
              return {
                ...set,
                isFinished: !set.isFinished,
              };
            }
            return set;
          });

          return {
            ...exercise,
            sets: updatedSets,
          };
        }),
      },
    }));
  },

  deleteSet: (exerciseId) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: prevState.activeWorkoutModel.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            const lastSetToDelete = exercise.sets[exercise.sets.length - 1];
            if (exercise.sets.length > 1) {
              return {
                ...exercise,
                sets: exercise.sets.filter(
                  (set) =>
                    set.exerciseSetNumber !==
                    lastSetToDelete.exerciseSetNumber.toString()
                ),
              };
            }
          }
          return exercise;
        }),
      },
    }));
  },
  deleteExercise: (exerciseId) => {
    set((prevState) => {
      const { exercises } = prevState.activeWorkoutModel;

      if (exercises.length <= 1) {
        return prevState;
      }

      return {
        activeWorkoutModel: {
          ...prevState.activeWorkoutModel,
          exercises: exercises.filter((e) => e.id !== exerciseId),
        },
      };
    });
  },

  updateReps: (exerciseId, setId, newReps) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: prevState.activeWorkoutModel.exercises.map((e) => {
          if (e.id === exerciseId) {
            return {
              ...e,
              sets: e.sets.map((set) =>
                set.exerciseSetNumber === setId
                  ? { ...set, reps: newReps }
                  : set
              ),
            };
          }
          return e;
        }),
      },
    }));
  },

  updateWeight: (exerciseId, setId, newWeight) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: prevState.activeWorkoutModel.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.exerciseSetNumber === setId
                  ? { ...set, weight: newWeight }
                  : set
              ),
            };
          }
          return exercise;
        }),
      },
    }));
  },

  mapDetailedWorkoutModelToWorkoutFinishSchema: (model) => {
    const { setActiveWorkoutModel } = useWorkoutStore.getState();

    const workout = {
      name: model.workout.name,
      id: model.workout.id,
    };

    const exercises: AddExerciseToWorkout[] = model.exercises.map(
      (e, index) => ({
        id: e.id,
        notes: e.notes ?? "",
        exerciseName: e.exerciseName,
        orderIndex: index,
        restTime: e.restTime,
        primaryMuscleTargeted: e.primaryMuscleTargeted,
        sets: e.sets.map((set) => ({
          exerciseSetNumber: set.exerciseSetNumber,
          reps: set.reps,
          weight: set.weight,
          rir: set.rir,
          tempo: set.tempo,
          isStaticSet: set.isStaticSet,
          holdSecs: set.holdSecs,
        })),
      })
    );

    const newModel: ActiveWorkoutFinishSchema = {
      workout: workout,
      exercises: exercises,
    };
    setActiveWorkoutModel(newModel);
    return newModel;
  },

  addExercise: (exercise) => {
    set((prevState) => ({
      activeWorkoutModel: {
        ...prevState.activeWorkoutModel,
        exercises: [
          ...prevState.activeWorkoutModel.exercises,
          {
            id: exercise.id,
            exerciseName: exercise.exerciseName,
            notes: "",
            restTime: exercise.restTime,
            primaryMuscleTargeted: exercise.primaryMuscleTargeted,
            sets: [
              {
                exerciseSetNumber: "1",
                reps: "10",
                weight: "0",
                rir: "",
                tempo: "",
                isStaticSet: false,
                holdSecs: "",
              },
            ],
            orderIndex: prevState.activeWorkoutModel.exercises.length,
          },
        ],
      },
    }));
  },
}));
