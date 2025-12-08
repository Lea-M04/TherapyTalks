"use client";

import { useEffect, useState } from "react";
import { getMyDiagnosis } from "@/lib/diagnoses";
import { useRouter } from "next/navigation";

export default function MyDiagnosis() {
  const [diagnosis, setDiagnosis] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await getMyDiagnosis();
      setDiagnosis(res[0] || null);
    }
    load();
  }, []);

  if (!diagnosis)
    return <p className="p-6 text-white">No diagnosis assigned.</p>;

  return (
    <div className="p-6 text-black relative max-w-xl mx-auto">
      <button
        onClick={() => router.push("/profile")}
        className="absolute top-2 right-2 text-xl text-gray-700 hover:text-black"
      >
        ✕
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">My Diagnosis</h1>

      <div className="p-6 bg-white rounded-xl shadow-md space-y-4 border">
        <p><b>Title:</b> {diagnosis.title}</p>
        <p><b>Description:</b> {diagnosis.description}</p>
        <p><b>Security Level:</b> {diagnosis.securityLevel}</p>
        <p><b>Updated:</b> {diagnosis.updated_at}</p>
      </div>
    </div>
  );
}
