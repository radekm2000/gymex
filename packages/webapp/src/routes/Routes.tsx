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
      <Route>
        <Redirect to={RoutePath.Test} />
        <TestPage />
      </Route>
    </Switch>
  );
};
