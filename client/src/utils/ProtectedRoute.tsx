import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextProvider } from "../context";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useContext(ContextProvider);
  return auth ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
