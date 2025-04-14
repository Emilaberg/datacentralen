import { createContext, useContext, useState } from "react";
import { LoginType, ProviderProps } from "../Types/types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const [user, setUser] = useState<string | null>(storedInfo?.email || null);
  const [token, setToken] = useState<string>(storedInfo?.token || "");

  const login = (data: LoginType & { token: string }) => {
    console.log("🔐 Logging in with real token:", data.token);

    const obj = { email: data.email, token: data.token };
    setUser(data.email);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(obj));

    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
