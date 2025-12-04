"use client";

import { useEffect, useState } from "react";
import { getVerificationRequests } from "@/lib/verification";
import VerificationCard from "@/components/verification/VerificationCard";

export default function VerificationPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVerificationRequests()
      .then((data) => setRequests(data || []))
      .catch((err) => {
        console.error("getVerificationRequests error", err);
        alert("Failed to load verification requests");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!requests.length) return <p className="p-6">No verification requests found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Verification Requests</h1>
      <div className="grid gap-3">
        {requests.map((r) => <VerificationCard key={r.requestID} request={r} />)}
      </div>
    </div>
  );
}
