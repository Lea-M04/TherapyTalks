"use client";

import Link from "next/link";
import { DASHBOARD_ROUTES, NAV_ROUTES } from "@/lib/routes";
import Button from "../ui/Button";
import { useAuth } from "@/lib/context/AuthContext";

export default function Navbar() {
   const { user, logout } = useAuth();
  return (
    <nav className="w-full px-6 py-4 border-b bg-primary-dark flex items-center justify-between">
      <Link href={NAV_ROUTES.HOME} className="text-xl font-bold text-primary-dark">
        TherapyTalks
      </Link>
   
      <div className="flex items-center gap-6">
        <Link href={NAV_ROUTES.HOME}>Home</Link>
        <Link href={NAV_ROUTES.PROFESSIONALS}>Professionals</Link>
        <Link href={NAV_ROUTES.CHAT}>Chat</Link>
        <Link href={NAV_ROUTES.BOOKINGS}>Bookings</Link>
        {user && user.role==="professional" && (
            <Link href={DASHBOARD_ROUTES.PROFESSIONAL}>Dashboard</Link>
        )}
         {user && user.role==="admin" && (
           <Link href={DASHBOARD_ROUTES.ADMIN}>Dashboard</Link>
        )}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">
              Welcome, {user.firstName}
            </span>
             {user && user.role==="patient" && (
            <Link href={NAV_ROUTES.PROFILE}>Profile</Link>
        )}
            <button onClick={logout} 
            className="px-3 py-1 rounded bg-red-600 text-white">Logout</button>
          </div>
        ) : (
          <Button variant="primary" href="/auth/login">Login</Button>
        )}
      </div>
    </nav>
  );
}
