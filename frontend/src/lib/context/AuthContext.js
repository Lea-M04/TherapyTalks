"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, me as meApi, setAuthToken } from "../auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    meApi()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);


  const login = async (email, password) => {
    const data = await loginApi(email, password);

    const token = data.access_token;

    setAuthToken(token);

    const me = await meApi();
    setUser(me);

    return me;
  };

  
  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
