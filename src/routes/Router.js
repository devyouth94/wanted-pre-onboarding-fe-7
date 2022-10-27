import React from "react";
import { Route, Routes } from "react-router-dom";

import Sign from "../pages/Sign";
import TodoList from "../pages/TodoList";

import { AuthRoute, UnauthRoute } from "./RedirectRoute";
import { ROUTE_PATH } from "./routePath";

const Router = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_PATH.HOME}
        element={
          <UnauthRoute>
            <Sign />
          </UnauthRoute>
        }
      />
      <Route
        path={ROUTE_PATH.TODO}
        element={
          <AuthRoute>
            <TodoList />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default Router;
