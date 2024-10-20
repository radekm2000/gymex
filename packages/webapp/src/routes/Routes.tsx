import { Redirect, Route, Switch } from "wouter";

import { lazy, Suspense } from "react";
import { LoadingProgress } from "../components/molecules/utils/LoadingProgress";
import { RoutePath } from "../constants/navigation";

const ProfileRoute = lazy(() =>
  import("../components/pages/Profile").then((module) => ({
    default: module.Profile,
  }))
);

const TestRoute = lazy(() =>
  import("../components/pages/TestPage").then((module) => ({
    default: module.TestPage,
  }))
);

const ExercisesRoute = lazy(() =>
  import("../components/pages/Exercises").then((module) => ({
    default: module.Exercises,
  }))
);

const MyExercisesRoute = lazy(() =>
  import("../components/pages/MyExercises").then((module) => ({
    default: module.MyExercises,
  }))
);

const AddExerciseRoute = lazy(() =>
  import("../components/pages/AddExercise").then((module) => ({
    default: module.AddExercise,
  }))
);

const TrainingPlansRoute = lazy(() =>
  import("../components/pages/TrainingPlans").then((module) => ({
    default: module.TrainingPlans,
  }))
);

const AddTrainingPlanRoute = lazy(() =>
  import("../components/pages/AddTrainingPlan").then((module) => ({
    default: module.AddTrainingPlan,
  }))
);

const ActiveWorkoutRoute = lazy(() =>
  import("../components/pages/ActiveWorkout").then((module) => ({
    default: module.ActiveWorkout,
  }))
);

const SpecificExercisesRoute = lazy(() =>
  import("../components/pages/ExercisesSpecificMuscleGroup").then((module) => ({
    default: module.ExercisesSpecificMuscleGroup,
  }))
);

const WorkoutsHistoryRoute = lazy(() =>
  import("../components/pages/WorkoutsHistory").then((module) => ({
    default: module.WorkoutsHistory,
  }))
);

const WorkoutSummaryRoute = lazy(() =>
  import("../components/pages/WorkoutSummary").then((module) => ({
    default: module.WorkoutSummary,
  }))
);

const ExerciseStatisticsRoute = lazy(() =>
  import("../components/pages/ExerciseStatistics").then((module) => ({
    default: module.ExerciseStatistics,
  }))
);

const LeaderboardRoute = lazy(() =>
  import("../components/pages/Leaderboard").then((module) => ({
    default: module.Leaderboard,
  }))
);

const SettingsRoute = lazy(() =>
  import("../components/pages/Settings").then((module) => ({
    default: module.Settings,
  }))
);

export const Routes = () => {
  return (
    <Switch>
      <Route path={RoutePath.Profile}>
        <Suspense fallback={<LoadingProgress />}>
          <ProfileRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.Test}>
        <Suspense fallback={<LoadingProgress />}>
          <TestRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.Exercises}>
        <Suspense fallback={<LoadingProgress />}>
          <ExercisesRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.MyExercises}>
        <Suspense fallback={<LoadingProgress />}>
          <MyExercisesRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.AddExercise}>
        <Suspense fallback={<LoadingProgress />}>
          <AddExerciseRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.TrainingPlans}>
        <Suspense fallback={<LoadingProgress />}>
          <TrainingPlansRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.AddTrainingPlan}>
        <Suspense fallback={<LoadingProgress />}>
          <AddTrainingPlanRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.SpecificExercises}>
        <Suspense fallback={<LoadingProgress />}>
          <SpecificExercisesRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.ActiveWorkout}>
        <Suspense fallback={<LoadingProgress />}>
          <ActiveWorkoutRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.WorkoutsHistory}>
        <Suspense fallback={<LoadingProgress />}>
          <WorkoutsHistoryRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.WorkoutSummary}>
        <Suspense fallback={<LoadingProgress />}>
          <WorkoutSummaryRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.ExerciseStatistics}>
        <Suspense fallback={<LoadingProgress />}>
          <ExerciseStatisticsRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.Leaderboard}>
        <Suspense fallback={<LoadingProgress />}>
          <LeaderboardRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.Settings}>
        <Suspense fallback={<LoadingProgress />}>
          <SettingsRoute />
        </Suspense>
      </Route>
      <Route>
        <Redirect to={RoutePath.Profile} />
        <ProfileRoute />
      </Route>
    </Switch>
  );
};
