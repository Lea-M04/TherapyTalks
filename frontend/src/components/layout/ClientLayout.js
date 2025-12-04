"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { useAuth } from "@/lib/context/AuthContext";
import Sidebar from "./Sidebar";

const hideNavbarRoutes = ["/auth/login", "/auth/register"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const showNavbar = !hideNavbarRoutes.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex">
      {isDashboard && user && <Sidebar role={user.role} />}

      <div className="flex-1">
        {!isDashboard && showNavbar && <Navbar />}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
