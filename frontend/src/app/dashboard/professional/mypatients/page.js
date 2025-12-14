"use client";

import { useEffect, useState } from "react";
import { getMyPatients } from "@/lib/professionals";
import { useAuth } from "@/lib/context/AuthContext";
import StartChatButton from "@/components/chat/StartChatButton";
import Link from "next/link";
export default function MyPatientsPage() {
  const { user } = useAuth();
  const professional = user?.professional;
const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!professional?.professionalID) return;

    getMyPatients(professional.professionalID)
      .then((res) => {
         console.log(res);
   
        setPatients(res || [])});
  }, [professional]);

  if (!professional) {
    return <div className="p-6">Loading...</div>;
  }

   const filtered = patients.filter((p) => {
    const name = p.user?.firstName?.toLowerCase() || "";
    const pseudo = p.pseudonym?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      pseudo.includes(search.toLowerCase())
    );
  });
  return (
  <div className="p-6">
    <h1 className="text-3xl font-bold 
      bg-gradient-to-r from-primary-purple to-primary-pink 
      text-transparent bg-clip-text mb-6">
      My Patients
    </h1>

    <input
      type="text"
      placeholder="Search patients by pseudonym or name..."
      className="w-full px-4 py-2 rounded-lg border border-border 
                 bg-white shadow-sm focus:ring-2 focus:ring-primary-dark 
                 outline-none transition mb-6 text-primary-dark placeholder-muted"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="space-y-4">
      {filtered.map((p) => (
        <div
          key={p.patientID}
          className="p-4 border border-border rounded-xl shadow-md 
                     bg-white flex items-center justify-between hover:shadow-lg 
                     transition"
        >

          <div>
            <h2 className="font-semibold text-lg text-primary-dark">
              {p.pseudonym || p.user?.firstName}
            </h2>
          </div>


          <div className="flex gap-3 items-center">

            <StartChatButton
              professionalID={professional.professionalID}
              patientID={p.patientID}
            >
              <span className="px-4 py-2 bg-primary-pink text-white rounded-lg
                               hover:bg-primary-pink-hover transition shadow">
                Start Chat
              </span>
            </StartChatButton>

            <Link
              href={`/dashboard/professional/mypatients/${p.patientID}/diagnosis`}
              className="px-4 py-2 bg-primary-purple text-white rounded-lg
                         hover:bg-primary-purple-hover transition shadow"
            >
              Add / Edit Diagnosis
            </Link>

          </div>
        </div>
      ))}
    </div>
  </div>
);
}
