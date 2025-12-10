"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfessionalGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
      if (!user)  {
      router.replace("/auth/login");
      return;
    }
      else if (user.role !== "professional") {
      router.replace("/");
      return;}
       if (user?.professional?.status !== "approved") {
      router.replace("/dashboard/professional");
      return;
    }
  
    
  }, [user, loading,router]);

  if (loading) return <p>Loading...</p>;

  return children;
}