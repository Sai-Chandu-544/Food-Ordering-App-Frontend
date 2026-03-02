import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    userId: null,
    userName: null,
    userEmail: null,
    isAuthenticated: false,
  });

 
  const [loading, setLoading] = useState(true);

 
  const login = (token, userId, userName, userEmail) => {
    localStorage.setItem("Token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("UserName", userName);
    localStorage.setItem("userEmail", userEmail);

    setAuth({
      token,
      userId,
      userName,
      userEmail,
      isAuthenticated: true,
    });
  };

 
  useEffect(() => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("UserName");
    const userEmail = localStorage.getItem("userEmail");

    if (token) {
      setAuth({
        token,
        userId,
        userName,
        userEmail,
        isAuthenticated: true,
      });
    }

    setLoading(false); 
  }, []);

 
  const logout = () => {
    localStorage.clear();
    setAuth({
      token: null,
      userId: null,
      userName: null,
      userEmail: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};