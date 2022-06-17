import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, redirectTo }) => {
  return loggedIn ? children : <Navigate replace to={redirectTo} />;
};

export default ProtectedRoute;
