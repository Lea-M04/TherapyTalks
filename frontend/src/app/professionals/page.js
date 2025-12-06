"use client";

import { useEffect, useState } from "react";
import { getProfessionals } from "@/lib/professionals";
import ProfessionalCard from "@/components/professionals/ProfessionalCard";

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
     const loadData = async () => {
    const data = await getProfessionals();
    setProfessionals(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = professionals.filter((p) => {
  const fullName =
    `${p.user?.firstName} ${p.user?.lastName}`.toLowerCase();

  const matchesName =
    fullName.includes(search.toLowerCase()) ||
    p.specialization?.toLowerCase().includes(search.toLowerCase());

  const matchesService =
    p.services?.some((s) =>
      s.serviceName.toLowerCase().includes(search.toLowerCase())
    );

  return matchesName || matchesService;
});

    return (
            <div className="p-6">
      <input
        type="text"
        placeholder="Search professionals or specialization..."
        className="border px-3 py-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
               {filtered.map((p) => (
          <ProfessionalCard key={p.professionalID} professional={p} />
        ))}
      </div>
    </div>
    );
}
