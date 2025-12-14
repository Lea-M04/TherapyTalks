"use client";

import { useState } from "react";
import { login, setAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);

      setAuthToken(res.access_token);
      setUser(res.user);

      if (res.user.role === "admin") {
  router.push("/dashboard/admin");
} else if (res.user.role === "professional") {
  router.push("/dashboard/professional");
} else {
  router.push("/");
}
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-primary via-primary-pink to-primary-purple text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Welcome to Your Mental Wellness Space
            </h1>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
              
                <p className="text-lg leading-relaxed">
                  Taking care of your mental health is a sign of strength, not weakness
                </p>
              </div>
            
              
              <div className="flex items-start space-x-4">
               
                <p className="text-lg leading-relaxed">
                  Let us help you on your journey toward balance and wellbeing
                </p>
              </div>
            </div>
            
          
          </div>
        </div>
 
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10 text-center">
           
            <h2 className="text-3xl font-bold text-primary-dark">Login to Your Account</h2>
            <p className="text-primary-dark mt-2">Continue your journey to mental wellness</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-primary-dark pl-10 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-primary-dark pl-10 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-purple focus:ring-primary-purple border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-primary-dark">
                  Remember me
                </label>
              </div>
            </div>
            
            <button
              type="submit"
           
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-purple text-white font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
             
                Login to Account
             
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-primary-dark">
              Don't have an account?{" "}
              <a href="/auth/register" className="font-medium text-primary-purple hover:text-primary-dark transition-colors">
                Sign up now
              </a>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-primary-dark">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary-purple hover:text-primary-dark transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-purple hover:text-primary-dark transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
