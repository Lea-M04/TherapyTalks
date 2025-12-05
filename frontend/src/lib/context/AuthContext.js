"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { me as meApi, setAuthToken, getFullProfile } from "@/lib/auth";

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

 getFullProfile()
    .then((data) => {
      console.log("FULL PROFILE:", data);

      setUser({
        ...data.user,
      professional: data.professional || null,
      patient: data.patient || null,
      professionalID: data.professional?.professionalID ?? null,
      patientID: data.patient?.patientID ?? null
      });
    })
    .catch(() => {
      setAuthToken(null);
      setUser(null);
    })
    .finally(() => setLoading(false));
  }, []);

     const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);  
    setUser(null);
     window.location.href = "/";
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading , logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
