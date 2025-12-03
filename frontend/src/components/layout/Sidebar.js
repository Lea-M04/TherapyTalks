"use client";

import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/lib/routes";

export default function Sidebar({ role }) {
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
    <aside className="w-64 h-screen border-r p-4 flex flex-col gap-3 bg-gray-50">
      {items[role]?.map((item) => (
        <Link key={item.href} href={item.href} className="p-2 rounded hover:bg-gray-200">
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
