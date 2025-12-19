"use client";

import Link from "next/link";
import { DASHBOARD_ROUTES, NAV_ROUTES} from "@/lib/routes";
import { useAuth } from "@/lib/context/AuthContext";

export default function Sidebar({ role }) {
  const { user, logout } = useAuth();
 const isApproved = user?.professional?.status === "approved";
  const items = {
    professional: [
      { label: "Home", href: NAV_ROUTES.HOME },
      { label: "My Profile", href: DASHBOARD_ROUTES.PROFESSIONAL },
      ...(isApproved ? [
        { label: "Bookings", href: "/dashboard/professional/bookings" },
        { label: "Chat", href: "/chat" },
        { label: "Availability", href: DASHBOARD_ROUTES.PROFESSIONAL_AVAILABILITY },
        { label: "Services", href: DASHBOARD_ROUTES.PROFESSIONAL_SERVICES },
        { label: "My Patients", href: DASHBOARD_ROUTES.PROFESSIONAL_PATIENTS },
        { label: "Consents", href: DASHBOARD_ROUTES.PROFESSIONAL_CONSENT },
      ] : []),
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
      { label: "Rejects", href: DASHBOARD_ROUTES.ADMIN_REJECT},
      { label: "Availabilities", href: DASHBOARD_ROUTES.ADMIN_AVAILABILITY},
      { label: "Payments", href: DASHBOARD_ROUTES.PAYMENTS},
      { label: "Bookings", href: DASHBOARD_ROUTES.BOOKINGS},
    ],
     moderator: [
      { label: "Dashboard", href: DASHBOARD_ROUTES.ADMIN },
      { label: "Users", href: DASHBOARD_ROUTES.ADMIN_USERS },
      { label: "Professionals", href: DASHBOARD_ROUTES.ADMIN_PROFESSIONALS },
      { label: "Services", href: DASHBOARD_ROUTES.ADMIN_SERVICES },
      { label: "Verification Requests", href: DASHBOARD_ROUTES.ADMIN_VERIFICATIONS},
      { label: "Consents", href: DASHBOARD_ROUTES.ADMIN_CONSENT},
      { label: "Rejects", href: DASHBOARD_ROUTES.ADMIN_REJECT},
      { label: "Availabilities", href: DASHBOARD_ROUTES.ADMIN_AVAILABILITY},
      { label: "Bookings", href: DASHBOARD_ROUTES.BOOKINGS},
    ],
     auditor: [
      { label: "Dashboard", href: DASHBOARD_ROUTES.ADMIN },
      { label: "Users", href: DASHBOARD_ROUTES.ADMIN_USERS },
      { label: "Professionals", href: DASHBOARD_ROUTES.ADMIN_PROFESSIONALS },
      { label: "Patients", href: DASHBOARD_ROUTES.ADMIN_PATIENTS },
      { label: "Audit Logs", href: DASHBOARD_ROUTES.ADMIN_AUDIT },
      { label: "Consents", href: DASHBOARD_ROUTES.ADMIN_CONSENT},
      { label: "Rejects", href: DASHBOARD_ROUTES.ADMIN_REJECT},
      { label: "Payments", href: DASHBOARD_ROUTES.PAYMENTS},
      { label: "Bookings", href: DASHBOARD_ROUTES.BOOKINGS},
    ],
  };

  return (
  <aside className="w-64 h-full bg-white border-r border-primary/20 p-5 flex flex-col justify-between shadow-sm">

    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Menu
      </h2>

      {items[role]?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="p-3 rounded-lg text-primary-dark border border-primary/10 hover:bg-primary/10 hover:border-primary transition font-medium"
        >
          {item.label}
        </Link>
      ))}
    </div>

    <button
      onClick={logout}
      className="w-full px-4 py-2 bg-primary-dark text-white rounded-lg shadow hover:bg-gray-800 transition"
    >
      Logout
    </button>

  </aside>
);
}

