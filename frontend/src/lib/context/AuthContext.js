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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
