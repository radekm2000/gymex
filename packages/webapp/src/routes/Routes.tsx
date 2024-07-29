import { Route, Switch } from "wouter";

import { lazy, Suspense } from "react";
import { LoadingProgress } from "../components/molecules/utils/LoadingProgress";

const MainRoute = lazy(() =>
  import("../components/pages/Main").then((module) => ({
    default: module.Main,
  }))
);

export const Routes = () => {
  return (
    <Switch>
      <Route>
        <Suspense fallback={<LoadingProgress />}>
          <MainRoute />
        </Suspense>
      </Route>
    </Switch>
  );
};
