import { createContext, useContext, useState } from "react";
import { ProviderProps } from "../Types/types";
import { useNavigate } from "react-router-dom";
import ApiService from "../Services/ApiService";
const AuthContext = createContext<ProviderProps>({
  token: "",
  authenticate: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {Login} = ApiService();
  const [token, setToken] = useState<string>(() => {
    const stored = localStorage.getItem("token");
    return stored ? JSON.parse(stored) : "";
  });

  const authenticate = async (username: string, password: string) => {
    const response = await Login(username,password)

    localStorage.setItem("token", JSON.stringify(response));
    setToken(response);
    navigate("/");
  };


  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
