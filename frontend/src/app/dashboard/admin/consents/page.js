"use client";
import { useEffect, useState } from "react";
import { getConsentRecords } from "@/lib/consent";
import Link from "next/link";

export default function ConsentRecordsPage() {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadPage = async (page = 1) => {
    try {
      const res = await getConsentRecords(`/consent_record?page=${page}`);

      setRecords(res.data);
      setPagination(res.meta);
    } catch (err) {
      console.error(err);
      alert("Failed to load consent records.");
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

 
  return (
  <div className="p-6">

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Consent Records
      </h1>

      <Link
        href="/dashboard/admin/consents/create"
        className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow hover:bg-primary-purple-hover transition"
      >
        + Create Consent
      </Link>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "User", "Professional", "Consent Type", "Description", "Signed At", "Given At"].map((h) => (
              <th
                key={h}
                className="p-3 border border-primary/10 text-left text-sm font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r.consentID} className="hover:bg-primary-pink/10 transition">
              <td className="p-3 border border-primary/10">{r.consentID}</td>

              <td className="p-3 border border-primary/10">
                {r.patient?.user?.firstName} {r.patient?.user?.lastName}
              </td>

              <td className="p-3 border border-primary/10">
                {r.professional?.user?.firstName} {r.professional?.user?.lastName}
              </td>

              <td className="p-3 border border-primary/10">{r.consentType}</td>
              <td className="p-3 border border-primary/10">{r.description}</td>
              <td className="p-3 border border-primary/10">{r.signedAt}</td>
              <td className="p-3 border border-primary/10">
                {r.created_at?.split(".")[0]}
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="p-4 text-center text-primary-dark"
              >
                No consent records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination.prev_page_url}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination.next_page_url}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}
