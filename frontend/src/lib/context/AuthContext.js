"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { me as meApi, setAuthToken, getFullProfile } from "@/lib/auth";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 const router = useRouter();
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
      userID: data.user?.userID ?? null,
  firstName: data.user?.firstName ?? "",
  lastName: data.user?.lastName ?? "",
  username: data.user?.username ?? "",
  gender: data.user?.gender ?? "",
  email: data.user?.email ?? "",
  phoneNumber: data.user?.phoneNumber ?? "",
  profileImage: data.user?.profileImage ?? "",
 role: data.user?.role ?? null, 
      professional: data.professional || null,
      patient: data.patient || null,
      professionalID: data.professional?.professionalID ?? null,
      patientID: data.patient?.patientID ?? null
      });
    })
    .catch((err) => {
      if (err.response?.status === 401) {
    setAuthToken(null);
    setUser(null);
  }
    })
    .finally(() => setLoading(false));
  }, []);

     const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);  
    setUser(null);
     window.location.href = "/";
  };
   const requireAuth = () => {
    if (!user) {
      router.push("/auth/login");
      return false;
    }
    return true;
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading , logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
