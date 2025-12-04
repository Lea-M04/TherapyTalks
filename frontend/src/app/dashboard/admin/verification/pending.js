"use client";

import { useEffect, useState } from "react";
import { getPendingRequests } from "@/lib/verification";
import VerificationCard from "@/components/verification/VerificationCard";

export default function PendingPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getPendingRequests()
      .then((data) => setRequests(data || []))
      .catch((err) => {
        console.error(err);
        alert("Failed to load pending requests");
      });
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Pending Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((r) => <VerificationCard key={r.requestID} request={r} />)
      )}
    </div>
  );
}
