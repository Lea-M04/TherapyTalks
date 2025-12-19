"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (user.role !== "admin" && user.role !== "moderator" && user.role !== "auditor") router.push("/");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return children;
}
