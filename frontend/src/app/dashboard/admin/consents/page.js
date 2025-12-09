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

        
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary-dark font-bold">Consent Records</h1>

       <Link
          href="/dashboard/admin/consents/create"
          className="bg-primary-dark text-white px-4 py-2 rounded"
        >
          + Create Consent
        </Link>
      </div>
     

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Profesional</th>
            <th className="p-2 border">Consent Type</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Signed At</th>
            <th className="p-2 border">Given At</th>
          </tr>
        </thead>

        <tbody>
          {records.map(r => (
            <tr key={r.consentID}>
              <td className="p-2 border">{r.consentID}</td>
             <td className="p-2 border">
        {r.patient?.user?.firstName} {r.patient?.user?.lastName}
      </td>
      <td className="p-2 border">
        {r.professional?.user?.firstName} {r.professional?.user?.lastName}
      </td>

              <td className="p-2 border">{r.consentType}</td>
              <td className="p-2 border">{r.description}</td>
              <td className="p-2 border">{r.signedAt}</td>
              <td className="p-2 border">{r.created_at?.split(".")[0]}</td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No consent records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-6 mt-6">
        <button
          disabled={!pagination.prev_page_url}
          onClick={() => loadPage(pagination.current_page - 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-40"
        >
          Prev
        </button>

        <button
          disabled={!pagination.next_page_url}
          onClick={() => loadPage(pagination.current_page + 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
