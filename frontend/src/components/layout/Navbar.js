"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DASHBOARD_ROUTES, NAV_ROUTES } from "@/lib/routes";
import Button from "../ui/Button";
import { useAuth } from "@/lib/context/AuthContext";
import NotificationDropdown from "@/components/NotificationDropdown";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="w-full px-6 py-4 border-b border-border bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href={NAV_ROUTES.HOME} 
          className="text-2xl font-bold font-onest text-primary-purple hover:text-primary-purple-hover transition-colors"
        >
          TherapyTalks
        </Link>
        <div className="flex items-center gap-8">
          <Link 
            href={NAV_ROUTES.HOME}
            className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
          >
            Home
          </Link>
          
          <Link 
            href={NAV_ROUTES.PROFESSIONALS}
            className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
          >
            Professionals
          </Link>
          
          {user && user.role === "professional" && (
            <Link 
              href={DASHBOARD_ROUTES.PROFESSIONAL}
              className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
            >
              Dashboard
            </Link>
          )}
          
          {user && (user.role === "admin" || user.role==='auditor' || user.role==='moderator') && (
            <Link 
              href={DASHBOARD_ROUTES.ADMIN}
              className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
            >
              Dashboard
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link 
                href={NAV_ROUTES.CHAT}
                className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
              >
                Chat
              </Link>
              
              <NotificationDropdown />
              
              {user && user.role === "patient" && (
                <>
                  <Link 
                    href={NAV_ROUTES.BOOKINGS}
                    className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
                  >
                    Bookings
                  </Link>
                  
                  <Link 
                    href={NAV_ROUTES.PROFILE}
                    className="text-primary-dark hover:text-primary-purple font-medium font-onest transition-colors"
                  >
                    Profile
                  </Link>
                </>
              )}
              
              <div className="flex items-center gap-3">
                <span className="text-primary-purple font-medium font-onest">
                  Welcome, {user.firstName}
                </span>
                
                <button 
                  onClick={logout} 
                  className="px-4 py-2 rounded-lg bg-primary-pink text-white hover:bg-primary-pink-hover transition-colors font-onest font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                variant="primary" 
                href="/auth/login"
                className="bg-primary-purple text-white hover:bg-primary-purple-hover px-5 py-2"
              >
                Login
              </Button>
              
              <Button 
                variant="secondary" 
                href="/auth/register"
                className="bg-primary-pink text-white hover:bg-primary-pink-hover px-5 py-2"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}