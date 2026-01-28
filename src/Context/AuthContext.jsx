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

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
