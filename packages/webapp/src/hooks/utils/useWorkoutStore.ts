import {
  ActiveWorkoutFinishSchema,
  AddExerciseToWorkout,
  DetailedWorkoutModel,
  ExerciseModel,
  initDetailedWorkoutModel,
} from "@gymex/commons/src";
import { create } from "zustand";

type State = {
  model: DetailedWorkoutModel;

  activeWorkoutModel: ActiveWorkoutFinishSchema;
  setActiveWorkoutModel: (
    activeWorkoutModel: ActiveWorkoutFinishSchema
  ) => void;

  addExercise: (exercise: ExerciseModel) => void;
  addSet: (exerciseId: number) => void;
  deleteSet: (exerciseId: number) => void;
  setTrainingPlan2: (plan: DetailedWorkoutModel) => void;
  updateReps: (exerciseId: number, setId: string, newReps: string) => void;
  updateWeight: (exerciseId: number, setId: string, newWeight: string) => void;

  mapDetailedWorkoutModelToWorkoutFinishSchema: (
    model: DetailedWorkoutModel
  ) => void;
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
  setTrainingPlan2: (plan) => set({ model: plan }),

  setActiveWorkoutModel: (activeWorkoutModel) => {
    set({ activeWorkoutModel: activeWorkoutModel });
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

  addSet: (exerciseId: number) => {
    set((prevState) => ({
      model: {
        ...prevState.model,
        exercises: prevState.model.exercises.map((exercise) => {
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

  deleteSet: (exerciseId) => {
    set((prevState) => ({
      model: {
        ...prevState.model,
        exercises: prevState.model.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            const lastSetToDelete = exercise.sets[exercise.sets.length - 1];
            return {
              ...exercise,
              sets: exercise.sets.filter(
                (set) => set.exerciseSetNumber !== lastSetToDelete.id.toString()
              ),
            };
          }
          return exercise;
        }),
      },
    }));
  },

  updateReps: (exerciseId, setId, newReps) => {
    set((prevState) => ({
      model: {
        ...prevState.model,
        exercises: prevState.model.exercises.map((e) => {
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
      model: {
        ...prevState.model,
        exercises: prevState.model.exercises.map((exercise) => {
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
}));
