"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { me as meApi, setAuthToken } from "@/lib/auth";

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
      .then((user) => setUser(user))
      .catch(() => {
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
