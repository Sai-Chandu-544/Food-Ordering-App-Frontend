import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth";

export const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = auth.isAuthenticated || !!localStorage.getItem("Token");
  return isAuthenticated ? children : <Navigate to="/" />;
};


