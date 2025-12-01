"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
     <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">Welcome to TherapyTalks</h1>
      <p className="mt-4 text-lg">Your mental health matters.</p>
      <div>
         <h1>Welcome</h1>

      <button
        onClick={() => router.push("/auth/register")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Register
      </button>

      <button
        onClick={() => router.push("/auth/login")}
        className="bg-green-500 text-white px-4 py-2 rounded ml-4"
      >
        Login
      </button>
      </div>
    </div>
  )
}