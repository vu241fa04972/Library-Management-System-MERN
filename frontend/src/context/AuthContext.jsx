import { createContext, useContext, useState } from "react";
import api from "../services/api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem("library_admin") || "null"); } catch { return null; }
  });
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("library_token", data.token);
    localStorage.setItem("library_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
  };
  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("library_token", data.token);
    localStorage.setItem("library_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
  };
  const logout = () => {
    localStorage.removeItem("library_token");
    localStorage.removeItem("library_admin");
    setAdmin(null);
  };
  return <AuthContext.Provider value={{ admin, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
