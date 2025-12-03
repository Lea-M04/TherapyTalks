"use client";

import Link from "next/link";
import { NAV_ROUTES } from "@/lib/routes";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b bg-white flex items-center justify-between">
      <Link href={NAV_ROUTES.HOME} className="text-xl font-bold text-primary-dark">
        TherapyTalks
      </Link>

      <div className="flex items-center gap-6">
        <Link href={NAV_ROUTES.PROFESSIONALS}>Professionals</Link>
        <Link href={NAV_ROUTES.SERVICES}>Services</Link>
        <Link href={NAV_ROUTES.CHAT}>Chat</Link>
        <Link href={NAV_ROUTES.Availability}>Availability</Link>
        <Button variant="primary" href="/auth/login">Login</Button>
      </div>
    </nav>
  );
}
