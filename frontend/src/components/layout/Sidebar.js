"use client";

import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/lib/routes";
import { useAuth } from "@/lib/context/AuthContext";

export default function Sidebar({ role }) {
  const { user, logout } = useAuth();
  const items = {
    patient: [
      { label: "My Dashboard", href: DASHBOARD_ROUTES.PATIENT },
      { label: "My Bookings", href: "/bookings" },
      { label: "Payments", href: "/payments" },
    ],
    professional: [
      { label: "Dashboard", href: DASHBOARD_ROUTES.PROFESSIONAL },
      { label: "Bookings", href: "/dashboard/professional/bookings" },
      { label: "Chat", href: "/dashboard/professional/chat" },
      { label: "Availability", href: DASHBOARD_ROUTES.PROFESSIONAL_AVAILABILITY },
      { label: "Services", href: DASHBOARD_ROUTES.PROFESSIONAL_SERVICES },

    ],
    admin: [
      { label: "Dashboard", href: DASHBOARD_ROUTES.ADMIN },
      { label: "Users", href: DASHBOARD_ROUTES.ADMIN_USERS },
      { label: "Services", href: DASHBOARD_ROUTES.ADMIN_SERVICES },
      { label: "Professionals", href: DASHBOARD_ROUTES.ADMIN_PROFESSIONALS },
      { label: "Audit Logs", href: DASHBOARD_ROUTES.ADMIN_AUDIT },

    ],
  };

  return (
    <aside className="w-64 h-screen border-r p-4 flex flex-col gap-3 bg-primary-dark">
      {items[role]?.map((item) => (
        <Link key={item.href} href={item.href} className="p-2 rounded hover:bg-gray-200">
          {item.label}
        </Link>
      ))}
      <button onClick={logout} 
            className="px-3 py-1 rounded bg-red-600 text-white">Logout</button>
    </aside>
  );
}
