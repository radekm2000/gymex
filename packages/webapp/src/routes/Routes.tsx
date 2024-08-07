import { Redirect, Route, Switch } from "wouter";

import { lazy, Suspense } from "react";
import { LoadingProgress } from "../components/molecules/utils/LoadingProgress";
import { RoutePath } from "../constants/navigation";
import { TestPage } from "../components/pages/TestPage";

const MainRoute = lazy(() =>
  import("../components/pages/Main").then((module) => ({
    default: module.Main,
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

export const Routes = () => {
  return (
    <Switch>
      <Route path={RoutePath.MainPage}>
        <Suspense fallback={<LoadingProgress />}>
          <MainRoute />
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
      <Route>
        <Redirect to={RoutePath.Test} />
        <TestPage />
      </Route>
    </Switch>
  );
};
