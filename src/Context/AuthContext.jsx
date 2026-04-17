import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  console.log(token);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
