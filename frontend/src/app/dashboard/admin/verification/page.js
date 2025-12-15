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
  <div className="p-6">

    <h1
      className="text-3xl font-bold mb-6 bg-gradient-to-r 
      from-primary-dark via-primary-purple to-primary-pink
      text-transparent bg-clip-text"
    >
      Verification Requests
    </h1>

    <div className="rounded-lg border border-primary/20 bg-white shadow-sm p-4">
      <div className="grid gap-4">
        {requests.map((r) => (
          <VerificationCard key={r.requestID} request={r} />
        ))}

        {requests.length === 0 && (
          <p className="text-center text-primary-dark py-4">
            No verification requests found
          </p>
        )}
      </div>
    </div>
  </div>
);
}
