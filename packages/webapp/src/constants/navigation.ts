export enum RoutePath {
  Profile = "/profile",
  Test = "/test",
  Exercises = "/exercises",
  AddExercise = "/exercises/own/add",
  ChestExercises = "/exercises/chest",
  BackExercises = "/exercises/back",
  LegExercises = "/exercises/legs",
  MyExercises = "/exercises/own",
  SpecificExercises = "/exercises/:primaryMuscleTargeted",
  TrainingPlans = "/training-plans",
  AddTrainingPlan = "/training-plans/add",
  ActiveWorkout = "/active-workout/:workoutPlanId",
  WorkoutSummary = "/workout/:workoutPlanId/summary",
  Github = "https://github.com/radekm2000/gymex",
  WorkoutsHistory = "/workouts/history",
  ExerciseStatistics = "/exercises/:exerciseId/statistics",
  Leaderboard = '/leaderboard'
}

export const SET_LOCATION_STATES = {
  ADD_EXERCISE_TO_TRAINING_PLAN: "addExerciseToTrainingPlan",
  ADD_EXERCISE_TO_ACTIVE_WORKOUT: "addExerciseToActiveWorkout",
  NORMAL_MODE: "normalMode",
};
