import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  const token = auth.token;

  const getTokenRemainingTime = (): number | null => {
    try {
      const token = localStorage.getItem("AuthToken")
      if(token === null)return null;
      const decoded: { exp: number } = jwtDecode(token); 
      const currentTime = Math.floor(Date.now() / 1000); 
      return decoded.exp - currentTime; 
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const remainingTime = getTokenRemainingTime();

  if (remainingTime !== null && remainingTime <= 1800) {
    auth.logout(); // Clear token and redirect to login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;