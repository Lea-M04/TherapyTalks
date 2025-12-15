"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { NAV_ROUTES } from "@/lib/routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
     
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-onest text-white">
              TherapyTalks
            </h2>
            <p className="text-gray-300">
              Your mental wellness journey starts here. Professional support, accessible to everyone.
            </p>
            
          </div>

          <div>
            <h3 className="text-lg font-bold font-onest mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={NAV_ROUTES.HOME} 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href={NAV_ROUTES.PROFESSIONALS} 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Find Therapists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-onest mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/accessibility" 
                  className="text-gray-300 hover:text-primary-pink transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-onest mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li>support@therapytalks.com</li>
              <li>1-800-HELP-NOW</li>
              <li>123 Wellness St, Health City</li>
              <li className="pt-4">
                <span className="text-sm">Crisis Support: 988</span>
                <p className="text-xs text-gray-400 mt-1">
                  24/7 National Suicide & Crisis Lifeline
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} TherapyTalks. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm flex items-center">
              Made with <FaHeart className="text-primary-pink mx-1" /> for mental wellness
            </p>
            
            <p className="text-gray-400 text-sm">
              <Link 
                href="/sitemap" 
                className="hover:text-primary-pink transition-colors"
              >
                Sitemap
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            TherapyTalks provides mental health information and connects users with professionals. 
            This is not a substitute for professional medical advice, diagnosis, or treatment. 
            In case of emergency, call your local emergency number immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}