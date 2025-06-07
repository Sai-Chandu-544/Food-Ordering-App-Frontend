import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setAuth({ token:token, isAuthenticated: true });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("Token", token);
    setAuth({ token:token, isAuthenticated: true });
    
  };

  const logout = () => {
    localStorage.removeItem("Token");
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
