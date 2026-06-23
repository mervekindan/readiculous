import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem("readingUser") || "null");

  const [user, setUserState] = useState(savedUser);

  function setUser(userData) {
    setUserState(userData);

    if (userData) {
      localStorage.setItem("readingUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("readingUser");
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
