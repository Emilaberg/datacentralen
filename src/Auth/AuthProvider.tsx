import { createContext, useContext, useState } from "react";
import { ProviderProps } from "../Types/types";
import { useNavigate } from "react-router-dom";
import AuthorizedApiService from "../Services/AuthorizedApiService";
const AuthContext = createContext<ProviderProps>({
  token: "",
  authenticate: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {AuthMe} = AuthorizedApiService();

  const [token, setToken] = useState<string>(localStorage.getItem("AuthToken") ?? "");

  const authenticate = async (username: string, password: string) => {
    const response = await AuthMe(username,password);
    
    
    if (!response || response.status < 200 || response.status >= 300) {
      return;
    }
    const tokn = localStorage.getItem("AuthToken")
    if(tokn !== null){
      setToken(tokn)
    }
    navigate("/dashboard");
  };


  const logout = () => {

    localStorage.removeItem("AuthToken");
    setToken("");
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
