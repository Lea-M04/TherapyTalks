"use client";

import Link from "next/link";

export default function Button({ 
  children, 
  variant = "primary", 
  href, 
  className = "", 
  ...props 
}) {
  const base = "px-4 py-2 rounded font-medium transition";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100",
  };

  if (href) {
    return (
      <Link className={`${base} ${styles[variant]} ${className}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
