import React from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "../shared/localstorage";

export const AuthRoute = ({ children }) => {
  return getToken() ? children : <Navigate replace to="/" />;
};

export const UnauthRoute = ({ children }) => {
  return getToken() ? <Navigate replace to="/todo" /> : children;
};
