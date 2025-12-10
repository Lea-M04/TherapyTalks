"use client";

import ProfessionalGuard from "@/components/guards/ProfessionalGuard";

export default function Layout({ children }) {
  return <ProfessionalGuard>{children}</ProfessionalGuard>;
}