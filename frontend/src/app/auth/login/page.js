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

      if (res.user.role === "admin") router.push("/dashboard/admin");
      else router.push("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
