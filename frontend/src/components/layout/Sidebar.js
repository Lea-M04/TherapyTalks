"use client";

import Link from "next/link";
import { DASHBOARD_ROUTES, NAV_ROUTES} from "@/lib/routes";
import { useAuth } from "@/lib/context/AuthContext";

export default function Sidebar({ role }) {
  const { user, logout } = useAuth();
  const items = {
    professional: [
      { label: "Home", href: NAV_ROUTES.HOME },
      { label: "Dashboard", href: DASHBOARD_ROUTES.PROFESSIONAL },
      { label: "Bookings", href: "/dashboard/professional/bookings" },
      { label: "Chat", href: "/chat" },
      { label: "Availability", href: DASHBOARD_ROUTES.PROFESSIONAL_AVAILABILITY },
      { label: "Services", href: DASHBOARD_ROUTES.PROFESSIONAL_SERVICES },
      { label: "My Patients", href: DASHBOARD_ROUTES.PROFESSIONAL_PATIENTS },
      { label: "Consents", href: DASHBOARD_ROUTES.PROFESSIONAL_CONSENT },

    ],
    admin: [
      { label: "Dashboard", href: DASHBOARD_ROUTES.ADMIN },
      { label: "Users", href: DASHBOARD_ROUTES.ADMIN_USERS },
      { label: "Professionals", href: DASHBOARD_ROUTES.ADMIN_PROFESSIONALS },
      { label: "Patients", href: DASHBOARD_ROUTES.ADMIN_PATIENTS },
      { label: "Services", href: DASHBOARD_ROUTES.ADMIN_SERVICES },
      { label: "Audit Logs", href: DASHBOARD_ROUTES.ADMIN_AUDIT },
      { label: "Verification Requests", href: DASHBOARD_ROUTES.ADMIN_VERIFICATIONS},
      { label: "Notification Settings", href: DASHBOARD_ROUTES.NOTIFICATION_SETTINGS},
      { label: "Notifications", href: DASHBOARD_ROUTES.NOTIFICATIONS},
      { label: "Consents", href: DASHBOARD_ROUTES.ADMIN_CONSENT},
      { label: "Chat Rooms", href: DASHBOARD_ROUTES.CHAT_ROOMS},
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
