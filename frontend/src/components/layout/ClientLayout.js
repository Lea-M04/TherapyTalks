"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const hideNavbarRoutes = ["/auth/login", "/auth/register"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="main-layout">
        <main className="page-content">{children}</main>
      </div>
    </>
  );
}
