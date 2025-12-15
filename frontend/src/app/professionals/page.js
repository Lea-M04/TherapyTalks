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
    <div className="p-6 max-w-6xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-8
        bg-gradient-to-r from-primary-purple to-primary-pink
        bg-clip-text text-transparent"
      >
        Find a Professional
      </h1>

      <input
        type="text"
        placeholder="Search professionals or specialization..."
        className="border px-4 py-3 rounded-lg w-full mb-8
        shadow focus:ring-2 focus:ring-primary-purple outline-none text-primary-dark"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <ProfessionalCard key={p.professionalID} professional={p} />
        ))}
      </div>
    </div>
  );
}