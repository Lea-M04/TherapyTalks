"use client";

import { useEffect, useState } from "react";
import { getMyPatients } from "@/lib/professionals";
import { useAuth } from "@/lib/context/AuthContext";
import StartChatButton from "@/components/chat/StartChatButton";
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
      <h1 className="text-2xl font-semibold mb-4">My Patients</h1>

 <input
        type="text"
        placeholder="Search patients by pseudonym or name..."
        className="border px-3 py-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.patientID}
            className="p-4 border rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {p.pseudonym || p.user?.firstName}
              </h2>
            </div>

            <StartChatButton professionalID={professional.professionalID} patientID={p.patientID}>
              Start Chat
            </StartChatButton>
          </div>
        ))}
      </div>
    </div>
  );
}
