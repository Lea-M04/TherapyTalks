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
  <div className="p-6 space-y-6">

    <h1
      className="text-3xl font-bold bg-gradient-to-r
      from-primary-dark via-primary-purple to-primary-pink
      text-transparent bg-clip-text"
    >
      Request #{req.requestID}
    </h1>

    <div className="rounded-lg border border-primary/20 bg-white shadow-sm p-6 space-y-3 text-primary-dark">

      <p>
        <strong className="text-primary-purple">Professional ID:</strong>{" "}
        {req.professionalID}
      </p>

      <p>
        <strong className="text-primary-purple">Status:</strong>{" "}
        {req.status}
      </p>

      <p>
        <strong className="text-primary-purple">Submitted:</strong>{" "}
        {req.submittedAt.split("T")[0]}
      </p>

      {req.documentURL && (
        <p>
          <strong className="text-primary-purple">Document:</strong>{" "}
          <a
            href={req.documentURL}
            target="_blank"
            rel="noreferrer"
            className="text-primary-pink underline hover:text-primary-pink-hover"
          >
            Open
          </a>
        </p>
      )}

      {req.comments && (
        <p>
          <strong className="text-primary-purple">Comments:</strong>{" "}
          {req.comments}
        </p>
      )}
    </div>

    <ApproveRejectButtons requestID={req.requestID} />
  </div>
);
}