import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token exists, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
