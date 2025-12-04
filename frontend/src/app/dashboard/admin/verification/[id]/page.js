"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getVerificationById } from "@/lib/verification";
import ApproveRejectButtons from "@/components/verification/ApproveRejectButtons";

export default function VerificationDetailPage() {
  const { id } = useParams();
  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getVerificationById(id)
      .then((data) => setReq(data || null))
      .catch((err) => {
        console.error("getVerificationById error", err);
        alert("Failed to load request details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!req) return <p className="p-6">Request not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Request #{req.requestID}</h1>

      <div className="border rounded p-4">
        <p><strong>Professional ID:</strong> {req.professionalID}</p>
        <p><strong>Status:</strong> {req.status}</p>
        <p><strong>Submitted:</strong> {req.submittedAt}</p>
        {req.documentURL && (
          <p>
            <strong>Document:</strong>{" "}
            <a href={req.documentURL} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Open
            </a>
          </p>
        )}
        {req.comments && <p><strong>Comments:</strong> {req.comments}</p>}
      </div>

      <ApproveRejectButtons requestID={req.requestID} />
    </div>
  );
}
