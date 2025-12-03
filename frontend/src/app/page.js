"use client";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function Home() {
  const router = useRouter();
  return (
     <div className="p-8 text-center">
      <h1 className="text-4xl font-bold font-onest text-primary-purple">Welcome to TherapyTalks</h1>
      <p className="mt-4 text-lg font-tiktok">Your mental health matters.</p>
      <div>
         <h1>Welcome</h1>

      <Button
        onClick={() => router.push("/auth/register")}
        variant="secondary"
      >
        Go to Register
      </Button>

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