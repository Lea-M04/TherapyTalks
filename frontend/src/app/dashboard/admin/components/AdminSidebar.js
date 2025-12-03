"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname();

  const links = [
    { href: "/dashboard/admin", label: "Dashboard" },
    { href: "/dashboard/admin/users", label: "Users" },
    { href: "/dashboard/admin/verification", label: "Verification Requests" }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded ${
              path === link.href ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
