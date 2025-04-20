import { createContext, useContext, useState } from "react";
import { LoginType, ProviderProps } from "../Types/types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<ProviderProps>({
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored).token : "";
  });

  const login = (data: LoginType & { token: string }) => {
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify({ token: data.token }));
    navigate("/");
  };
  const logout = () => {
    setToken("");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
