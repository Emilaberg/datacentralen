import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";

const Logout = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    auth.logout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  if (!auth.token) return <Navigate to="/" />;

  return (<div className="h-screen flex items-center justify-center"><h1>loggar ut...</h1></div>);
};

export default Logout;
